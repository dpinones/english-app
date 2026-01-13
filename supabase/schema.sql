-- ==========================================
-- SCHEMA SQL PARA SUPABASE
-- App de Aprendizaje de Ingles
-- ==========================================

-- Habilitar UUID extension si no esta habilitada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- TABLA: topics
-- Temas de gramatica (220 del archivo temasIngles.md)
-- ==========================================
CREATE TABLE IF NOT EXISTS topics (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    level TEXT NOT NULL CHECK (level IN ('A1', 'A2', 'B1', 'B1+', 'B2')),
    category TEXT NOT NULL,
    svo_pattern TEXT,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index para busquedas por nivel
CREATE INDEX IF NOT EXISTS idx_topics_level ON topics(level);

-- ==========================================
-- TABLA: exercises
-- Ejercicios predefinidos
-- ==========================================
CREATE TABLE IF NOT EXISTS exercises (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    topic_id INTEGER REFERENCES topics(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN (
        'svo_builder',
        'fill_blank',
        'sentence_order',
        'multiple_choice',
        'transform',
        'question_answer'
    )),
    prompt TEXT NOT NULL,
    content JSONB NOT NULL,
    explanation TEXT,
    difficulty INTEGER DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 5),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index para busquedas por tema
CREATE INDEX IF NOT EXISTS idx_exercises_topic ON exercises(topic_id);

-- ==========================================
-- TABLA: user_progress
-- Progreso del usuario con SRS (Spaced Repetition System)
-- Nota: exercise_id es TEXT porque los ejercicios estan en archivos locales
-- ==========================================
CREATE TABLE IF NOT EXISTS user_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id TEXT NOT NULL DEFAULT 'default-user-001',
    exercise_id TEXT NOT NULL,
    -- SRS fields
    ease_factor DECIMAL(4,2) DEFAULT 2.5 CHECK (ease_factor >= 1.3 AND ease_factor <= 3.0),
    interval_days INTEGER DEFAULT 1 CHECK (interval_days >= 0),
    repetitions INTEGER DEFAULT 0 CHECK (repetitions >= 0),
    next_review DATE DEFAULT CURRENT_DATE,
    last_review TIMESTAMPTZ,
    -- Performance tracking
    times_correct INTEGER DEFAULT 0 CHECK (times_correct >= 0),
    times_incorrect INTEGER DEFAULT 0 CHECK (times_incorrect >= 0),
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'learning', 'review', 'mastered')),
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    -- Unique constraint per user per exercise
    UNIQUE(user_id, exercise_id)
);

-- Indexes para user_progress
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_next_review ON user_progress(user_id, next_review);
CREATE INDEX IF NOT EXISTS idx_user_progress_status ON user_progress(user_id, status);

-- ==========================================
-- TABLA: topic_progress
-- Progreso del usuario por tema
-- ==========================================
CREATE TABLE IF NOT EXISTS topic_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id TEXT NOT NULL DEFAULT 'default-user-001',
    topic_id INTEGER REFERENCES topics(id) ON DELETE CASCADE,
    exercises_completed INTEGER DEFAULT 0 CHECK (exercises_completed >= 0),
    exercises_correct INTEGER DEFAULT 0 CHECK (exercises_correct >= 0),
    last_practiced TIMESTAMPTZ,
    mastery_level INTEGER DEFAULT 0 CHECK (mastery_level BETWEEN 0 AND 100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    -- Unique constraint per user per topic
    UNIQUE(user_id, topic_id)
);

-- Indexes para topic_progress
CREATE INDEX IF NOT EXISTS idx_topic_progress_user ON topic_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_topic_progress_mastery ON topic_progress(user_id, mastery_level);

-- ==========================================
-- TABLA: daily_stats
-- Estadisticas diarias
-- ==========================================
CREATE TABLE IF NOT EXISTS daily_stats (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id TEXT NOT NULL DEFAULT 'default-user-001',
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    exercises_done INTEGER DEFAULT 0 CHECK (exercises_done >= 0),
    correct INTEGER DEFAULT 0 CHECK (correct >= 0),
    minutes_practiced INTEGER DEFAULT 0 CHECK (minutes_practiced >= 0),
    streak_days INTEGER DEFAULT 0 CHECK (streak_days >= 0),
    xp_earned INTEGER DEFAULT 0 CHECK (xp_earned >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    -- Unique constraint per user per day
    UNIQUE(user_id, date)
);

-- Indexes para daily_stats
CREATE INDEX IF NOT EXISTS idx_daily_stats_user ON daily_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_stats_date ON daily_stats(user_id, date DESC);

-- ==========================================
-- FUNCIONES Y TRIGGERS
-- ==========================================

-- Funcion para actualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para user_progress
DROP TRIGGER IF EXISTS update_user_progress_updated_at ON user_progress;
CREATE TRIGGER update_user_progress_updated_at
    BEFORE UPDATE ON user_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para topic_progress
DROP TRIGGER IF EXISTS update_topic_progress_updated_at ON topic_progress;
CREATE TRIGGER update_topic_progress_updated_at
    BEFORE UPDATE ON topic_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- Para uso personal sin auth, deshabilitamos RLS
-- Si luego agregas auth, habilita y configura las policies
-- ==========================================

-- Por ahora dejamos RLS deshabilitado para uso personal
-- ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE topic_progress ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- VISTAS UTILES
-- ==========================================

-- Vista: ejercicios para revisar hoy (simplificada - sin join a exercises)
-- Los ejercicios se almacenan localmente en la app
CREATE OR REPLACE VIEW exercises_due_today AS
SELECT
    up.id as progress_id,
    up.user_id,
    up.exercise_id,
    up.ease_factor,
    up.interval_days,
    up.repetitions,
    up.next_review,
    up.status,
    up.times_correct,
    up.times_incorrect
FROM user_progress up
WHERE up.next_review <= CURRENT_DATE;

-- Vista: resumen de progreso por nivel
CREATE OR REPLACE VIEW progress_by_level AS
SELECT
    tp.user_id,
    t.level,
    COUNT(DISTINCT tp.topic_id) as topics_practiced,
    SUM(tp.exercises_completed) as total_exercises,
    SUM(tp.exercises_correct) as total_correct,
    AVG(tp.mastery_level) as avg_mastery
FROM topic_progress tp
JOIN topics t ON tp.topic_id = t.id
GROUP BY tp.user_id, t.level
ORDER BY
    CASE t.level
        WHEN 'A1' THEN 1
        WHEN 'A2' THEN 2
        WHEN 'B1' THEN 3
        WHEN 'B1+' THEN 4
        WHEN 'B2' THEN 5
    END;

-- ==========================================
-- DATOS INICIALES (Opcional)
-- Los temas se cargan desde la app
-- ==========================================

-- Comentado porque los temas se manejan desde el archivo topics.ts
-- Si quieres poblar la tabla topics desde SQL, descomenta y adapta:
/*
INSERT INTO topics (id, title, level, category, order_index) VALUES
(1, 'Present simple forms of ''to be'': am/is/are', 'A1', 'present-tenses', 1),
(2, 'Present simple: I do, I don''t, Do I?', 'A1', 'present-tenses', 2),
...
*/
