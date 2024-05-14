//import the Product and cart class to get all the function access related to add or delete item 
const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/orders');

// render to the shop/product-list with all product list using the callback function to fetch all product list 
exports.getProducts = (req, res, next) => {
   Product.find()
  .then(products=> {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
      isAuthenticated : req.session.isLoggedIn
    });
  })
  .catch(err=>{
    res.render('shop/product-list', {
      prods: [],
      pageTitle: 'All Products',
      path: '/products',
      isAuthenticated : req.session.isLoggedIn
    });
  })
  //console.log("The products are: ",products);
    
  
};

// render to specific product with detail and the request handled by the req.params.productId
// use the callback function to handle the product using findById and render to the /shop/product-detail
exports.getProduct = (req,res,next) =>{
  const prodId = req.params.productId;
  Product.findById(prodId)
  .then(product=>{
    
      res.render('shop/product-detail',{
        product:product,
        path:'/product-detail',
        pageTitle:product.title,
        isAuthenticated : req.session.isLoggedIn
      })
    
  })
  .catch(err=>{
    console.log(err);
  })
}

//render to show all product with callback function fetchAll
exports.getIndex = (req, res, next) => {
  Product.find().then(products => {
    //console.log(products);
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      isAuthenticated : req.session.isLoggedIn
    });
  }).catch(err=>{
    console.log(err);
  });
  
};
//render to shop/cart with the list of the product and there quantity
// use the callback function getCart to read from cart file to get all cart value
// use the callback fuction fetchAll to read from product to match there id with the cart item id 
// the matched product pushed to the array with product quantity and that rendered to template engine
exports.getCart = (req, res, next) => {
 req.user
    .populate('cart.items.productId')
    .then(user=>{
      const products = user.cart.items;
      console.log(products);
      res.render('shop/cart',{
        path:'/cart',
        pageTitle:'Your Cart',
        products:products,
        isAuthenticated : req.session.isLoggedIn
      });
    })
    .catch(err=>{
      console.log(err);
    })
};

//handle the request to post cart to add the item in the cart and redirect to the /cart page
exports.postCart = (req,res,next) =>{
  let prodId = req.body.productId;
  Product.findById(prodId)
  .then(product=>{
    return req.user.addToCart(product)
  })
  res.redirect('/cart');
}

// handle the request to delete the product from cart 
exports.postCartDeleteProduct = (req,res,next) =>{
  let prodId = req.body.productId;
  //console.log("Prod Id",prodId);
  req.user.removeFromCart(prodId)
  .then(result=>{
    res.redirect('/cart');
  })
 // res.redirect('/cart')
}

exports.postOrder = (req,res,next) =>{

  req.user
    .populate('cart.items.productId')
    .then(user=>{
      const products = user.cart.items.map(i=>{
     //   console.log("product ",i);
        return {quantity: i.quantity,product:{...i.productId._doc}}
      })
      let order = new Order({
        user:{
          name : req.user.name,
          userId : req.user._id
        },
        products:products
      })
      //console.log("Order saved")
     return order.save();
    })
    .then(result=>{
      return req.user.clearCart();
    })
    .then(result=>{
      res.redirect('/orders');
    })
    .catch(err=>{
      console.log(err);
    })
}

exports.getOrders = (req, res, next) => {
  Order.find({'user.userId':req.user._id})
  .then(order=>{
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders:order,
      isAuthenticated : req.session.isLoggedIn
    });
  })
  
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
    isAuthenticated : req.session.isLoggedIn
  });
};

