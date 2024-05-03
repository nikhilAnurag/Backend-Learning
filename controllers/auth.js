exports.getLogin = (req,res,next)=>{
    const isLoggedIn  = req.session.isLoggedIn;
    console.log(isLoggedIn);
    res.render('auth/login',{
        path:'/login',
        pageTitle:'Login Page',
        
    })
}

exports.postLogin = (req,res,next)=>{
   req.session.isLoggedIn = true;

    res.redirect('/');
}