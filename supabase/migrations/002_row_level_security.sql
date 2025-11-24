-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reputation_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;

-- Users Policies
-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Public can read basic user info (for reputation display)
CREATE POLICY "Public can read user reputation"
  ON users FOR SELECT
  USING (true);

-- Sectors Policies
-- Public can view active sectors (with fuzzy locations)
CREATE POLICY "Public can view active sectors"
  ON sectors FOR SELECT
  USING (is_active = true);

-- Landowners can manage their own sectors
CREATE POLICY "Landowners can insert own sectors"
  ON sectors FOR INSERT
  WITH CHECK (
    auth.uid() = landowner_id AND
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role IN ('LANDOWNER', 'BOTH')
    )
  );

CREATE POLICY "Landowners can update own sectors"
  ON sectors FOR UPDATE
  USING (auth.uid() = landowner_id);

CREATE POLICY "Landowners can delete own sectors"
  ON sectors FOR DELETE
  USING (auth.uid() = landowner_id);

-- Bookings Policies
-- Operators can view their own bookings
CREATE POLICY "Operators can view own bookings"
  ON bookings FOR SELECT
  USING (auth.uid() = operator_id);

-- Landowners can view bookings for their sectors
CREATE POLICY "Landowners can view sector bookings"
  ON bookings FOR SELECT
  USING (
    auth.uid() = landowner_id OR
    EXISTS (
      SELECT 1 FROM sectors
      WHERE sectors.id = bookings.sector_id AND sectors.landowner_id = auth.uid()
    )
  );

-- Operators can create bookings
CREATE POLICY "Operators can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (
    auth.uid() = operator_id AND
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role IN ('OPERATOR', 'BOTH')
    )
  );

-- Operators can update their own bookings (before payment)
CREATE POLICY "Operators can update own bookings"
  ON bookings FOR UPDATE
  USING (
    auth.uid() = operator_id AND
    status IN ('PENDING_WAIVER', 'PENDING_PAYMENT')
  );

-- Landowners can update bookings for their sectors (status changes)
CREATE POLICY "Landowners can update sector bookings"
  ON bookings FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM sectors
      WHERE sectors.id = bookings.sector_id AND sectors.landowner_id = auth.uid()
    )
  );

-- Exact coordinates revealed only after booking confirmed
-- This is handled in application logic, not RLS
-- But we can add a view for operators with confirmed bookings

-- Reputation Badges Policies
-- Public can read badges
CREATE POLICY "Public can read badges"
  ON reputation_badges FOR SELECT
  USING (true);

-- Users can insert their own badges (via application logic)
CREATE POLICY "Users can insert own badges"
  ON reputation_badges FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Incidents Policies
-- Landowners can report incidents
CREATE POLICY "Landowners can report incidents"
  ON incidents FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM bookings
      JOIN sectors ON sectors.id = bookings.sector_id
      WHERE bookings.id = incidents.booking_id
        AND sectors.landowner_id = auth.uid()
    )
  );

-- Landowners can view incidents for their sectors
CREATE POLICY "Landowners can view sector incidents"
  ON incidents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM bookings
      JOIN sectors ON sectors.id = bookings.sector_id
      WHERE bookings.id = incidents.booking_id
        AND sectors.landowner_id = auth.uid()
    )
  );

