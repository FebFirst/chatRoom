'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var session = require('express-session');

global.dbhandle = require('../database/dbhandle');
global.db = mongoose.connect("mongodb://localhost:27017/test");
/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'ChatRoom' });
});

/*Handle login and register*/
router.get('/login', function (req, res) {
    res.render("login");
});
router.get('/register', function (req, res) {
    res.render("register");
});

router.post('/login', function (req, res) {
    var User = global.dbhandle.getModel('user');  
    var username = req.body.username;
    User.findOne({name:username},function(err,result){
        if(err){
            res.send(500);
            console.log(err);
        }else if(!result){
            req.session.error = '用户名不存在';                          
            res.redirect(404,"/login");
        }else{ 
					if(req.body.password != result.pwd){     
							req.session.error = "密码错误";
							res.redirect(404,"/login");
					}else{                                     
							req.session.user = result;
							res.status(200);
							res.redirect('/');
					}
			}
    });

});
module.exports = router;
