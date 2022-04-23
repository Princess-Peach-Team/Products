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

router.get('/:product_id', (req, res) => {
  let id = req.params.product_id;
  query()
    .then(client => {
      client
        // .query(`
        //   SELECT json_build_object(
        //     'id', products.id,
        //     'name', products.name,
        //     'slogan', products.slogan,
        //     'description', products.description,
        //     'category', products.category,
        //     'default_price', products.default_price,
        //     'features', (json_build_array(json_build_object(
        //       'feature', features.feature,
        //       'value', features.value
        //     ))))
        //   FROM products
        //   LEFT JOIN features ON features.product_id = products.id
        //   WHERE products.id = ${id}
        // `)
        .query(`
          SELECT
            products.id AS id,
            products.name AS name,
            products.slogan AS slogan,
            products.description AS description,
            products.category AS category,
            products.default_price AS default_price,
            (array_agg(
              json_build_object(
              'feature', features.feature,
              'value', features.value
              )
            )) AS features
          FROM products
          LEFT JOIN features ON features.product_id = products.id
          WHERE products.id = ${id}
          GROUP BY products.id
        `)
        .then((result) => {
          client.release();
          console.log(result.rows);
          res.send(result.rows[0])
        })
    })
})

module.exports = router;