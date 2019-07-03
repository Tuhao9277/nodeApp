const express = require('express');
const router = express.Router();
const passport = require('passport')
const Profile = require('../../modules/Profile')

// @route GET api/profile/test
// @desc Return json data required
// @access public
router.get('/test', (req, res) => {
    res.json({ value: "666" });
});
// @route POST api/profile/add
// @desc Create profile interface
// @access public
router.post('/add', passport.authenticate("jwt", { session: false }), (req, res) => {
    const profileFields = {};
    if (req.body.type) {
        profileFields.type = req.body.type
    }
    if (req.body.describe) {
        profileFields.describe = req.body.describe
    }
    if (req.body.income) {
        profileFields.income = req.body.income
    }
    if (req.body.expend) {
        profileFields.expend = req.body.expend
    }
    if (req.body.cash) {
        profileFields.cash = req.body.cash
    }
    if (req.body.remark) {
        profileFields.remark = req.body.remark
    }
    new Profile(profileFields).save()
        .then(profile => {
            res.json(profile);
        })

});
// @route Get api/profile/
// @desc Get all profiles 
// @access public
router.get('/list',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.find()
            .then(profile => {
                if (!profile) {
                    return res.status(404).json('没有任何内容');
                }
                res.json(profile);
            })
            .catch(err => res.status(404).json(err))
    });
// @route Get api/profile/id
// @desc Get single profiles 
// @access public
router.get('/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ _id: req.params.id })
            .then(profile => {
                if (!profile) {
                    return res.status(404).json('没有任何内容');
                }
                res.json(profile);
            })
            .catch(err => res.status(404).json(err))
    });

// @route POST api/users/edit
// @desc POST edit profiles 
// @access public
router.post('/edit/:id',
passport.authenticate('jwt', { session: false }),
(req, res) => {
    const profileFields = {};
    if (req.body.type) {
        profileFields.type = req.body.type
    }
    if (req.body.describe) {
        profileFields.describe = req.body.describe
    }
    if (req.body.income) {
        profileFields.income = req.body.income
    }
    if (req.body.expend) {
        profileFields.expend = req.body.expend
    }
    if (req.body.cash) {
        profileFields.cash = req.body.cash
    }
    if (req.body.remark) {
        profileFields.remark = req.body.remark
    }
    Profile.findByIdAndUpdate(
       { _id:req.params.id},
       { $set:profileFields},
       { new:true}).then(profile=> res.json(profile))
});
// @route Delete api/profile/delete
// @desc Delete single profiles 
// @access public
router.delete('/delete/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOneAndRemove({ _id: req.params.id })
            .then(profile => {
                profile.save().then( res.json(profile))
            })
            .catch(() => res.status(404).json("删除失败"))
    });

module.exports = router