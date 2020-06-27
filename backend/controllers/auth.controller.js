const User = require('../models/auth.model');
const expressJwt = require('express-jwt');
const _ = require('lodash');
const { OAuth2Client } = require('google-auth-library');
const fetch = require('node-fetch');

const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
//Custom error handler to get useful error from database errors
const { errorHandler } = require('../helpers/dbErrorHandling');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.MAIL_KEY);

// exports.registerController = (req, res) => {
//   res.json({
//     success:true,
//     message:'Register'
//   })
// }


exports.registerController = (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  // Validation to req,body we will create custom validation in seconds
  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      error: firstError
    });
  } else {
    User.findOne({
      email
    }).exec((err, user) => {
      // If user exists
      if (user) {
        return res.status(400).json({
          error: 'Email is taken'
        });
      }
    });

    // Generate Token
    const token = jwt.sign(
      {
        name,
        email,
        password
      },
      process.env.JWT_ACCOUNT_ACTIVATION,
      {
        expiresIn: '15m'
      }
    );

    // Email data sending
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Account activation link',
      html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
      <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
            <!--[if !mso]><!-->
            <meta http-equiv="X-UA-Compatible" content="IE=Edge">
            <!--<![endif]-->
            <!--[if (gte mso 9)|(IE)]>
            <xml>
              <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
            <!--[if (gte mso 9)|(IE)]>
        <style type="text/css">
          body {width: 600px;margin: 0 auto;}
          table {border-collapse: collapse;}
          table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
          img {-ms-interpolation-mode: bicubic;}
        </style>
      <![endif]-->
            <style type="text/css">
          body, p, div {
            font-family: courier, monospace;
            font-size: 16px;
          }
          body {
            color: #FFFFFF;
          }
          body a {
            color: #fe5d61;
            text-decoration: none;
          }
          p { margin: 0; padding: 0; }
          table.wrapper {
            width:100% !important;
            table-layout: fixed;
            -webkit-font-smoothing: antialiased;
            -webkit-text-size-adjust: 100%;
            -moz-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
          img.max-width {
            max-width: 100% !important;
          }
          .column.of-2 {
            width: 50%;
          }
          .column.of-3 {
            width: 33.333%;
          }
          .column.of-4 {
            width: 25%;
          }
          @media screen and (max-width:480px) {
            .preheader .rightColumnContent,
            .footer .rightColumnContent {
              text-align: left !important;
            }
            .preheader .rightColumnContent div,
            .preheader .rightColumnContent span,
            .footer .rightColumnContent div,
            .footer .rightColumnContent span {
              text-align: left !important;
            }
            .preheader .rightColumnContent,
            .preheader .leftColumnContent {
              font-size: 80% !important;
              padding: 5px 0;
            }
            table.wrapper-mobile {
              width: 100% !important;
              table-layout: fixed;
            }
            img.max-width {
              height: auto !important;
              max-width: 100% !important;
            }
            a.bulletproof-button {
              display: block !important;
              width: auto !important;
              font-size: 80%;
              padding-left: 0 !important;
              padding-right: 0 !important;
            }
            .columns {
              width: 100% !important;
            }
            .column {
              display: block !important;
              width: 100% !important;
              padding-left: 0 !important;
              padding-right: 0 !important;
              margin-left: 0 !important;
              margin-right: 0 !important;
            }
            .social-icon-column {
              display: inline-block !important;
            }
          }
        </style>
            <!--user entered Head Start-->
      
           <!--End Head user entered-->
          </head>
          <body>
            <center class="wrapper" data-link-color="#fe5d61" data-body-style="font-size:16px; font-family:courier, monospace; color:#FFFFFF; background-color:#f2f4fb;">
              <div class="webkit">
                <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#f2f4fb">
                  <tr>
                    <td valign="top" bgcolor="#f2f4fb" width="100%">
                      <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td width="100%">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td>
                                  <!--[if mso]>
          <center>
          <table><tr><td width="600">
        <![endif]-->
                                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                            <tr>
                                              <td role="modules-container" style="padding:0px 0px 0px 0px; color:#FFFFFF; text-align:left;" bgcolor="#f2f4fb" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
          <tr>
            <td role="module-content">
              <p>You've found the secret!</p>
            </td>
          </tr>
        </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="98ndJyAY9BSGjoVqrr6FYx">
            <tbody><tr>
              <td style="font-size:6px; line-height:10px; padding:30px 0px 30px 0px;" valign="top" align="center"><img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:25% !important; width:25%; height:auto !important;" src="http://cdn.mcauto-images-production.sendgrid.net/bd18b6c30e997418/28d69c2b-4460-4f82-b666-f698ffacb00d/316x316.png" alt="CMU Activity Management System" width="150" data-responsive="true" data-proportionally-constrained="false"></td>
            </tr>
          </tbody></table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="3Ypdby9Xfsf2rN27zTDEfN">
            <tbody><tr>
              <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
                <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" src="http://cdn.mcauto-images-production.sendgrid.net/bd18b6c30e997418/e067a013-0893-4072-9358-9d75477b0b8f/1600x900.jpg" alt="" width="600" data-responsive="true" data-proportionally-constrained="false">
              </td>
            </tr>
          </tbody></table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="nSVYnVzPLnGZ4wUdynLiKo" data-mc-module-version="2019-10-22">
            <tbody><tr>
              <td style="background-color:#bed7f6; padding:30px 50px 30px 50px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="#bed7f6"><div><div style="font-family: inherit; text-align: left"><span style="font-size: 18px">Please use the following to activate your account<br>
      </span><span style="font-size: 10px; color: #123bd2">${process.env.CLIENT_URL}/users/activate/${token}</span><span style="color: #123bd2"><br>
      </span><span style="font-size: 18px">This email may contain sensitive information<br>
      </span><span style="font-size: 12px; color: #123bd2">${process.env.CLIENT_URL}</span></div><div></div></div></td>
            </tr>
          </tbody></table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="6jxKSRk9dKQ1Tvi1wtnu8q">
            <tbody><tr>
              <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
                <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" src="https://marketing-image-production.s3.amazonaws.com/uploads/0accac77b1e34c614730ab732317a493478835c96bd549fb2df7a921ec1177fdb30d6d33e1d0a33d8c6c579344890ae408ce13aaed0e478f1fd6d2219d308365.png" alt="" width="600" data-responsive="true" data-proportionally-constrained="false">
              </td>
            </tr>
          </tbody></table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="iYySZ4rAB78PLoW7vU13Bb">
            <tbody><tr>
              <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
              </td>
            </tr>
          </tbody></table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="mVyZz43HETwfwb72TGh4iy">
            <tbody><tr>
              <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
                <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="3px" style="line-height:3px; font-size:3px;">
                  <tbody><tr>
                    <td style="padding:0px 0px 3px 0px;" bgcolor="#ffffff"></td>
                  </tr>
                </tbody></table>
              </td>
            </tr>
          </tbody></table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="sfek66tVLi5d2iy5jmSawj">
            <tbody><tr>
              <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
              </td>
            </tr>
          </tbody></table><div data-role="module-unsubscribe" class="module unsubscribe-css__unsubscribe___2CDlR" role="module" data-type="unsubscribe" style="color:#FFFFFF; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:center;" data-muid="txBUUpmixSjuZ5Ad69p1sX"><div class="Unsubscribe--addressLine"></div><p style="font-family:arial,helvetica,sans-serif; font-size:12px; line-height:20px;"><a target="_blank" class="Unsubscribe--unsubscribeLink zzzzzzz" href="{{{unsubscribe}}}" style="">Unsubscribe</a></p></div></td>
                                            </tr>
                                          </table>
                                          <!--[if mso]>
                                        </td>
                                      </tr>
                                    </table>
                                  </center>
                                  <![endif]-->
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </center>
          </body>
        </html>
            `
    };

    sgMail
      .send(emailData)
      .then(sent => {
        return res.json({
          message: `Email has been sent to ${email}`
        });
      })
      .catch(err => {
        return res.status(400).json({
          success: false,
          error: err
        });
      });
  }
};

// Activation And Save To Database
exports.activationController = (req, res) => {
  const { token } = req.body;

  if (token) {
    // Verify the token is valid or not or expired
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
      if (err) {
        console.log('Activation error');
        return res.status(401).json({
          errors: 'Expired link. Signup again'
        });
      } else {
        // If valid save to database
        // Get name,email,password from token
        const { name, email, password } = jwt.decode(token);
        console.log(email);
        const user = new User({
          name,
          email,
          password
        });
        user.save((err, user) => {
          if (err) {
            console.log('Save error', errorHandler(err));
            return res.status(401).json({
              errors: errorHandler(err)
            });
          } else {
            return res.json({
              success: true,
              message: 'Signup success',
              user
            });
          }
        });
      }
    });
  } else {
    return res.json({
      message: 'error happening please try again'
    });
  }
};

exports.signinController = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  
  // Validation to req,body we will create custom validation in seconds
  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    // check if user exist
    User.findOne({
      email
    }).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          errors: 'User with that email does not exist. Please signup'
        });
      }
      // authenticate
      if (!user.authenticate(password)) {
        return res.status(400).json({
          errors: 'Email and password do not match'
        });
      }
      // generate a token and send to client
      const token = jwt.sign(
        {
          _id: user._id
        },
        process.env.JWT_SECRET,
        {
          // Token valid in 7 days you can set remember me in front and set it for 30 daya
          expiresIn: '7d'
        }
      );
      const { _id, name, email, role } = user;

      return res.json({
        token,
        user: {
          _id,
          name,
          email,
          role
        }
      });
    });
  }
};

// exports.requireSignin = expressJwt({
//   secret: process.env.JWT_SECRET // req.user._id
// });

// exports.adminMiddleware = (req, res, next) => {
//   User.findById({
//     _id: req.user._id
//   }).exec((err, user) => {
//     if (err || !user) {
//       return res.status(400).json({
//         error: 'User not found'
//       });
//     }

//     if (user.role !== 'admin') {
//       return res.status(400).json({
//         error: 'Admin resource. Access denied.'
//       });
//     }

//     req.profile = user;
//     next();
//   });
// };

// exports.forgotPasswordController = (req, res) => {
//   const { email } = req.body;
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     const firstError = errors.array().map(error => error.msg)[0];
//     return res.status(422).json({
//       errors: firstError
//     });
//   } else {
//     User.findOne(
//       {
//         email
//       },
//       (err, user) => {
//         if (err || !user) {
//           return res.status(400).json({
//             error: 'User with that email does not exist'
//           });
//         }

//         const token = jwt.sign(
//           {
//             _id: user._id
//           },
//           process.env.JWT_RESET_PASSWORD,
//           {
//             expiresIn: '10m'
//           }
//         );

//         const emailData = {
//           from: process.env.EMAIL_FROM,
//           to: email,
//           subject: `Password Reset link`,
//           html: `
//                     <h1>Please use the following link to reset your password</h1>
//                     <p>${process.env.CLIENT_URL}/users/password/reset/${token}</p>
//                     <hr />
//                     <p>This email may contain sensetive information</p>
//                     <p>${process.env.CLIENT_URL}</p>
//                 `
//         };

//         return user.updateOne(
//           {
//             resetPasswordLink: token
//           },
//           (err, success) => {
//             if (err) {
//               console.log('RESET PASSWORD LINK ERROR', err);
//               return res.status(400).json({
//                 error:
//                   'Database connection error on user password forgot request'
//               });
//             } else {
//               sgMail
//                 .send(emailData)
//                 .then(sent => {
//                   // console.log('SIGNUP EMAIL SENT', sent)
//                   return res.json({
//                     message: `Email has been sent to ${email}. Follow the instruction to activate your account`
//                   });
//                 })
//                 .catch(err => {
//                   // console.log('SIGNUP EMAIL SENT ERROR', err)
//                   return res.json({
//                     message: err.message
//                   });
//                 });
//             }
//           }
//         );
//       }
//     );
//   }
// };

// exports.resetPasswordController = (req, res) => {
//   const { resetPasswordLink, newPassword } = req.body;

//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     const firstError = errors.array().map(error => error.msg)[0];
//     return res.status(422).json({
//       errors: firstError
//     });
//   } else {
//     if (resetPasswordLink) {
//       jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(
//         err,
//         decoded
//       ) {
//         if (err) {
//           return res.status(400).json({
//             error: 'Expired link. Try again'
//           });
//         }

//         User.findOne(
//           {
//             resetPasswordLink
//           },
//           (err, user) => {
//             if (err || !user) {
//               return res.status(400).json({
//                 error: 'Something went wrong. Try later'
//               });
//             }

//             const updatedFields = {
//               password: newPassword,
//               resetPasswordLink: ''
//             };

//             user = _.extend(user, updatedFields);

//             user.save((err, result) => {
//               if (err) {
//                 return res.status(400).json({
//                   error: 'Error resetting user password'
//                 });
//               }
//               res.json({
//                 message: `Great! Now you can login with your new password`
//               });
//             });
//           }
//         );
//       });
//     }
//   }
// };

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT);
// // Google Login
// exports.googleController = (req, res) => {
//   const { idToken } = req.body;

//   client
//     .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT })
//     .then(response => {
//       // console.log('GOOGLE LOGIN RESPONSE',response)
//       const { email_verified, name, email } = response.payload;
//       if (email_verified) {
//         User.findOne({ email }).exec((err, user) => {
//           if (user) {
//             const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//               expiresIn: '7d'
//             });
//             const { _id, email, name, role } = user;
//             return res.json({
//               token,
//               user: { _id, email, name, role }
//             });
//           } else {
//             let password = email + process.env.JWT_SECRET;
//             user = new User({ name, email, password });
//             user.save((err, data) => {
//               if (err) {
//                 console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
//                 return res.status(400).json({
//                   error: 'User signup failed with google'
//                 });
//               }
//               const token = jwt.sign(
//                 { _id: data._id },
//                 process.env.JWT_SECRET,
//                 { expiresIn: '7d' }
//               );
//               const { _id, email, name, role } = data;
//               return res.json({
//                 token,
//                 user: { _id, email, name, role }
//               });
//             });
//           }
//         });
//       } else {
//         return res.status(400).json({
//           error: 'Google login failed. Try again'
//         });
//       }
//     });
// };

// exports.facebookController = (req, res) => {
//   console.log('FACEBOOK LOGIN REQ BODY', req.body);
//   const { userID, accessToken } = req.body;

//   const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

//   return (
//     fetch(url, {
//       method: 'GET'
//     })
//       .then(response => response.json())
//       // .then(response => console.log(response))
//       .then(response => {
//         const { email, name } = response;
//         User.findOne({ email }).exec((err, user) => {
//           if (user) {
//             const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//               expiresIn: '7d'
//             });
//             const { _id, email, name, role } = user;
//             return res.json({
//               token,
//               user: { _id, email, name, role }
//             });
//           } else {
//             let password = email + process.env.JWT_SECRET;
//             user = new User({ name, email, password });
//             user.save((err, data) => {
//               if (err) {
//                 console.log('ERROR FACEBOOK LOGIN ON USER SAVE', err);
//                 return res.status(400).json({
//                   error: 'User signup failed with facebook'
//                 });
//               }
//               const token = jwt.sign(
//                 { _id: data._id },
//                 process.env.JWT_SECRET,
//                 { expiresIn: '7d' }
//               );
//               const { _id, email, name, role } = data;
//               return res.json({
//                 token,
//                 user: { _id, email, name, role }
//               });
//             });
//           }
//         });
//       })
//       .catch(error => {
//         res.json({
//           error: 'Facebook login failed. Try later'
//         });
//       })
//   );
// };
