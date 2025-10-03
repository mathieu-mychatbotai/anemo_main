/*
  # Create memories table schema

  1. New Tables
    - `memories`
      - `id` (uuid, primary key) - Unique identifier for each memory
      - `user_id` (uuid, foreign key) - References auth.users
      - `text` (text) - The memory content/transcript
      - `date` (timestamptz) - When the memory was recorded
      - `category` (text, optional) - Memory category (e.g., Family, Childhood)
      - `emotion` (text, optional) - Associated emotion (e.g., Joy, Pride)
      - `created_at` (timestamptz) - When the record was created
      - `updated_at` (timestamptz) - When the record was last updated

  2. Security
    - Enable RLS on `memories` table
    - Add policy for users to view their own memories
    - Add policy for users to create their own memories
    - Add policy for users to update their own memories
    - Add policy for users to delete their own memories

  3. Important Notes
    - All memories are private to the user who created them
    - Users can only access their own memories
    - Proper foreign key constraint ensures data integrity
*/

CREATE TABLE IF NOT EXISTS memories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  text text NOT NULL,
  date timestamptz DEFAULT now() NOT NULL,
  category text,
  emotion text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own memories"
  ON memories FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own memories"
  ON memories FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own memories"
  ON memories FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own memories"
  ON memories FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS memories_user_id_idx ON memories(user_id);
CREATE INDEX IF NOT EXISTS memories_date_idx ON memories(date DESC);