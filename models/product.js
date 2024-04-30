// //import the fs module to perform utilities related to file
// //import the path module
// const fs = require('fs');
// const path = require('path');

// //import the Cart class
// const Cart = require('./cart')

// const mongoConnect = require('../util/database');
// const getDb = require('../util/database').getDb;

// const mongodb = require('mongodb');

// //perform the join method to join the maindirectory
// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'products.json'
// );
// const getProductsFromFile = cb => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

// module.exports = class Product {
//   constructor(id,title, imageUrl, description, price,userId) {
//     this._id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if(this._id){
//       dbOp = db.collection('products').updateOne({_id: new mongodb.ObjectId(this._id)},
//       {$set : this})
//     }else{
//       dbOp = db.collection('products').insertOne(this);
//     }
    
//     return dbOp
//       .then(result=>{
//         console.log(result);
//       })
//       .catch(err=>{
//         console.log(err);
//       })
//   }
//   static deleteById(id){
   
//       const db = getDb();
//       db.collection('products').deleteOne({_id:new mongodb.ObjectId(id)});
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db.collection('products').find().toArray()
//     .then(products=>{
//      // console.log(products);
//       return products;
//     })
//     .catch(err=>{
//       console.log(err);
//     });
//   }
//   static findById(prodId){
//     const db = getDb();
//     return db.collection('products').find({_id: new mongodb.ObjectId(prodId)}).next()
//     .then(product=>{
//       console.log(product);
//       return product;
//     })
//     .catch(err=>{
//       console.log(err);
//     })
//   }
// };

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  imageUrl:{
    type:String,
    required:true
  },
  userId :{
    type : Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
});

module.exports = mongoose.model('Product',ProductSchema);
