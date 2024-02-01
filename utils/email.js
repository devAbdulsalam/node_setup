import transporter from './transporter';

// import sendEmail from './email';
const sendEmail = async (option) => {
	const emailOptions = {
		from: 'ammuftau74@gmail.com',
		to: option.sendEmail,
		subject: option.subject,
		text: option.text,
	};
    const message = await transporter.sendMail(emailOptions);
    return message
};
export default sendEmail;
