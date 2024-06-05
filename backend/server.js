import express from "express";
import pg from "pg";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});

const app = express();

app.use(cors({
    origin: "*",
    credentials: true
}))

app.use(express.json({limit: "20kb"}));

app.use(express.static("dist"));

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "world",
    password: `${process.env.POSTGRES_PASSWORD}`,
    port: 5432
});

db.connect();

let quiz = [];

db.query("SELECT * FROM capitals", (err, res) => {
    if(err) {
        console.log("Error executing query ", err.stack);
    }
    else {
        quiz = res.rows;
    }

    db.end();
});


app.get("/", (req, res) => {
  res.send(quiz);
});

app.listen(3000, () => {
    console.log("Server is live and running on port 3000");
})