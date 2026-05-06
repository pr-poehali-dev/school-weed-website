CREATE TABLE t_p27560793_school_weed_website.farm_crops (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  area INTEGER NOT NULL DEFAULT 0,
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  stage TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT '🌾',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO t_p27560793_school_weed_website.farm_crops (name, area, progress, stage, icon, sort_order) VALUES
  ('Пшеница озимая', 480, 75, 'Колошение', '🌾', 1),
  ('Подсолнечник', 320, 45, 'Рост', '🌻', 2),
  ('Кукуруза', 250, 30, 'Всходы', '🌽', 3),
  ('Ячмень', 190, 85, 'Восковая спелость', '🌿', 4);