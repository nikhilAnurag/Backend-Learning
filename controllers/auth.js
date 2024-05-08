const User = require('../models/user')

exports.getLogin = (req,res,next)=>{
    const isLoggedIn  = req.session.isLoggedIn;
    console.log(isLoggedIn);
    res.render('auth/login',{
        path:'/login',
        pageTitle:'Login Page',
        isAuthenticated:req.session.isLoggedIn
        
    })
}

exports.postLogin = (req,res,next)=>{
   
   User.findById("661d03109a8498ed3f83c210")
   .then((user) => {
     //req.user = user;
     req.session.user = user;
     req.session.isLoggedIn = true;
     //console.log(req.user);
     req.session.save(err=>{
      res.redirect('/');
     })
   })
   .catch((err) => {
     console.log(err);
   });
}
exports.postLogout = (req,res,next)=>{
    req.session.destroy(() =>{
        res.redirect('/');
    })
}