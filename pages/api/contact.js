
// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {
  console.log("MAILING")
  require('dotenv').config()
  const PASSWORD = process.env.password
  const USERNAME = process.env.user
  const SENDER = process.env.sender

  let nodemailer = require('nodemailer')

  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: USERNAME,
      pass: PASSWORD,
    }
  });

  const mailData = {
    from: "copenotesdemoelijah@gmail.com",
    to: req.body.email,
    subject: `Message From ${req.body.name}`,
    html: '<div>EMAIL HAS BEEN SENT</div>'
  }

  console.log({ mailData })
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