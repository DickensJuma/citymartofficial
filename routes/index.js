
    const express = require('express');
    const nodemailer = require('nodemailer');
    const flash = require('connect-flash');
    const session = require('express-session');
    
require('dotenv').config();
   

var router = express.Router();

    
    // Express Session Middleware
    router.use(session({
        secret: 'ninja fox',
        resave: true,
        saveUninitialized: true
    }));
    
    // Express Messages Middleware
    router.use(require('connect-flash')());
    router.use(function (req, res, next) {
        res.locals.messages = require('express-messages')(req, res);
        next();
    });
    
    router.get('/', (req, res) =>
res.render('home'));
    // @route  GET contact
    // @desc   GET Contact page
    // @access Public
    router.get('/contact', function (req, res) {
        res.render('contact', {
            title:'Contact Us'
        });
    });
    
    // @route  POST contact
    // @desc   POST Contact information
    // @access Public
    router.post('/contact',(req,res)=>{
    
                // The actual output format of the message, that it is going to be sent by email
                const output = `<h3>Contact Details</h3>
                                <ul> 
                                    <li>Name: ${req.body.name}</li>
                                    <li>Email: ${req.body.email}</li>
                                    <li>Phone No.: ${req.body.phone}</li>
                                </ul>
                                <h3>Message</h3> `;
    
            // NODEMAILER
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: 'gmail',
                service:'gmail',
                secureConnection: false, // TLS requires secureConnection to be false
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'kennedyojwang57@gmail.com', // generated ethereal user
                    pass: '0704868023dj' // generated ethereal password
                },
                tls: {
                ciphers:'SSLv3'
                }
            });
    
            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Kadianga Electrical Ltd" orders@kadianga.co.ke', // sender address
                to: `kennedyojwang57@gmail.com`, // list of receivers
                subject: 'Product Request', // Subject line
                html:output // html body
            };
    
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                } else {
                    console.log('Message sent: %s', info.messageId);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                }
            });
            
            req.flash('success_msg', 'Order sent sucessfully!');
            res.redirect("/");
    });
    
    router.post('/subscribe',(req,res)=>{
    
        // The actual output format of the message, that it is going to be sent by email
        const output = `<h3>hank you for Subscribing</h3>
       
    
      
        `;

    // NODEMAILER
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'gmail',
        service:'gmail',
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'kennedyojwang57@gmail.com', // generated ethereal user
            pass: '0704868023dj' // generated ethereal password
        },
        tls: {
        ciphers:'SSLv3'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Kadianga Electrical Ltd" orders@kadianga.co.ke', // sender address
        to: `kennedyojwang57@gmail.com,${req.body.email}`, // list of receivers
        subject: 'Subscription Request',
        html:output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        } else {
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }
    });
    
    req.flash('success_msg', 'You subscribed sucessfully!');
    res.redirect("/");
});
 
        
   
router.get('/products', (req, res) =>
    res.render('products'));

 
module.exports = router;