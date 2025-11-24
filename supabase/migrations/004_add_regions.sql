-- Add region field to sectors table
ALTER TABLE sectors ADD COLUMN IF NOT EXISTS region TEXT;

-- Create index for faster region queries
CREATE INDEX IF NOT EXISTS idx_sectors_region ON sectors(region);

-- Update existing sectors with default region (can be updated manually)
-- This is optional - you can leave it NULL for now

