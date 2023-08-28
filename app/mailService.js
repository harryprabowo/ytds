import nodemailer from 'nodemailer';

export const sendMail = async (to, subject, html) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PW
        },
    })

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