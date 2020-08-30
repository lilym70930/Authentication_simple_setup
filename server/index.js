const express = require('express');
const app = express();
const routeHelper = require('./routeHelper');
const bodyParser = require('body-parser');

app.use((req, res, next) => {
    console.log('middleware for cors')
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use((req, res, next) => {
    next();
});

app.post("/login",(req,res) =>{
     return routeHelper.Login(req.body, res);
});

app.post("/register",(req,res) =>{
    return routeHelper.Register(req, res);
})

const PORT = process.env.PORT || 5000;

 app.listen(PORT, () =>{
    console.log(`app is listening on port : ${PORT}`);
})
