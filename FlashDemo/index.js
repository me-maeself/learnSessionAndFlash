const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const ejs = require("ejs");

const sessionOptions = {
	secret: "thisisnotagoodsecret",
	resave: false,
	saveUninitialized: false,
};
app.use(session(sessionOptions));
app.use(flash());

const Farm = require("./models/farm");

mongoose
	.connect("mongodb://localhost:27017/flashDemo")
	.then(() => {
		console.log("MONGO CONNECTION OPEN!!!");
	})
	.catch((err) => {
		console.log("OH NO MONGO CONNECTION ERROR!!!!");
		console.log(err);
	});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
	// res.locals.<name> is a way to store information like res.render(,{...})
	res.locals.messages = req.flash("success");
	return next();
});

// FARM ROUTES

app.get("/farms", async (req, res) => {
	const farms = await Farm.find({});
	// res.render("farms/index", { farms, messages: req.flash("success") });
	res.render("farms/index", { farms });
});
app.get("/farms/new", (req, res) => {
	res.render("farms/new");
});
app.get("/farms/:id", async (req, res) => {
	const farm = await Farm.findById(req.params.id).populate("products");
	res.render("farms/show", { farm });
});

app.post("/farms", async (req, res) => {
	const farm = new Farm(req.body);
	await farm.save();
	req.flash("success", "Successfully made a farm!");
	res.redirect("/farms");
});

app.listen(3000, () => {
	console.log("APP IS LISTENING ON PORT 3000!");
});
