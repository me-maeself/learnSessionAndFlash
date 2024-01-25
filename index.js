const express = require("express");
const app = express();
const port = 3000;

const session = require("express-session");
app.use(
	session({
		secret: "superSecretKey",
		resave: false,
		saveUninitialized: false,
	})
);
// would send connect.sid -> connect session id
// Warning! This use server memory which is not the best usage.
// For production, store session in other places.

// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
//   }))

app.get("/viewcount", (req, res) => {
	if (req.session.count) {
		req.session.count += 1;
	} else {
		req.session.count = 1;
	}

	res.send(`You have viewed this page ${req.session.count} times.`);
});

app.get("/register", (req, res) => {
	const { username = "Anonymous" } = req.query;
	req.session.username = username;
	res.redirect("/greet");
});

app.get("/greet", (req, res) => {
	const { username } = req.session;
	res.send(`Hello, welcome back, ${username}`);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
