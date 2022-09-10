'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const router = express.Router();
const Buffer = require('buffer/').Buffer
const DB_NAME = 'WebDuy';
const { MongoClient } = require('mongodb');
require('dotenv').config()
const url = process.env.REACT_APP_DB_URL;
const client = new MongoClient(url);
const dbName = 'WebDuy';

client.connect();
var db = client.db(dbName);
var collection = db.collection('UserData');
 

router.get('/', (req, res)=>{
    res.json({
        "status": "You are alive"
    })
})

router.post('/login',async (req, res) => {
    var status = true
    var message = String
    var user = String
    var authen = false
    try{
        var phone = await req.body.phone.trim()
        var passwd = await req.body.passwd.trim()
    }
    catch (e){
        var phone = ""
        var passwd = ""
    }
    try{ 
        if (phone === "" && passwd === ""){
            var data = Buffer.from(req.cookies.login, 'base64').toString('ascii')
            var phone = (data.split('&')[0])
            var passwd = (data.split('&')[1])
            var result = await collection.count({ "phone": phone, "passwd": passwd })
            if (result === 1 && status ){
                status = true
                user = phone
                authen = true
                message = "Đăng nhập bằng Cookie thành công"
            }
            else if (result === 0){
                message = "Đăng nhập bằng Cookie thất bại"
                status = false
            }
        }
        else{
            var result = await collection.count({ "phone": phone, "passwd": passwd })
            if (result === 1 && status ){
                status = true
                user = phone
                authen = true
                message = "Đăng nhập thành công"
            }
            else if (result === 0){
                message = "Đăng nhập thất bại"
                status = false
            }
        }
        
    }
    catch (e) {
        console.log(e)
        status = false
    }
    res.cookie('login',Buffer.from(phone +'&'+ passwd).toString('base64') , { expires: new Date(Date.now() + 900000)} )
    res.json({
        "status_code": 200, "status": status, "message": message, "authen": authen
    })
});

router.post('/register',async (req, res) => {
    var status = true
    var message = String
    var etype = String
    try{
        var phone = await req.body.phone.trim()
        var fullname = await req.body.fullname.trim()
        var passwd = await req.body.passwd.trim()
    }
    catch(e){
        var phone = ""
        var passwd = ""
        var fullname = ""

    }
    try{
        
        if (fullname.length <=2){
            status = false,
            message = "Họ và tên không đúng"
            etype = "fullname"
        }
        if (phone.length !== 10 ){
            status = false,
            message = "Số điện thoại phải là 10 chữ số"
            etype = "phone"
        }
        var result = await collection.count({ "phone": phone })
        if (result ===0 && status ){
            var insertResult = await collection.insertOne({ "phone": phone , "fullname": fullname ,  "passwd": passwd });
            status = true
            message = "Đăng kí thành công"
            etype = ""
            res.cookie('login',Buffer.from(phone +'&'+ passwd).toString('base64') , { expires: new Date(Date.now() + 900000)} )
        }
        else if (result > 0){
            message = "Tài khoản đã tồn tại"
            status = false
            etype = "phone"
        }
    }
    catch (e) {
        status = false
    }
    
    res.json({
        "status_code": 200, "status": status, "message": message, "etype": etype
    })
});

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/.netlify/functions/api', router);  

module.exports = app;
module.exports.handler = serverless(app);