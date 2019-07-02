// @login & register
const express = require('express');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys')
const passport = require('passport')
const router = express.Router();
const User = require('../../modules/User')
// $route GET api/users/test
// @desc Return json data required
// @access public
router.get('/test', (req, res) => {
     res.json({ msg: "login works" });
});

// $route POST api/users/register
// @desc Return json data required
// @access public
router.post('/register', (req, res) => {
     // console.log(req.body);
     // Query whether  the database  contains email 
     User.findOne({ email: req.body.email })
          .then((user) => {

               const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
               //returns //www.gravatar.com/avatar/93e9084aa289b7f1f5e4ab6716a56c3b?s=200&r=pg&d=404
               if (user)
                    return res.status(400).json({ email: "邮箱已被注册！" });
               else {

                    const newUser = new User({
                         name: req.body.name,
                         avatar,
                         email: req.body.email,
                         password: req.body.password,
                    })
                    bcrypt.genSalt(10, function (err, salt) {
                         bcrypt.hash(newUser.password, salt, (err, hash) => {
                              if (err) throw err;
                              newUser.password = hash
                              newUser.save()
                                   .then(user => res.json(user))
                                   .catch(err => console.log(err))
                         });
                    });
               }
          })
});

// $route GET api/users/login
// @desc Return token jwt passport
// @access public
router.post('/login', (req, res) => {
     const email = req.body.email;
     const password = req.body.password;
     User.findOne({ email })
          .then(user => {
               if (!user) {
                    return res.status(404).json({ email: "用户不存在" });
               }
               // Exp password
               bcrypt.compare(password, user.password)
                    .then(isMatch => {
                         if (isMatch) {
                              const rule = { id: user.id, name: user.name }
                              jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                                   if (err) throw err
                                   res.json({
                                        success: true,
                                        token: "Bearer" + token
                                   });
                              })
                              // jwt.sign("规则","加密名字","过期时间","回调函数")

                              // res.json({msg:"success"});
                         } else {
                              return res.status(400).json({ password: "密码不正确" });
                         }
                    })

          })

});

// $route GET api/users/login
// @desc Return token jwt passport
// @access Private
router.get('/current', passport.authenticate("jwt", { session: false }), (req, res) => {
     res.json({
          "id": req.user._id,
          "name": req.user.name,
          "email": req.user.email
     });
})
module.exports = router;