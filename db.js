const { Pool, Client } = require('pg');
const pool = new Pool({
  user: "andy",
  port: 5432,
  database: "mydb",
  host: "54.193.114.123"
})

// pool.connect()
// .then(() => console.log("Connected successfully"))
// .then(() => pool.query("EXPLAIN ANALYZE SELECT * FROM products;"))
// .then((res) => console.log(res))
// .catch((err) => console.log(err))
// .finally(() => pool.end())

pool.on('error', (err, client) => {
  console.err('Unexpected error on idle client', err);
  process.exit(-1);
})

// const query = () => {
//   return pool.connect()
//     .then(client => {
//       client
//         .query('SELECT * FROM products WHERE id < 20')
//         .then(res => {
//           client.release();
//           console.log(res.rows);
//         })
//         .catch(err => {
//           client.release();
//           console.log(err.stack);
//         })
//     })
// }

module.exports = {
  query: () => {
    return pool.connect();
  }
};