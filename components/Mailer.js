const sendMailer = (emailData) => {
  const { username, email, message } = emailData

  fetch('/api/contact', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, email, message}),
  }).then((res) => {
    console.log('Response received')
    if (res.status === 200) {
      console.log('Response succeeded!')
    }
  })
}

const MailScript = ({ users, }) => {

  const sendEachUserAnEmail = () => {
    users.forEach((user) => {
      const data = {
        username: user.name,
        email: user.email,
        message: "hello sucker"
      }

      sendMailer(data)
    })
  }

  setTimeout(sendEachUserAnEmail, 60000)
  
  return (
    <div>
      { children }
    </div>
  )

}

export default MailScript
