var User = require("../models/user");
// 
exports.showSignin = function(req,res){
	res.render("signin",{
		title:"登录页面"
	})
}

exports.showSignup = function(req,res){
	res.render("signup",{
		title:"注册页面"
	})
}




exports.signup = function(req,res){
	var _user = req.body.user;
	
	User.find({name:_user.name},function(err,user){
		if(err){
			console.log(err);
		}
		console.log(user)
		if(user.length){
			res.redirect("/signin");
		}else{
			var user = new User(_user);
			user.save(function(err,user){
				if(err){
					return console.log(err)
				}
				req.session.user = user;
				res.redirect("/")
			})
		}
	})
};
exports.signin = function(req,res){
	var _user = req.body.user;
	var name = _user.name;
	var password = _user.password;

	User.findOne({name:_user.name},function(err,user){
		if(err){
			console.log(err);
		}
		if(!user){
			return res.redirect("/signup");
		}
		user.comparePassword(password,function(err,isMatch){
			if(err){
				console.log(err);
			}
			if(isMatch){
				// console.log("passwd ok")
				req.session.user = user;
				return res.redirect("/");
			}else{
				// console.log("passwd error")
				return res.redirect("/signin");
			}
		})
	})
};

exports.logout = function(req,res){
	delete req.session.user;
	// delete app.locals.user;
	res.redirect("/")
};

exports.list = function(req,res){
	User.fetch(function(err,users){
		if(err){
			console.log(err)
		}
		res.render("userlist",{
			title:"用户列表",
			users:users
		})
	});		

};

// midware for user
exports.signinRequired = function(req,res,next){
	var user = req.session.user;
	if(!user){
		return res.redirect("/signin");
	}
	next()	
};
exports.adminRequired = function(req,res,next){
	var user = req.session.user;
	if(user.role <= 10){
		return res.redirect("/signin");
	}
	next()	
};