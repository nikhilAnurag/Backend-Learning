exports.getLogin = (req,res,next)=>{
    res.render('auth/login',{
        path:'/login',
        pageTitle:'Login Page',
        
    })
}

exports.postLogin = (req,res,next)=>{
    req.setHeader('Set-cookie','loggedIn=true');
    res.redirect('/');
}