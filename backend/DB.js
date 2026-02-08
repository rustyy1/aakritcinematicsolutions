import mysql from "mysql2";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rajput@3015",
    database: "invoice_app",
});

db.connect(err => {
    if (err) {
        console.error("MySQL connection failed");
        return;
    }
    console.log("MySQL Connected");
});

export default db;