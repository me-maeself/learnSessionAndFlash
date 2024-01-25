# Sessions and Flash

## Overview
Crucial:
- Conceptual overview of Session
- Setting up Express Session

Important:
- Integrating Flash Messages

## 495. Sessions
- Cookies -> State data on client side
  - have size limits
  - not secure
- Sessions -> State data on server side

Session and cookies work together:
- All data in a state (session data) **stored in database**
- **Server send a key** (as cookie) to clients
- **Cookies saved**. Cookies is a key to access those session
- Client request would include cookies to **unlock and access** session

## 496. Express Sessions
- a library for sessions in express
- `req.session.<name>`
```js
const session = require("express-session");
app.use(session({ secret: "superSecretKey" }));
```
```js
app.get("/viewcount", (req, res) => {
	if (req.session.count) {
		req.session.count += 1;
	} else {
		req.session.count = 1;
	}

	res.send(`You have viewed this page ${req.session.count} times.`);
});
```

## 497. More Express Sessions
Session Option:
```js
// This session using server memory, and not production best practice
// Warning: Memory leak.
const session = require("express-session");
app.use(
	session({
		secret: "superSecretKey",
		resave: false,
		saveUninitialized: false,
	})
);
```
```js
app.get("/register", (req, res) => {
	const { username = "Anonymous" } = req.query;
	req.session.username = username;
	res.redirect("/greet");
});

app.get("/greet", (req, res) => {
	const { username } = req.session;
	res.send(`Hello, welcome back, ${username}`);
});
```

## 498. Flash
Flash is something that persist only for a moment and then go away.
example: "You successfully signed in!" 
- npm i connect-flash

## 499. Res.locals & Flash