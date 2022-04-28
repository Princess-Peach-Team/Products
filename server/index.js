const express = require('express');
const cors = require('cors');
const routes = require('./routes.js');
const app = express();
const port = 3001;

app.use(cors());
app.get('/loaderio-b6aa0914f0ad1eae276fdd4417f74098.txt', (req, res) => {
  res.status(200).send(process.env.LOADER_TOKEN);
})
app.use('/products', routes);


app.listen(port, () => {
  console.log('Listening on port', port);
})