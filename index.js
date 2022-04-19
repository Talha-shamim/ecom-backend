import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mysql from "mysql";
// import allRoutes from "./routes/routes.js";

const app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "santosh75",
	database: "mydb",
});

app.post("/register", async (req, res) => {
	const email = req.body.email;
	const name = req.body.name;
	const password = req.body.password;
	db.query(
		"INSERT INTO users (email, password, name) VALUES (?,?,?)",
		[email, password, name],
		(err, result) => {
			if (err) res.status(501).json({ message: "signup failed" });
			else res.status(200).json({ message: "signup successful" });
		}
	);
});

app.post("/login", async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	db.query(
		"SELECT * FROM users WHERE email = ? AND password = ?",
		[email, password],
		(err, result) => {
			if (err) {
				console.log("login failed");
				res.status(401).json({ message: "login failed" });
			} else res.status(200).json({ message: "signup successful" });
		}
	);
});

// app.use("/ecom", allRoutes);

app.listen(3001, () => {
	console.log("server in connection");
});
