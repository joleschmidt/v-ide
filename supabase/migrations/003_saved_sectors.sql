-- Saved sectors table (bookmarks/favorites)
CREATE TABLE saved_sectors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  sector_id UUID NOT NULL REFERENCES sectors(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, sector_id)
);

-- Enable RLS
ALTER TABLE saved_sectors ENABLE ROW LEVEL SECURITY;

-- Users can view their own saved sectors
CREATE POLICY "Users can view own saved sectors"
  ON saved_sectors FOR SELECT
  USING (auth.uid() = user_id);

-- Users can save sectors
CREATE POLICY "Users can save sectors"
  ON saved_sectors FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can unsave sectors
CREATE POLICY "Users can unsave sectors"
  ON saved_sectors FOR DELETE
  USING (auth.uid() = user_id);

-- Index for faster lookups
CREATE INDEX idx_saved_sectors_user_id ON saved_sectors(user_id);
CREATE INDEX idx_saved_sectors_sector_id ON saved_sectors(sector_id);

