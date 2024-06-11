const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "koinetmedia",
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL database");
});

// Function to fetch all entries from contact_form
const getAllContactFormEntries = (callback) => {
    connection.query("SELECT * FROM contact_form", (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

// Function to add a new entry to contact_form
const addContactFormEntry = (entryData, callback) => {
    connection.query(
        "INSERT INTO contact_form SET ?",
        entryData,
        (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        }
    );
};

// Function to fetch all blog posts
const getAllBlogPosts = (callback) => {
    connection.query("SELECT * FROM blog", (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

// Function to add a new blog post
const addBlogPost = (postData, callback) => {
    connection.query("INSERT INTO blog SET ?", postData, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};
//update blog 
const updateBlogPost = (data, callback) => {
    connection.query(
        "UPDATE blog SET title = ?, content = ? , author = ? WHERE id = ?",
        data,
        (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        }
    );
};
//register user

const addUser = (userData, callback) => {
    connection.query(
        "INSERT INTO register SET ?",
        userData,
        (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        }
    );
};

//login user
const loginUser = (email, password, callback) => {
    connection.query(
        "SELECT * FROM register WHERE email = ? AND password = ?", [email, password],
        (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        }
    );
};

// Exporting functions
module.exports = {
    connection: connection,
    getAllContactFormEntries: getAllContactFormEntries,
    addContactFormEntry: addContactFormEntry,
    getAllBlogPosts: getAllBlogPosts,
    addBlogPost: addBlogPost,
    updateBlogPost: updateBlogPost,
    addUser: addUser,
    loginUser: loginUser,
};