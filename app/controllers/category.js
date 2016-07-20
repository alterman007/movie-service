var Category = require("../models/category");

exports.new = function(req,res){
	res.render("category_admin",{
		title:"分类录入页",
		category:{}
	});
};

exports.save = function(req,res){
	var _category = req.body.category;
	var category = new Category(_category);
	category.save(function(err,movie){
		if(err){
			console.log(err)
		}
		res.redirect('/admin/category/list')
	})
}
exports.list = function(req,res){
	Category.fetch(function(err,categories){
		if(err){
			console.log(err)
		}
		res.render("categorylist",{
			title:"分类列表",
			categories:categories
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