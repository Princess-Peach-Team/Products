const { Client } = require('pg');
const client = new Client({
  user: "andy",
  port: 5432,
  database: "mydb",
  host: "localhost"
})

// let createTables = `
//   CREATE TABLE IF NOT EXISTS categories (
//     category_id INT PRIMARY KEY,
//     category VARCHAR
//   );

//   CREATE TABLE IF NOT EXISTS products (
//     product_id INTEGER,
//     name VARCHAR,
//     slogan VARCHAR,
//     description VARCHAR,
//     category_id
//     default_price INTEGER,
//     PRIMARY KEY(product_id),
//     CONSTRAINT fk_categories
//       FOREIGN KEY(category_id)
//         REFERENCES categories(category_id)
//   )`

let createTables = `
  CREATE TABLE IF NOT EXISTS products (
    id INT,
    name VARCHAR,
    slogan VARCHAR,
    description VARCHAR,
    category VARCHAR,
    default_price INT,
    PRIMARY KEY(id)
  );
  COPY products(id, name, slogan, description, category, default_price)
  FROM '/Users/andy/Desktop/HackReactor/SDC/product.csv'
  DELIMITER ','
  CSV HEADER;`;

client.connect()
.then(() => console.log("Connected successfully"))
.then(() => client.query(createTables))
.catch((err) => console.log(err))
.finally(() => client.end())