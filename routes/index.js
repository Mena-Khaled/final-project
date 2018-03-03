var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://menakhaled:7711694138onepiece@ds127065.mlab.com:27065/codelab').then(function () {
    console.log('Connected')

}).catch(function (error) {
    console.log(error.message);
});
var Profile = mongoose.model('Profile',{
ppic : String,
name : String,
country : String,
biography : String,
camera : String,
category : String,
image1:String,
image2:String,
image3:String,
image4:String,
image5:String,
image6:String
});
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});
router.get('/profiles', function(req, res) {
    res.render('new');
});
router.get('/api/profiles', function (req, res) {
    Profile.find(function (error, profiles) {
        res.json(profiles);
    })
});
router.post('/api/profiles', function (req, res) {
    var object = req.param('profile');
    var newProfile = new Profile(object);
    newProfile.save().then(function () {
        res.json({
            isSuccess: true,
            message: "Profile Added!"
        });
    }).catch(function (error) {
        res.json({
            isSuccess: false,
            message: error.message
        });
    })
});
router.delete('/api/profiles',function(req,res){
    var id = req.param('id');
    Profile.findByIdAndRemove(id).then(function(response){
        res.json({
            isSuccess: true,
            message: "Profile Deleted!"
        });
    }).catch(function (error) {
        res.json({
            isSuccess: false,
            message: error.message
            });
        });
    });
router.get('/yourprofile', function(req, res, next) {
    res.render('profile');
});
router.put('/api/profiles',function (req,res) {
    var editing = req.param('p');
    Profile.findByIdAndUpdate(editing._id,editing).then(function () {
        res.json({
            isSuccess: true,
            message: "Profile Updated!"
        });
    }).catch(function (error) {
        res.json({
            isSuccess: false,
            message: error.message
        });
    });
});
module.exports = router;
