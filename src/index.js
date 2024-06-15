const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const port = 8080;
const static_path = path.join(__dirname, "../views");
const partials_path = path.join(__dirname, "../views/partials");
const db = require("../src/database/config.js");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const secretKey =
    "pLud5OFaXkEa-8FrVYVnB3aZimVULT10fJapm-5vlKPnihgVUkJ3TFK_QqREbCkw";

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(express.json());
app.use(fileUpload());

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.get("/", (req, res) => {
    res.render("home", { title: "Home" });
});

app.get("/services", (req, res) => {
    res.render("services", { title: "Services" });
});

app.get("/blog", (req, res) => {
    res.render("blog", { title: "Blog" });
});
app.get("/addblog", (req, res) => {
    res.render("addblog", { title: "Add Blog" });
});
app.get("/viewblog/:id", (req, res) => {
    const blogId = req.params.id;
    res.render("viewblog", { title: "View Blog", blogId });
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About Us" });
});

app.get("/contact", (req, res) => {
    res.render("contact", { title: "Contact Us" });
});
app.get("/register", (req, res) => {
    res.render("register", { title: "Register" });
});
app.get("/login", (req, res) => {
    res.render("login", { title: "Login" });
});

app.get("/approch", (req, res) => {
    res.render("approch", { title: "Approch" });
});
app.get("/marketing", (req, res) => {
    res.render("marketing", { title: "Marketing" });
});
app.get("/performance", (req, res) => {
    res.render("performance", { title: "Performance" });
});
// footer pages
app.get("/privacy-policy", (req, res) => {
    res.render("privacy-policy", { title: "Privacy Policy" });
});
app.get("/GDPR", (req, res) => {
    res.render("GDPR", { title: "GDPR" });
});
app.get("/CCPA", (req, res) => {
    res.render("CCPA", { title: "CCPA" });
});
app.get("/terms-condition", (req, res) => {
    res.render("terms-condition", { title: "terms-condition" });
});
app.get("/cookies", (req, res) => {
    res.render("cookies", { title: "cookies" });
});
app.get("/case-studies", (req, res) => {
    res.render("case-studies", { title: "case-studies" });
});
app.get("/media-kit", (req, res) => {
    res.render("media-kit", { title: "media-kit" });
});
//services pages

app.get("/multichannellead", (req, res) => {
    res.render("multichannellead", { title: "MULTI CHANNEL LEAD" });
});
app.get("/s2_contactdiscovery", (req, res) => {
    res.render("s2_contactdiscovery", { title: "Contact Discovery" });
});
app.get("/s3_emailmarketing", (req, res) => {
    res.render("s3_emailmarketing", { title: "Email Marketing" });
});
app.get("/dataappend", (req, res) => {
    res.render("dataappend", { title: "Data Append & Cleansing" });
});
app.get("/demandgeneration", (req, res) => {
    res.render("demandgeneration", { title: "Demand Generation" });
});
app.get("/s4_socialmedia", (req, res) => {
    res.render("s4_socialmedia", { title: "Social Media Marketing" });
});
app.get("/s5_accountmarketing", (req, res) => {
    res.render("s5_accountmarketing", { title: "Account Marketing" });
});
app.get("/s6_appointment", (req, res) => {
    res.render("s6_appointment", { title: "Appointment " });
});
app.get("/s7_accountprofiling", (req, res) => {
    res.render("s7_accountprofiling", { title: "Account Profiling" });
});
app.get("/s8_seo", (req, res) => {
    res.render("s8_seo", { title: "Search Engine Optimization" });
});

app.set("view engine", "hbs");
app.set("views", static_path);
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use(
    "/css",
    express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
);
app.use(
    "/scss",
    express.static(path.join(__dirname, "public/scss/bootstrap.scss"))
);
app.use(
    "/js",
    express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
);
app.use("/lib", express.static(path.join(__dirname, "../public/lib"))); // Add this line to serve 'lib' directory

hbs.registerPartials(partials_path);
app.use(express.urlencoded({ extended: false }));


app.get("/getContact", (req, res) => {
    db.getAllContactFormEntries((err, entries) => {
        if (err) {
            res.status(500).send("Error fetching contact form entries");
        } else {
            res.json(entries);
        }
    });
});

// Add a new entry to contact_form
app.post("/postContact", (req, res) => {
    const entryData = req.body;
    db.addContactFormEntry(entryData, (err, result) => {
        if (err) {
            res.status(500).send("Error adding contact form entry");
        } else {
            res.status(201).send("Contact form entry added successfully");
        }
    });
});

// Get all blog posts
app.get("/getBlog", (req, res) => {
    db.getAllBlogPosts((err, posts) => {
        if (err) {
            res.status(500).send("Error fetching blog posts");
        } else {
            res.json(posts);
        }
    });
});

app.get("/viewblog/:id", (req, res) => {
    const blogId = req.params.id;
    connection.query("SELECT * FROM blog WHERE id = ?", [blogId], (err, rows) => {
        if (err) {
            res.status(500).json({ error: "Error fetching blog post" });
        } else {
            if (rows.length > 0) {
                res.render("viewblog", { post: rows[0] });
            } else {
                res.status(404).json({ error: "Blog post not found" });
            }
        }
    });
});
app.post("/addblogpost", (req, res) => {
    const postData = req.body;
    db.addBlogPost(postData, (err, result) => {
        if (err) {
            res.status(500).send("Error adding blog post");
        } else {
            res.status(201).send("Blog post added successfully");
        }
    });
});

//update blog
app.put("/updateBlog/:id", (req, res) => {
    const data = [
        req.body.title,
        req.body.content,
        req.body.author,
        req.body.imagePath,
        req.params.id,
    ];

    db.updateBlogPost(data, (err, result) => {
        if (err) {
            console.error("Error updating blog post:", err);
            res.status(500).send("Error updating blog post");
        } else {
            res.status(200).send("Blog post updated successfully");
        }
    });
});
//add user
// Add a new user registration endpoint
app.post("/register", (req, res) => {
    const { firstName, lastName, email, password, phone } = req.body;

    if (!firstName || !lastName || !email || !password || !phone) {
        return res.status(400).send("All fields are required.");
    }

    const entryData = {
        firstName,
        lastName,
        email,
        password,
        phone,
    };

    db.addUser(entryData, (err, result) => {
        if (err) {
            res.status(500).send("Error registering user.");
        } else {
            // Generate JWT token
            const token = jwt.sign({ email: email }, secretKey, { expiresIn: "1h" });
            res
                .status(201)
                .json({ message: "User registered successfully.", token: token });
        }
    });
});

//login
app.post("/login", async(req, res) => {
    const { email, password } = req.body;
    db.loginUser(email, password, (err, result) => {
        if (err) {
            res.status(500).send("Error logging in user.");
        } else {
            if (result.length > 0) {
                const token = jwt.sign({ email: email }, secretKey, {
                    expiresIn: "1h",
                });
                res
                    .status(200)
                    .json({ message: "User logged in successfully.", token: token });
                // res.redirect('/');
            } else {
                res.status(401).json({ message: "Error logging in user." });
            }
        }
    });
});
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});