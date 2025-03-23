const nodemailer = require('nodemailer');
// Email sending function
const sendMail = async (req, res) => {
    const { toEmail, subject, message } = req.body;

    if (!toEmail || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    // Configure transporter (Using Gmail SMTP)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Your email
            pass: process.env.EMAIL_PASS, // App password (not normal password)
        },
    });

    // Email options
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: subject,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: 'Email sent successfully!' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
};

module.exports = sendMail;
