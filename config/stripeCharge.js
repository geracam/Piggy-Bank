// stripeCharge.js: Gerardo Camarena Gomez
// Holds all the stuff that is needed for stripe

var Customer   = require('../models/customer.js');
var stripeKeys = require('../config/stripeKeys.js');
var stripe     = require('stripe')("sk_test_he451UeFrF8Q6Qro5qc7tkh4");

module.exports = function(app) {
	app.get('/stripe', function(req,res){
		res.render("stripePage/stripePage.html");
    });
    app.post('/stripe', function(req,res) {
    	// =====STRIPETOKEN======
      	var transaction = req.body;
      	var stripeToken = transaction.stripeToken;
      	var newCustomer = new Customer({token: stripeToken });
      	newCustomer.save(function(err) {
        	if (err) {
          		console.log(err);
        	} else {
          		console.log("Success!");
        }});
      	// ====CREATE CHARGE======
      	var charge =
      	{
        amount    : 10*100, 
        currency  : 'USD',
        card      : stripeToken
      	};
      	stripe.charges.create(charge, function(err, charge) {
			if(err)
            	console.log(err);
          	else
            {
              	res.json(charge);
              	console.log('Successful charge sent to Stripe!');
            };
        });
        // ====PROFILE PAGE REDIRECT=====
      	res.render("profilePage/profilePage.html");
    });
};