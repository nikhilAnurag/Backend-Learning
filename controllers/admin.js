// import the product class to get the all functionalities involving regarding adding,deleting and changing 
// values of the product the admin
const { ObjectId } = require('mongodb');
const Product = require('../models/product');


// render to template file to edit-product with editing false so that there it will check and change the content
// with add product
exports.getAddProduct = (req, res, next) => {
  //render to admin/edit-product with the specified template engine
  // set editing false and give pageTitle and specify the path
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
    
  });
};

// handle the post request functionalites to add new product to the in the list
// get access to the title, imageUrl, price, description, product as adding the new product
// set the id as null in the constructor 
//after saving the product redirect to the all list product
exports.postAddProduct = (req, res, next) => {
  //console.log("Req : ",req);
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product({title:title,price:price,imageUrl,description:description,userId:req.user._id});
  product.save().then(result =>{
    console.log('Product Added');
    //console.log(result);
    res.redirect('/admin/products')
  }).catch(err=>{
    console.log(err);
  })
  
};


// functionalities to edit the product 
// check the query if !editmode then redirect;
// get the productId from req.params and check using req.query
// in case of product not found the redirect  else redirect to the edit page 
exports.getEditProduct = (req,res,next) =>{
  const editMode  = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
  .then(product=>{
    res.render('admin/edit-product',{
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing : editMode,
      product : product
    })
  })
  .catch(err=>{
    console.log(err);
  })
    
  
  
}

// handle the post request to edit the product get the all the values and update the product
// redirect to /admin/products to get list of all product
exports.postEditProduct = (req,res,next) =>{
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedUrlImage = req.body.imageUrl;
  const updatedDescription = req.body.description;
 Product.findById(prodId)
 .then(product=>{
  product.title = updatedTitle;
  product.description = updatedDescription;
  product.price = updatedPrice;
  product.imageUrl = updatedUrlImage;
  product.save();
 }).catch(err=>{
  console.log(err);
 })
  res.redirect('/admin/products');
}

//fetch the product using the callback function and render to admin/product
exports.getProducts = (req, res, next) => {
  Product.find()
  // .select('title price - _id')
  // .populate('userId','name')
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err=>{
    console.log(err);
  });
};

// functionalities to delete the product with id 
exports.postDeleteProduct = (req,res,next) => {
  const prodId = req.body.productId;
  
  Product.findById(prodId).then(product=>{
    console.log(product);
  })
  Product.findByIdAndDelete(prodId).then(product=>{
    //res.redirect('/admin/products')
  }).catch(err=>{
    console.log(err);
  })
  res.redirect('/admin/products');
}
