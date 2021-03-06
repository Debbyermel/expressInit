//1.- importacion de la libreria
const express = require("express");
const bodyParser = require('body-parser');

//2.- instancia de express
const app = express();
//body parser
app.use(bodyParser.urlencoded({ extended: true }));

const users = [
    {
        name:"bliss",
        password:"bliss",
        age:"20",
        favoriteFood:"Barbacoa"
    }
];

// indicamos los estaticos
app.use(express.static("public"));

//indicamos el motor de "views"
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//a partir de qui escribimos nuestras rutas
app.get("/dulces", function(req,res,next){
    res.send("Traigan tributos!");
    next();
});

app.get("/", function(req,res,next){
    res.render("index", {bliss:false});
    next();
});

app.get("/login", function(req,res,next){
    const user = req.query.username;
    res.render("login_form", {error:user});
});

app.post("/login", function(req, res, next){

    users.forEach(user=>{
        if(user.name === req.body.username && user.password === req.body.password){
            res.send(`
                Hola ${req.body.username} Tenemos ${user.favoriteFood} para ti
            `)
        }else{
            res.render("login_form", {error:"incorrect password"});
        }
    })




});


app.use(function(){
    console.log("BlisS needs candies");
});





//esta cochinada escucha!
app.listen(3000, function(err){
    if(err) console.log(err);
    console.log("Tu servidor está funcionando en el puerto 3000");
});

