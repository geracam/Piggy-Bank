// routes.js: Gerardo Camarena Gomez
// Tells our application the flow control we want

module.exports = function(app, passport) {
    // ======HOME PAGE===========
    app.get('/', function(req, res) {
        res.render('index.html'); 
    });
    // ======LOGIN PAGE==========
    app.get('/login', function(req, res) {
        res.render('loginPage/loginPage.html', { message: req.flash('loginMessage') }); 
    });
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', 
        failureRedirect : '/login', 
        failureFlash : true 
    }));
    // ======SIGNUP PAGE=========
    app.get('/signup', function(req, res) {
        res.render('loginPage/signInPage.html', { message: req.flash('signupMessage') });
    });
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', 
        failureRedirect : '/signup', 
        failureFlash : true 
    }));
    //  =====PROFILE PAGE========
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profilePage/profilePage.html', {
            user : req.user // get the user out of session and pass to template
        });
    });
    // ======LOGOUT PAGE=====
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('index.html');
    });
};
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}