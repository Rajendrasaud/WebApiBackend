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



/////////////////////////DELETE////////////////////////////

app.delete("/user/delete", (req, res) => {
    // console.log(req.body)
    User.findByIdAndRemove({ _id: req.body._id }, function(err, doc) {
        if (err) {
            console.log("error")
            res.send(false)
        } else {
            console.log("success")
            res.send(true)
        }

    })
})

/////////////////////////SELECT////////////////////////////

app.get("/user/get/:id", (req, res) => {
    const uid = req.params.id;
    console.log("userid: "+uid)
    User.findById({
        _id: uid
    }).then(function(usr) {
        res.send(usr);
    }).catch(function(e) {
        res.send(e)
    })
});



app.get("/user/getall", (req, res) => {
    var sortById = { _id: -1 }

    User.find().sort(sortById).then(function(userdata) {
        console.log("Getting user data")
        res.send(userdata);
    }).catch(function(e) {
        res.send(e)
    })
});




/////////////////////////AUTH////////////////////////////

app.get('/checking/auth', auth, function(req, res) {
    res.send(req.user)
})




/////////////////////////LOGIN////////////////////////////

app.post("/user/login", async(req, res) => {
    console.log('In login')
        const user = await User.checkCrediantialsDb(req.body.user_email, req.body.user_password);
        const token = await user.generateAuthToken();
        res.send({
            'token': token,
            'id': user._id,
            'user_name': user.user_name,
            'user_type': user.user_type,
            'user_email': user.user_email,
            'user_password': user.user_password,
            'user_image': user.user_image
        });
    });

    /////////////////////////LOGOUT////////////////////////////

app.post('/logout', auth, async(req, res) => {
    try {
        console.log("Logout clicked")
        req.user.tokens = []
        await req.user.save()
        res.send(true)
    } catch (e) {
        res.status(500).send()
    }
})

// +++++++++++++++++++++++++++++++++++++++END++++++++++++++++++++++++++++++++++++++++++++


// -------------------------------PRODUCT--------------------------------------


/////////////////////////INSERT////////////////////////////
var product_image;

app.post("/product/register", (req, res) => {
    var data = new Product({
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_price: req.body.product_price,
        product_weight: req.body.product_weight,
        product_category: req.body.product_category,
        product_brand: req.body.product_brand,
        product_image: product_image,
      
    });

    console.log(data);

    data.save().then(function() {
        res.send(true)
    }).catch(function() {
        res.send(false);
    })
});

    



app.listen(8080);