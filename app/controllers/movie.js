var Movie = require("../models/movie");
var Comment = require("../models/comment");
var Category = require("../models/category");
var _ = require("underscore");

exports.detail = function(req,res){
	var id = req.params.id;
	Movie.findById(id,function(err,movie){
		Comment
		.find({movie:id})
		.populate("from","name")
		.populate("reply.from reply.to","name")
		.exec(function(err,comments){
			res.render("detail",{
				title:movie.title,
				movie:movie[0],
				comments:comments
			});
		})
	})
}
exports.new = function(req,res){
	Category.find({},function(err,categories){
		if(err){
			console.log(err)
		}
		res.render("admin",{
			title:"电影录入",
			categories:categories,
			movie:{}
		});
	})
};
exports.update = function(req,res){
	var id = req.params.id;
	if (id) {
		Movie.findById(id,function(err,movie){
			Category.find({},function(err,categories){
				res.render("admin",{
					title:"后台页跟新",
					categories:categories,
					movie:movie[0]
				})
			})
		})
	}
}


exports.save = function(req,res){
	var id = req.body.movie._id;
	var movieObj = req.body.movie;
	var _movie;
	if(id) {
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
		_movie = new Movie(movieObj)
		var categoryId = movieObj.category;
		var categoryName = movieObj.categoryName;
		console.log(movieObj)
		_movie.save(function(err,movie){
			if(err){
				console.log("69",err)
			}
			if(categoryId){
				Category.findById(categoryId,function(err,category){
					console.log(category)
					category[0].movies.push(movie._id);

					category[0].save(function(err,category){
						res.redirect('/movie/' + movie._id)
					})
				})
			}
			else if(categoryName){
				var category = new Category({
					name:categoryName,
					movies:[movie._id]
				})
				category.save(function(err,category){
					movie.category = category._id
					movie.save(function(err,movie){
						console.log(movie._id)
						res.redirect("/movie/" + movie._id)
					})
				})
			}
		})
	}
}
exports.list = function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render("list",{
			title:"list",
			movies:movies
		})
	});
};

exports.del = function(req,res){
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
};