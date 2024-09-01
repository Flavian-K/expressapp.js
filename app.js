// Importing required modules
const express = require("express");
const app = express();
const path = require("path");

// Setting the port
const port = 3000;

// Set the view engine to Pug
app.set("view engine", "pug");

// Set the directory for views
app.set("views", path.join(__dirname, "views"));

// Serve static files (like CSS) from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Custom middleware to check if the request is during working hours
app.use((req, res, next) => {
	const date = new Date();
	const day = date.getDay();
	const hour = date.getHours();

	// Check if the current time is Monday to Friday, 9 AM to 5 PM
	if (day > 0 && day < 6 && hour >= 9 && hour < 17) {
		next(); // If within working hours, proceed to the next middleware
	} else {
		res.send(
			"Sorry, the website is only available during working hours (Monday to Friday, 9 AM to 5 PM)."
		);
	}
});

// Route for the Home page
app.get("/", (req, res) => {
	res.render("home");
});

// Route for the Our Services page
app.get("/services", (req, res) => {
	res.render("services");
});

// Route for the Contact Us page
app.get("/contact", (req, res) => {
	res.render("contact");
});

// Start the server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
