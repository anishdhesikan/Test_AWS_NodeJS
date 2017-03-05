// app/models/bear.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    product_id: Number,
    name: String,
    cost: String,
    billboard_id: Number
});

module.exports = mongoose.model('Product', ProductSchema);