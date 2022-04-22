const express = require('express');
const router = express.Router();
const { query } = require('../db.js');

router.get('/', (req, res) => {
  query()
    .then(client => {
      client
        .query('SELECT * FROM products WHERE id <= 5')
        .then(result => {
          client.release();
          res.status(200).send(result.rows);
        })
        .catch(err => {
          client.release();
          console.log(err.stack);
          res.sendStatus(500);
        })
    })
})

module.exports = router;