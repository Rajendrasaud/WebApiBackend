require('./database/db')

const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const path = require('path')
const multer = require('multer')

const User = require('./model/user')
const Product = require('./model/product')
const Cart = require('./model/cart')
const auth = require('./middleware/auth')

app.set('views', 'views');
app.set('view engine', 'html')
app.use(express.static('views'));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/assets/images", express.static("assets/images"));
app.use("/assets/images/profile", express.static("assets/images/profile"));
app.use("/assets/images/products", express.static("assets/images/products"));



// -------------------------------USER--------------------------------------


/////////////////////////INSERT////////////////////////////
var profile;

app.post("/user/register", (req, res) => {
    if (profile == "") {
        profile = "user_profile.jpg";
    }
    var data = new User({
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_password: req.body.user_password,
        user_type: 'user',
        user_image: profile,

    });

    console.log(data);

    data.save().then(function () {
        res.send(true)
    }).catch(function () {
        res.send(false);
    })
});


/////////////////////////UPDATE////////////////////////////

app.put("/user/update", (req, res) => {
    var ut = 'admin'
    User.findOneAndUpdate({ user_type: ut }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.send(true);
        } else {
            res.send(false);
        }
    });

});
app.put("/user/updateuser", (req, res) => {
    var id = req.body.id;
    User.findOneAndUpdate({ _id: id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.send(true);
        } else {
            res.send(false);
        }
    });

});



app.listen(8080);