const express = require("express");
const app = express();
const fs = require("fs");
const chargingQuery = require("./queries/chargingQuery");
const mysql = require("mysql2/promise");
//rentrer le bordel csv en js

const content = fs.readFileSync("charging_station.csv", "utf8");

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

    // await databaseClient.query("CREATE DATABASE proto_p_trois");

    // Switch to the newly created database
    await databaseClient.query("USE proto_p_trois");

    await databaseClient.query("DROP TABLE charging_station");

    // // Execute the SQL statements to update the database schema
    await databaseClient.query(chargingQuery);

    async function insert(col) {
      await databaseClient.query(`INSERT INTO charging_station VALUES (${col})`);
    }

    rows.forEach((row) => {
      const cols = row
        .split(";")
        .map((el, i) =>
          i == 0 ? (el = 0) : i == 5 || i == 6 || i == 9 ? el.replace(",", ".") : el,
        );

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
