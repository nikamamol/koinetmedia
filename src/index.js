const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
require('dotenv').config();
const static_path = path.join(__dirname, "../views");
const partials_path = path.join(__dirname, "../views/partials");
const db = require("../src/database/config.js");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fileUpload = require("express-fileupload");
const nodemailer = require('nodemailer');
const cookieParser = require('cookie-parser');
const secretKey = process.env.SECRETE_KEY;
const port = process.env.PORT || 8080;

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
app.use(cookieParser());
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
app.use(fileUpload());


app.post('/api/addblog', (req, res) => {
    const { title, category, content } = req.body;
    let imageUrl = null;

    // Handle file upload if there is a file
    if (req.file) {
        const image = req.file;
        imageUrl = '/avatar/' + image.filename;

        // Insert into database after file upload
        db.addBlogPost(title, category, content, imageUrl, (err, result) => {
            if (err) {
                console.error('Error inserting blog post:', err);
                return res.status(500).json({ error: 'Error inserting blog post' });
            }
            res.status(200).json({ message: 'Blog created successfully', imageUrl });
        });
    } else if (req.body.imageUrl) {
        // If imageUrl is provided in the request body directly
        imageUrl = req.body.imageUrl;

        db.addBlogPost(title, category, content, imageUrl, (err, result) => {
            if (err) {
                console.error('Error inserting blog post:', err);
                return res.status(500).json({ error: 'Error inserting blog post' });
            }
            res.status(200).json({ message: 'Blog created successfully' });
        });
    } else {
        // Handle case where no file and no imageUrl provided
        db.addBlogPost(title, category, content, imageUrl, (err, result) => {
            if (err) {
                console.error('Error inserting blog post:', err);
                return res.status(500).json({ error: 'Error inserting blog post' });
            }
            res.status(200).json({ message: 'Blog created successfully' });
        });
    }
});

//get blog post on blog page
app.get('/api/blogs', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const category = req.query.category || ''; // New category filter

    const offset = (page - 1) * limit;

    db.getAllBlogPosts(limit, offset, search, category, (err, rows) => {
        if (err) {
            res.status(500).send('Error retrieving blog posts');
        } else {
            res.status(200).json(rows);
        }
    });
});

//get blog with id 
app.get('/api/blog/:id', (req, res) => {
    const blogId = req.params.id;
    db.getBlogPostById(blogId, (err, blogPost) => {
        if (err) {
            console.error('Error retrieving blog post:', err);
            res.status(500).json({ error: 'Error retrieving blog post' });
        } else {
            res.status(200).json(blogPost);
        }
    });
});

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
    const { firstName, lastName, email, password, phone, role } = req.body;

    if (!firstName || !lastName || !email || !password || !phone || !role) {
        return res.status(400).send("All fields are required.");
    }

    const entryData = {
        firstName,
        lastName,
        email,
        password,
        phone,
        role
    };

    db.addUser(entryData, (err, result) => {
        if (err) {
            console.error("Error registering user:", err);
            return res.status(500).send("Error registering user.");
        }

        // Generate JWT token
        const token = jwt.sign({ email: email }, secretKey, { expiresIn: "1h" });
        res.status(201).json({ message: "User registered successfully.", token });


    });
});

//login
app.post("/login", async(req, res) => {
    const { email, password } = req.body;
    db.loginUser(email, password, (err, result) => {
        if (err) {
            res.status(500).json({ message: "Error logging in user." });
        } else {
            if (result.length > 0) {
                const token = jwt.sign({ email: email }, secretKey, { expiresIn: "1h" });
                res.status(200).json({ message: "User logged in successfully.", token: token });
            } else {
                res.status(401).json({ message: "Invalid email or password." });
            }
        }
    });
});

// nodemaile
app.post('/send-email', async(req, res) => {
    const { email } = req.body;

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });


    // Email options
    const mailOptions = {
        from: email,
        to: process.env.MAIL_TO,
        subject: `New Signup from ${email}`,
        text: `You have a new signup with the email: ${email}`
    };

    try {
        await transporter.sendMail(mailOptions);

        // Insert email data into the database
        db.addEmailRecord({ email }, (err, insertId) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error saving email data to database');
                return;
            }
            console.log('Email data saved to database with ID:', insertId);
            // res.send("/");
            res.redirect("/contact");
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});