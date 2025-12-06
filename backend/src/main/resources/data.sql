-- Insert test users (only if they don't exist)
INSERT IGNORE INTO user (username, password, mail_id, role) VALUES ('n', 'n', 'n@test.com', 'admin');
INSERT IGNORE INTO user (username, password, mail_id, role) VALUES ('admin', 'admin123', 'admin@test.com', 'admin');
INSERT IGNORE INTO user (username, password, mail_id, role) VALUES ('user', 'user123', 'user@test.com', 'user');
