// @login & register npm node.js
const express = require("express");//表达
const router = express.Router();//路由
const passport = require("passport");

const Profile = require('../../modeis/Profile');


// $route get api/Profiles/test
// @desc 返回的请求json
// @access public
router.get("/test",(req,res) => {
    // 打印返回一句话
    res.json({msg:"profile works"})
})

// $route post api/Profiles/add
// @desc 返创建信息接口
// @access Privte   
router.post("/add",passport.authenticate("jwt",{session:false}),(req,res) => {
    const profileFields = {};

    if(req.body.type) profileFields.type = req.body.type;
    if(req.body.describe) profileFields.describe = req.body.describe;
    if(req.body.income) profileFields.income = req.body.income;
    if(req.body.expend) profileFields.expend = req.body.expend;
    if(req.body.cash) profileFields.cash = req.body.cash;
    if(req.body.remark) profileFields.remark = req.body.remark;

    new Profile(profileFields).save().then(propfile => {
        res.json(propfile);
    })
})
// $route get api/profiles
// @desc 获取所有的信息
// @access Privte
router.get("/",passport.authenticate("jwt",{session:false}),(req,res) =>{
    Profile.find().then(profile =>{
        if(!profile) {
            return res.status(404).json('没有内容');

        }
            res.json(profile);
    })
    .catch(err => res.status(404).json(err));
})
// $route get api/Profile/profiles:id
// @desc 获取单个的信息
// @access Privte
router.get("/:id",passport.authenticate("jwt",{session:false}),(req,res) =>{
    Profile.findOne( {_id: req.params.id} ).then(profile =>{
        if(!profile) {
            return res.status(404).json('没有内容');

        }
            res.json(profile);
    })
    .catch(err => res.status(404).json(err));
})
// $route post api/profiles/edit
// @desc 编辑信息接口
// @access Privte   
router.post("/edit/:id",passport.authenticate("jwt",{session:false}),(req,res) => {
    const profileFields = {};

    if(req.body.type) profileFields.type = req.body.type;
    if(req.body.describe) profileFields.describe = req.body.describe;
    if(req.body.income) profileFields.income = req.body.income;
    if(req.body.expend) profileFields.expend = req.body.expend;
    if(req.body.cash) profileFields.cash = req.body.cash;
    if(req.body.remark) profileFields.remark = req.body.remark;

    Profile.findOneAndUpdate(
        {_id:req.params.id},
        {$set:profileFields},
        {new:true}
    ).then(profile => res.json(profile))
    }
);
// $route post api/profiles/delete/:id
// @desc 删除接口
// @access Privte   
router.delete("/delete/:id",passport.authenticate("jwt",{session:false}),(req,res) =>{
    Profile.findOneAndDelete({_id:req.params.id}).then(profile => {
        profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json('删除失败！'));
})
module.exports = router;//报错

