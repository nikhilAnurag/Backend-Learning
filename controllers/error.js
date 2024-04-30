// The invalid url will be rendered with status of 404 which will classify as url not found

exports.get404 = (req, res, next) => {
  console.log("Request ", req.user);
  res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404' });
};
