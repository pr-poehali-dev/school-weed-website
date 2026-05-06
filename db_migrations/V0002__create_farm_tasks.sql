CREATE TABLE IF NOT EXISTS farm_tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  assignee VARCHAR(128) DEFAULT '',
  due VARCHAR(64) DEFAULT '',
  priority VARCHAR(16) DEFAULT 'medium',
  done BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO farm_tasks (title, assignee, due, priority, done) VALUES
  ('Опрыскивание поля №3', 'Иванов А.', 'Сегодня', 'high', false),
  ('ТО трактора Беларус 82', 'Петров Д.', 'Завтра', 'medium', false),
  ('Инвентаризация склада', 'Сидорова Н.', '15 мая', 'low', false),
  ('Сортировка семян кукурузы', 'Козлов В.', '12 мая', 'medium', true),
  ('Ремонт ирригации поля №1', 'Михайлов С.', '11 мая', 'high', true);
