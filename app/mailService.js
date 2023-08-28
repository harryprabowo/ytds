import nodemailer from 'nodemailer';
import fs from "fs"

export const sendMail = async (to, subject, data) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PW
        },
    })

    // Read the email template
    const templateSource = fs.readFileSync('utils/email-template.hbs', 'utf8');
    const template = handlebars.compile(templateSource);
    const html = template(data);

    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to,
        subject,
        html
    }
    
    const { res, err } = await transporter.sendMail(mailOptions)

    if (err) {
        throw new Error(err.message)
    }

    return res
}

export default sendMail