var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//------------------------------------------------
//新添加的业务
//------------------------------------------------
router.route('/login').get(function(req,res){
	res.render('login',{title:'用户登录'});
}).post(function(req,res){
	var user={
		username:'admin',
		password:'123456'
	};
	if (req.body.username === user.username && req.body.password === user.password) {
		req.session.user = user;
		res.redirect('/home');
	}
	res.redirect('/login');
});

router.get('/logout',function(req,res){
	req.session.user = null;
	res.redirect('/');
});

router.get('home',function(req,res){
	var user={
		username:'admin',
		password:'123456'
	};
	res.render('/home',{title:'首页',user:user});
});

module.exports = router;
