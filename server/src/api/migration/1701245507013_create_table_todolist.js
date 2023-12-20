module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS task(
        id INT AUTO_INCREMENT PRIMARY KEY,
        task varchar(225) NULL,
        user_id varchar(225) NULL,
        status INT DEFAULT 0,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp ON UPDATE CURRENT_TIMESTAMP
    )`,
    "down": "DROP TABLE IF EXISTS task"
}