const express = require("express");
const app = express();
const fs = require("fs");
const fatQuery = require("./fatQuery.js");
const mysql = require("mysql2/promise");
//rentrer le bordel csv en js

let content = fs.readFileSync("gros-data12.csv", "utf8");

const rows = content.split("\n");

const createDB = async () => {
  try {
    // Create a specific connection to the database
    const databaseClient = await mysql.createConnection({
      host: "localhost",
      port: "3306",
      user: "tristan", // Change this
      password: "1995", // Change this
    });

    // Create a new database with the specified name

    // Switch to the newly created database
    await databaseClient.query("USE proto_p_trois");

    // await databaseClient.query("DROP TABLE my_test_fat_table");

    // // Execute the SQL statements to update the database schema
    await databaseClient.query(fatQuery);

    // await databaseClient.query(
    //   `INSERT INTO nom_table VALUES (${})`,
    // );
    async function insert(col) {
      await databaseClient.query(`INSERT INTO my_test_fat_table VALUES (${col})`);
    }

    rows.forEach((row) => {
      const cols = row
        .split(";")
        .map((el) => el.replace(/"/g, " "))
        .map((el, i) => (i == 0 ? (el = 0) : `"${el}"`));

      insert(cols);
    });
    // Close the database connection
    databaseClient.end();

    console.info("updated 🆙");
  } catch (err) {
    console.error("Error updating the database:", err.message, err.stack);
  }
};

// // // Run the createDB function
createDB();
