var express = require("express");
var bodyParser = require('body-parser');
var session = require("express-session");
var mongoStore = require("connect-mongo")(session);
var morgan = require("morgan")
var path = require("path");
var mongoose = require("mongoose");

var port = process.env.PORT || 3000;
var app = express();
app.locals.moment = require("moment");

var dbUrl = "mongodb://localhost/imooc";
mongoose.connect(dbUrl);
app.set("views","./app/views/pages");
app.set("view engine","jade");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")))

// 保存登陆状态
app.use(session({
	secret: 'imooc',
	store:new mongoStore({
		url:dbUrl,
		collection:"sessions"
	})
}))

if("development" === app.get("env")){
	app.set("showStackError",true)
	app.use(morgan(":method :url :status"))
	app.locals.pretty = true;
	mongoose.set("debug",true)
}

require("./config/routes.js")(app);
app.listen(port);

console.log("imooc started on port "+port);

