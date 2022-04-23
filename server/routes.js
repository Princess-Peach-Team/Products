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
          // console.log(result.rows);
          res.status(200).send(result.rows)
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        })
    })
})

router.get('/:product_id/styles', (req, res) => {
  let id = req.params.product_id;
  query()
    .then(client => {
      client
        .query(`
          SELECT
            styles.id AS style_id,
            styles.style_name AS name,
            styles.original_price AS original_price,
            styles.sale_price AS sale_price,
            styles.default_style AS "default\?",
            (array_agg(
              DISTINCT jsonb_build_object(
              'id', photos.id,
              'thumbnail_url', photos.thumbnail_url,
              'url', photos.url
              )
            )) AS photos,
            (json_object_agg(
              skus.id,
              json_build_object(
                'quantity', skus.quantity,
                'size', skus.size
              )
            )) AS skus
          FROM styles
          LEFT JOIN photos ON photos.styleid = styles.id
          LEFT JOIN skus ON skus.styleId = styles.id
          WHERE styles.productId = ${id}
          GROUP BY styles.id
        `)
        .then((result) => {
          client.release();
          res.send(result.rows)
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        })
    })
})

router.get('/:product_id/related', (req, res) => {
  let id = req.params.product_id;
  query()
    .then(client => {
      client
        .query(`
          SELECT
          (array_agg(
            related_product_id
          ))
          FROM related
          WHERE current_product_id = ${id}
        `)
        .then((result) => {
          client.release();
          res.send(result.rows[0].array_agg)
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        })
    })
})



module.exports = router;