-- Crea la tabla de perfiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  bio TEXT,
  sports TEXT[], 
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilita la Seguridad a Nivel de Fila (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad:
-- 1. Cualquiera puede ver los perfiles (para que el Tinder funcione)
CREATE POLICY "Perfiles publicos visibles por todos"
  ON profiles FOR SELECT
  USING ( true );

-- 2. Los usuarios solo pueden insertar su propio perfil
CREATE POLICY "Usuarios pueden insertar su propio perfil"
  ON profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

-- 3. Los usuarios solo pueden editar su propio perfil
CREATE POLICY "Usuarios pueden actualizar su propio perfil"
  ON profiles FOR UPDATE
  USING ( auth.uid() = id );

-- Permite actualizaciones en tiempo real
ALTER PUBLICATION supabase_realtime ADD TABLE profiles;
