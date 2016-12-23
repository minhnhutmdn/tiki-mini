import mongoose from 'mongoose';
import Product from './product';
let Schema = mongoose.Schema;

let ReviewSchema = new Schema({
  title: String,
  text: String,
  product: {type: Schema.Types.ObjectId, ref: 'Product'}
});

module.exports = mongoose.model('Review', ReviewSchema);
