'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _product = require('../model/product');

var _product2 = _interopRequireDefault(_product);

var _review = require('../model/review');

var _review2 = _interopRequireDefault(_review);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // '/v1/product' - GET all product
  api.get('/', function (req, res) {
    _product2.default.find({}, function (err, products) {
      if (err) {
        res.send(err);
      }
      res.json(products);
    });
  });

  // '/v1/product/categories' - GET all product in specific category
  api.get('/categories/:category', function (req, res) {
    _product2.default.find({ category: req.params.category }, function (err, products) {
      if (err) {
        res.send(err);
      }
      res.json(products);
    });
  });

  // '/v1/product/:id' - GET a specific product
  api.get('/:id', function (req, res) {
    _product2.default.findById(req.params.id, function (err, product) {
      if (err) {
        res.send(err);
      }
      res.json(product);
    });
  });

  // '/v1/product/add' - POST - add a product
  api.post('/add', function (req, res) {
    var newProducts = new _product2.default();
    newProducts.name = req.body.name;
    newProducts.price = req.body.price;
    newProducts.imageUrl = req.body.imageUrl;
    newProducts.branch = req.body.branch;
    newProducts.category = req.body.category;
    newProducts.description = req.body.description;

    newProducts.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Product saved successfully' });
    });
  });

  // '/v1/product/:id' - DELETE - remove a product
  api.delete('/:id', function (req, res) {
    _product2.default.remove({
      _id: req.params.id
    }, function (err, product) {
      if (err) {
        res.send(err);
      }
      _review2.default.remove({
        product: req.params.id
      }, function (err, review) {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Products and Reviews Successfully Removed" });
      });
    });
  });

  // '/v1/product/:id' - PUT - update an existing record
  api.put('/:id', function (req, res) {
    _product2.default.findById(req.params.id, function (err, product) {
      if (err) {
        res.send(err);
      }
      product.name = req.body.name;
      product.price = req.body.price;
      product.imageUrl = req.body.imageUrl;
      product.branch = req.body.branch;
      product.category = req.body.category;
      product.description = req.body.description;
      product.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Product info updated' });
      });
    });
  });

  // add a review by a specific product id
  // '/v1/product/reviews/add/:id'
  api.post('/reviews/add/:id', function (req, res) {
    _product2.default.findById(req.params.id, function (err, product) {
      if (err) {
        res.send(err);
      }
      var newReview = new _review2.default();

      newReview.title = req.body.title;
      newReview.text = req.body.text;
      newReview.product = product._id;
      newReview.save(function (err, review) {
        if (err) {
          res.send(err);
        }
        product.reviews.push(newReview);
        product.save(function (err) {
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
  api.get('/reviews/:id', function (req, res) {
    _review2.default.find({ product: req.params.id }, function (err, reviews) {
      if (err) {
        res.send(err);
      }
      res.json(reviews);
    });
  });

  return api;
};
//# sourceMappingURL=product.js.map