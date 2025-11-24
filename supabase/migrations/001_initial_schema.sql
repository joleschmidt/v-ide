-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable PostGIS for geographic queries (optional, for future use)
-- CREATE EXTENSION IF NOT EXISTS "postgis";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('OPERATOR', 'LANDOWNER', 'BOTH')) DEFAULT 'OPERATOR',
  
  -- Profile
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  
  -- Reputation (for Operators)
  reputation_score INTEGER DEFAULT 0 CHECK (reputation_score >= 0 AND reputation_score <= 100),
  completed_trips INTEGER DEFAULT 0,
  
  -- Landowner Stats
  total_sectors INTEGER DEFAULT 0,
  total_earnings DECIMAL(10, 2) DEFAULT 0,
  
  -- Status
  is_verified BOOLEAN DEFAULT false,
  is_banned BOOLEAN DEFAULT false,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ
);

-- Sectors table
CREATE TABLE sectors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  landowner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Display Info
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  
  -- Location (Exact)
  exact_lat DECIMAL(10, 8) NOT NULL,
  exact_lng DECIMAL(11, 8) NOT NULL,
  
  -- Location (Fuzzy - for public view)
  fuzzy_lat DECIMAL(10, 8) NOT NULL,
  fuzzy_lng DECIMAL(11, 8) NOT NULL,
  fuzzy_radius_km DECIMAL(5, 2) DEFAULT 2.0,
  
  -- Characteristics
  wilderness_level INTEGER NOT NULL CHECK (wilderness_level >= 1 AND wilderness_level <= 5),
  fire_permission TEXT NOT NULL CHECK (fire_permission IN ('NO_FIRE', 'GAS_ONLY', 'FIRE_BOWL', 'OPEN_FIRE')),
  water_availability TEXT NOT NULL CHECK (water_availability IN ('NONE', 'NATURAL_SOURCE', 'PROVIDED')),
  
  -- Amenities
  has_toilet BOOLEAN DEFAULT false,
  byot_mandatory BOOLEAN DEFAULT false, -- Auto-set if has_toilet = false
  max_operators INTEGER DEFAULT 1 CHECK (max_operators >= 1 AND max_operators <= 10),
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  blocked_dates DATE[] DEFAULT ARRAY[]::DATE[],
  
  -- Pricing
  price_per_night DECIMAL(8, 2) NOT NULL CHECK (price_per_night >= 0),
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Parties
  operator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  landowner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  sector_id UUID NOT NULL REFERENCES sectors(id) ON DELETE CASCADE,
  
  -- Dates
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  CHECK (check_out_date > check_in_date),
  
  -- Legal (Waiver)
  waiver_signed_at TIMESTAMPTZ,
  waiver_ip_address INET,
  liability_accepted BOOLEAN DEFAULT false,
  leave_no_trace_accepted BOOLEAN DEFAULT false,
  byot_accepted BOOLEAN DEFAULT false,
  byot_required BOOLEAN DEFAULT false,
  
  -- Payment
  total_amount DECIMAL(10, 2) NOT NULL,
  platform_fee DECIMAL(10, 2) NOT NULL,
  landowner_payout DECIMAL(10, 2) NOT NULL,
  stripe_payment_intent_id TEXT UNIQUE,
  
  -- Status
  status TEXT NOT NULL CHECK (status IN (
    'PENDING_WAIVER',
    'PENDING_PAYMENT',
    'CONFIRMED',
    'ACTIVE',
    'COMPLETED',
    'CANCELLED'
  )) DEFAULT 'PENDING_WAIVER',
  
  -- Coordinates Reveal
  exact_coordinates_revealed BOOLEAN DEFAULT false,
  
  -- Post-Trip
  operator_rating INTEGER CHECK (operator_rating >= 1 AND operator_rating <= 5),
  landowner_rating INTEGER CHECK (landowner_rating >= 1 AND landowner_rating <= 5),
  incident_reported BOOLEAN DEFAULT false,
  incident_details TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reputation badges table
CREATE TABLE reputation_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_type TEXT NOT NULL,
  badge_name TEXT NOT NULL,
  badge_description TEXT,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_type)
);

-- Incidents table (for reporting trash/violations)
CREATE TABLE incidents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  reported_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_sectors_landowner ON sectors(landowner_id);
CREATE INDEX idx_sectors_active ON sectors(is_active) WHERE is_active = true;
CREATE INDEX idx_sectors_location ON sectors(fuzzy_lat, fuzzy_lng);
CREATE INDEX idx_bookings_operator ON bookings(operator_id);
CREATE INDEX idx_bookings_landowner ON bookings(landowner_id);
CREATE INDEX idx_bookings_sector ON bookings(sector_id);
CREATE INDEX idx_bookings_dates ON bookings(check_in_date, check_out_date);
CREATE INDEX idx_bookings_status ON bookings(status);

-- Function to auto-set byot_mandatory
CREATE OR REPLACE FUNCTION set_byot_mandatory()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.has_toilet = false THEN
    NEW.byot_mandatory = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_byot_mandatory
  BEFORE INSERT OR UPDATE ON sectors
  FOR EACH ROW
  EXECUTE FUNCTION set_byot_mandatory();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sectors_updated_at
  BEFORE UPDATE ON sectors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

