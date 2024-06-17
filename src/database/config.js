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
    connection.query("SELECT * FROM blogs2", (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

const addBlogPost = (title, category, content, imageUrl, callback) => {
    const sql =
        "INSERT INTO blogs2 (title, category, content, imageUrl) VALUES (?, ?, ?, ?)";
    connection.query(sql, [title, category, content, imageUrl], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};



const getBlogPostById = (id, callback) => {
    connection.query('SELECT * FROM blogs2 WHERE id = ?', [id], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            if (rows.length > 0) {
                callback(null, rows[0]); // Assuming id is unique, return the first (and only) result
            } else {
                callback(new Error('Blog post not found'), null);
            }
        }
    });
};




//update blog
const updateBlogPost = (data, callback) => {
    connection.query(
        "UPDATE blog SET title = ?, content = ?, author = ?, imagePath = ? WHERE id = ?",
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
    connection.query("INSERT INTO register SET ?", userData, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
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

const addEmailRecord = (emailData, callback) => {
    const sql = "INSERT INTO signupemail (email) VALUES (?)";
    const values = [emailData.email];

    connection.query(sql, values, (err, result) => {
        if (err) {
            // console.error('Error inserting into MySQL: ' + err.stack);
            callback(err, null);
            return;
        }
        // console.log('Inserted into MySQL with ID: ' + result.insertId);
        callback(null, result.insertId);
    });
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
    getBlogPostById: getBlogPostById,
    addEmailRecord: addEmailRecord,
};