var Index = require("../app/controllers/index");
var User = require("../app/controllers/user");
var Movie = require("../app/controllers/movie");
var Comment = require("../app/controllers/comment")
var Category = require("../app/controllers/category")
module.exports = function(app){
	app.use(function(req,res,next){
		var _user = req.session.user;
		app.locals.user = _user
		next()
		
	})

	app.get("/",Index.index);

	app.post("/user/signup",User.signup);
	app.post("/user/signin",User.signin);
	app.get("/logout",User.logout);
	app.get("/signin",User.showSignin);
	app.get("/signup",User.showSignup);
	app.get("/admin/user/list",User.signinRequired,User.adminRequired,User.list);

	app.get("/movie/:id",Movie.detail);
	app.get("/admin/movie/new",User.signinRequired,User.adminRequired,Movie.new);
	app.get("/admin/movie/update/:id",User.signinRequired,User.adminRequired,Movie.update);
	app.post("/admin/movie",User.signinRequired,User.adminRequired,Movie.save); 
	app.get("/admin/movie/list",User.signinRequired,User.adminRequired,Movie.list);
	app.delete("/admin/movie/list",User.signinRequired,User.adminRequired,Movie.del);

	app.post("/user/comment",User.signinRequired,Comment.save);

	app.get("/admin/category/new",User.signinRequired,User.adminRequired,Category.new);
	app.post("/admin/category",User.signinRequired,User.adminRequired,Category.save); 
	app.get("/admin/category/list",User.signinRequired,User.adminRequired,Category.list);

	app.get("/results",Index.search);

	// app.get("/",function(req,res){
	// 	console.log("req.session.user",req.session.user)

	// 	Movie.fetch(function(err,movies){
	// 		if(err){
	// 			console.log(err)
	// 		}
	// 		res.render("index",{
	// 			title:"Home page",
	// 			movies:movies
	// 		});
	// 	})
	// });
/*
	app.get("/movie/:id",function(req,res){
		var id = req.params.id;
		Movie.findById(id,function(err,movie){
			if(err){
				console.log("/movie/:id",err)
			}
			res.render("detail",{
				title:movie.title,
				movie:movie[0]
			});
		})
	});
	app.get("/admin/movie",function(req,res){
		res.render("admin",{
			title:"record",
			movie:{
				doctor:"",
				country:"",
				title:"",
				year:"",
				poster:"",
				language:"",
				flash:"",
				summary:""
			}
		});
	});*/

/*	app.post("/user/signup",function(req,res){
		var _user = req.body.user;
		
		User.find({name:_user.name},function(err,user){
			if(err){
				console.log(err);
			}
			if(user.length){
				res.redirect("/");
			}else{
				var user = new User(_user);
				user.save(function(err,user){
					if(err){
						console.log(err)
					}
					res.redirect("/admin/userlist")
				})
			}
		})
	})
	app.post("/user/signin",function(req,res){
		var _user = req.body.user;
		var name = _user.name;
		var password = _user.password;

		User.findOne({name:_user.name},function(err,user){
			if(err){
				console.log(err);
			}
			if(!user){
				return res.redirect("/");
			}
			user.comparePassword(password,function(err,isMatch){
				if(err){
					console.log(err);
				}
				if(isMatch){
					console.log("passwd ok")
					req.session.user = user;
					return res.redirect("/");
				}else{
					console.log("passwd error")
				}
			})
		})
	})

	app.get("/logout",function(req,res){
		delete req.session.user;
		delete app.locals.user;
		res.redirect("/")
	})
	app.get("/admin/userlist",function(req,res){
		User.fetch(function(err,users){
			if(err){
				console.log(err)
			}
			res.render("userlist",{
				title:"用户列表",
				users:users
			})
		});
	});*/
	// app.get("/admin/update/:id",function(req,res){
	// 	var id = req.params.id;
	// 	if (id) {
	// 		Movie.findById(id,function(err,movie){
	// 			res.render("admin",{
	// 				title:"后台页跟新",
	// 				movie:movie[0]
	// 			})
	// 		})
	// 	}
	// })



/*	app.post("/admin/movie/new",function(req,res){
		var id = req.body.movie._id;
		var movieObj = req.body.movie;
		var _movie;
		if(id !== "undefined") {
			Movie.findById(id,function(err,movie){
				if (err) {
					console.log(err)
				}
				_movie = _.extend(movie[0],movieObj)
				_movie.save(function(err,movie){
					if(err){
						console.log(err)
					}
					res.redirect('/movie/'+movie._id)
				})
			})
		}else{
			_movie = new Movie({
				doctor:movieObj.doctor,
				country:movieObj.country,
				title:movieObj.title,
				year:movieObj.year,
				poster:movieObj.poster,
				language:movieObj.language,
				flash:movieObj.flash,
				summary:movieObj.summary
			})
			_movie.save(function(err,movie){
				if(err){
					console.log(err)
				}
				res.redirect('/movie/'+movie._id)
			})
		}
	})

	app.get("/admin/list",function(req,res){
		Movie.fetch(function(err,movies){
			if(err){
				console.log(err)
			}
			res.render("list",{
				title:"list",
				movies:movies
			})
		});
	});

	app.delete("/admin/list",function(req,res){
		var id = req.query.id;
		if(id){
			Movie.remove({_id:id},function(err,movie){
				if(err){
					console.log(err)
				}
				else{
					res.json({success:1})
				}
			})
		}
	});*/
}