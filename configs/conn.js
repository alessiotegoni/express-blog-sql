import mysql from "mysql2/promise";

const conn = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_blog",
});

export const connectDB = async () => {
  try {
    await conn.connect();
    console.log("✅ Database connected succesfully");
  } catch (err) {
    console.error(err);
  }
};

export default conn;
