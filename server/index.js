const express = require('express');
const cors = require('cors');
const routes = require('./routes.js');
const app = express();
const port = 3001;

app.use(cors());
app.use('/products', routes);


app.listen(port, () => {
  console.log('Listening on port', port);
})