DROP TABLE IF EXISTS article;
DROP TABLE IF EXISTS author;

CREATE TABLE author (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE article (                                                                
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT,
  body TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  author_id BIGINT,
  FOREIGN KEY (author_id) REFERENCES author(id)
);