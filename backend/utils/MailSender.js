const nodemailer = require("nodemailer");

const mailSender = async ({ email, subject, message }) => {

    try{
        let transporter = nodemailer.createTransport({
            host:process.env.HOST,
            auth: {
                user: process.env.Mail_User,
                pass: process.env.Mail_Password
            }
        });

        let info = await transporter.sendMail({
            from: process.env.Mail_User,
            to: email,
            subject: subject,
            text: message
        });

        console.log("Message sent: %s", info.messageId);
        return info;
    }

    catch(err){
        console.log(err,"Error in sending mail");
    }
}