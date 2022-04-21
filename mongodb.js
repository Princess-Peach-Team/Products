const mongoose = require('mongoose');
// const db = require('./index.js');
mongoose.Promise = global.Promise;

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String
}
);

const stylesSchema = new mongoose.Schema({
  id: Number,
  name: String,
  sales_price: String,
  original_price: String,
  default_style: String
}
);

const featuresSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  featur: String,
  value: String
}
);

const relatedSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  related_product_id: Number
}
);

const photosSchema = new mongoose.Schema({
  id: Number,
  style_id: Number,
  url: String,
  thumbnail_url: String
}
);

const skusSchema = new mongoose.Schema({
  id: Number,
  styleId: Number,
  size: String,
  quantity: Number
}
);

const Product = mongoose.model('Product', productSchema);
const Styles = mongoose.model('Styles', stylesSchema);
const Features = mongoose.model('Features', featuresSchema);
const Photos = mongoose.model('Photos', photosSchema);
const Skus = mongoose.model('Skus', skusSchema);

module.exports = {
  Product,
  Styles,
  Features,
  Photos,
  Skus
};