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

```js
const flash = require("flash")

app.get("...0",(req,res)=>{
  req.flash("<name>", "<value>")
  redirect("...1")
})

app.get("...1", (req, res)=>{
  const {messages} = req.flash
  res.render(".../pages1", {messages})
})
```

## 499. res.locals & Flash
res.locals is a way to mount something into res.render directly. And it only persist in one cycle. 
```js
app.use((req, res, next) => {
	// res.locals.<name> is a way to store information like res.render(,{...})
	res.locals.messages = req.flash("success");
	return next();
});
```

```js
app.post("/farms", async (req, res) => {
	const farm = new Farm(req.body);
	await farm.save();
	req.flash("success", "Successfully made a farm!");
	res.redirect("/farms");
});
```

# Key notes:
- Both Session and Flash always get called on req.
- Packages:
  - express-session
  - connect-flash

- req.session
  - npm i express session
- req.flash
  - npm i connect-flash
- res.locals
  - built in function in express res.
  - Would bundle res.locals.<name> in res.render(,{<name>})