import nodemailer from 'nodemailer';
import handlebars from 'handlebars'
import fs from "fs"

export const sendMail = async (
    to,
    subject,
    {
        name,
        venues,
    }
) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PW
        },
    })

    const data = {
        name,
        venues: venues.map(({ time,location, ...rest }) => {
            let _date = new Date(time)
            let _location = JSON.parse(JSON.stringify(location))

            return ({
                ...rest,
                date: _date.getDate(),
                date_full: _date.toLocaleString('default', { month: 'short', year: '2-digit' }),
                timeStr: _date.toLocaleTimeString('en-US', { timeStyle: 'short' }),
                link: _location.gmaps.link,
            })
        }),
        randomness: Date.now()
    }


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