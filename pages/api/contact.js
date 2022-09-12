
// eslint-disable-next-line import/no-anonymous-default-export
export default function (req, res) {
  require('dotenv').config()
  const PASSWORD = process.env.password

  let nodemailer = require('nodemailer')

  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a3c92a06096dbd",
      pass: PASSWORD,
    }
  });

  const mailData = {
    from: 'copenotesdemoelijah@gmail.com',
    to: req.body.email,
    subject: `Message From ${req.body.name}`,
    html: '<div>EMAIL HAS BEEN SENT</div>'
  }

  transporter.sendMail(mailData, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info)
  })

  res.send(
    {status: 200,}
  )
}