const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
    }
});

module.exports = {
  emailRecoverPassword: function(newPassword, userEmail) {
    let mailOptions = {};
    mailOptions.from = '"Company Recover Password 👻" <foo@blurdybloop.com>'
    mailOptions.to = userEmail
    mailOptions.subject = 'Olar'
    mailOptions.text = 'Hello world ?'
    mailOptions.html = '<div style="background-color:#DDD;width:700px;height:200px;-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;">'+
                          '<p style="font-size:22px;text-align:center;padding-top:20px;">Sucesso.com</p>'+
                          '<ul><li>Click below and insert the new password</li></ul>'+
                          '<p style="font-size:14px;text-align:left;padding-left:40px;padding-top:20px;">'+ process.env.RAIZ+'/change-password?m='+userEmail+'&p='+newPassword+'</p>'+
                       '</div>',

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
  }
}


// // setup email data with unicode symbols
// let mailOptions = {
//     from: '"Company Recover Password 👻" <foo@blurdybloop.com>', // sender address
//     to: 'felipe.muner@gmail.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world ?', // plain text body
//     html: '<b>Hello world ?</b>', // html body
//     attachments: [
//         {   // utf-8 string as an attachment
//             filename: 'text1.txt',
//             content: 'hello world!'
//         },
//         {   // binary buffer as an attachment
//             filename: 'text2.txt',
//             content: new Buffer('hello world!','utf-8')
//         }
//     ]
// };
//
// // send mail with defined transport object
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message %s sent: %s', info.messageId, info.response);
// });
