import mongoose from 'mongoose';
import { Router } from 'express';
import Product from '../model/product';
import Review from '../model/review';
import bodyParser from 'body-parser';

export default({ config, db }) => {
  let api = Router();

  // '/v1/product' - GET all product
  api.get('/', (req, res) => {
    Product.find({}, (err, products) => {
      if (err) {
        res.send(err);
      }
      res.json(products);
    });
  });

  // '/v1/product/categories' - GET all product in specific category
  api.get('/categories/:category', (req, res) => {
    Product.find({category:req.params.category}, (err, products) => {
      if (err) {
        res.send(err);
      }
      res.json(products);
    });
  });


  // '/v1/product/:id' - GET a specific product
  api.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, product) => {
      if (err) {
        res.send(err);
      }
      res.json(product);
    });
  });

  // '/v1/product/add' - POST - add a product
  api.post('/add', (req, res) => {
    let newProducts = new Product();
    newProducts.name = req.body.name;
    newProducts.price = req.body.price;
    newProducts.imageUrl = req.body.imageUrl;
    newProducts.branch = req.body.branch;
    newProducts.category = req.body.category;
    newProducts.description = req.body.description;

    newProducts.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Product saved successfully' });
    });
  });

  // '/v1/product/:id' - DELETE - remove a product
  api.delete('/:id', (req, res) => {
    Product.remove({
      _id: req.params.id
    }, (err, product) => {
      if (err) {
        res.send(err);
      }
      Review.remove({
        product: req.params.id
      }, (err, review) => {
        if (err) {
          res.send(err);
        }
        res.json({message: "Products and Reviews Successfully Removed"});
      });
    });
  });

  // '/v1/product/:id' - PUT - update an existing record
  api.put('/:id', (req, res) => {
    Product.findById(req.params.id, (err, product) => {
      if (err) {
        res.send(err);
      }
      product.name = req.body.name;
      product.price = req.body.price;
      product.imageUrl = req.body.imageUrl;
      product.branch = req.body.branch;
      product.category = req.body.category;
      product.description = req.body.description;
      product.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Product info updated' });
      });
    });
  });

  // add a review by a specific product id
  // '/v1/product/reviews/add/:id'
  api.post('/reviews/add/:id', (req, res) => {
    Product.findById(req.params.id, (err, product) => {
      if (err) {
        res.send(err);
      }
      let newReview = new Review();

      newReview.title = req.body.title;
      newReview.text = req.body.text;
      newReview.product = product._id;
      newReview.save((err, review) => {
        if (err) {
          res.send(err);
        }
        product.reviews.push(newReview);
        product.save(err => {
          if (err) {
            res.send(err);
          }
          res.json({ message: 'Product review saved' });
        });
      });
    });
  });

  // get reviews for a specific product id
  // '/v1/product/reviews/:id'
  api.get('/reviews/:id', (req, res) => {
    Review.find({product: req.params.id}, (err, reviews) => {
      if (err) {
        res.send(err);
      }
      res.json(reviews);
    });
  });

  return api;
}
