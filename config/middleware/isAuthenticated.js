// middleware to restrict routes a user isn't allowed to use if not logged in

module.exports = function(req, res, next) {
    // If the user is logged in, continue with the request to the restricted route
    if (req.isAuthenticated()) {
      // console.log('***REQ***', req.user.id) useful for testing 
      // console.log('res', res)
      return next();
    }
    // If the user isn't' logged in, redirect them to the login page
    return res.redirect("/");
  };