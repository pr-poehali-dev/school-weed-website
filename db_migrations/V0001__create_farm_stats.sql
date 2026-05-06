CREATE TABLE IF NOT EXISTS farm_stats (
  id SERIAL PRIMARY KEY,
  key VARCHAR(64) UNIQUE NOT NULL,
  value VARCHAR(128) NOT NULL,
  label VARCHAR(128) NOT NULL,
  unit VARCHAR(64) DEFAULT '',
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO farm_stats (key, value, label, unit) VALUES
  ('hectares', '1240', 'Гектаров под посевом', 'га'),
  ('employees', '48', 'Активных сотрудников', ''),
  ('harvest', '860', 'Урожай этого сезона', 'т'),
  ('machines', '7', 'Техника в работе', 'из 10')
ON CONFLICT (key) DO NOTHING;
