import { Pool } from "pg";

const pool = new Pool({
    user: "postgres",
    password: "batyrbet",
    host: "localhost",
    port: 5432,
    database: "perntiktok",
});

export default pool;
