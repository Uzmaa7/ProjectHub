import Mailgen from "mailgen";
import nodemailer from "nodemailer";


//mail craft -> Mailgen
//mail send -> nodemailer

const sendMail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Task Manager',
            link: 'https://mailgen.js/'
        },
    });

    const emailHTMLBody = mailGenerator.generate(options.mailGenContent);
    const emailPlainText = mailGenerator.generatePlaintext(options.mailGenContent);

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        secure: false, // Use true for port 465, false for port 587
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASSWORD,
        },
    });

    const mail = {
        from: 'mail.taskmanager@example.com',
        to: options.email,
        subject: options.subject,
        text: emailPlainText, // Plain-text version of the message
        html: emailHTMLBody, // HTML version of the message
    };

    try{
        await transporter.sendMail(mail)
    }
    catch(error){
        console.log("mail error", error);
    }
}


const emailVerificationMailGenContent = (username, verificationUrl) => {
    return {
        body: {
        name: username,
        intro: 'Welcome to App! We\'re very excited to have you on board.',
        action: {
            instructions: 'To get started with App, please click here:',
            button: {
                color: '#22BC66', // Optional action button color
                text: 'Verify your account',
                link: verificationUrl,
            }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
}


const forgotPasswordMailGenContent = (username, passwordResetUrl) => {
    return {
        body: {
        name: username,
        intro: 'We got a request to reset your password',
        action: {
            instructions: 'To reset your password, please click here:',
            button: {
                color: '#22BC66', // Optional action button color
                text: 'reset your password',
                link: passwordResetUrl,
            }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
}


// sendMail({
//     email: user.email,
//     subject: 'abcd',
//     mailGenContent: emailVerificationMailGenContent(username,``),
// })


 