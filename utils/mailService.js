import nodemailer from 'nodemailer';

const sendMail = async (to, subject, html) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.forwardemail.net',
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from:
            // <https://forwardemail.net/guides/send-email-with-custom-domain-smtp>
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PW
        },
    })
    
    const { res, err }  = await transporter.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to,
        subject,
        html
    })

    return res
}
