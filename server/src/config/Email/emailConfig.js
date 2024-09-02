import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewPath =  path.resolve(__dirname, '../../templates/views/');
const partialsPath = path.resolve(__dirname, '../../templates/partials');

export const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  auth: {
    user: 'wogetapp@outlook.com',
    pass: '(L+33tX7$-tj.H3@',
  },
});

export const sendMail = (to,subject,userName,textName,otherText='') => {
  transporter.use('compile', hbs({
    viewEngine: {
      extName: '.handlebars',
      layoutsDir: viewPath,
      defaultLayout: false,
      partialsDir: partialsPath,
    },
    viewPath: viewPath,
    extName: '.handlebars',
  }))

  const mailOptions = {
    from: 'wogetapp@outlook.com',
    to: to,
    subject: subject,
    template: 'index',
    context: {
      userName,
      textName,
      otherText
    },
  };
    transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


}
