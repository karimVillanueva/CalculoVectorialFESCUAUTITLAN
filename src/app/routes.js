module.exports = (app, passport) => {

	// home routes
	app.get('/', (req, res) => {
		res.render('home');
	});

//pdfLector routes
 app.get('/pdfLector', (req, res) => {
	 res.render('pdfLector');
 });

	// index routes
	app.get('/index', (req, res) => {
		res.render('index');
	});

//repvid routes 
app.get('/repvid', (req, res) => {
	res.render('repvid');
});


// index routes

	//login view
	app.get('/login', (req, res) => {
		res.render('login.ejs', {
			message: req.flash('loginMessage')
		});
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	// signup view
	app.get('/signup', (req, res) => {
		res.render('signup', {
			message: req.flash('signupMessage')
		});
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true // allow flash messages
	}));

	//profile view
	app.get('/profile', isLoggedIn, (req, res) => {
		res.render('profile', {
			user: req.user
		});
	});

	// logout
	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});
};

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}
