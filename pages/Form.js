import { useState } from 'react'
import styles from '../styles/Home.module.css'

async function saveUser(user) {
  const response = await fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify(user),
  })
  if (!response.ok) {
    throw new Error('User not saved', response.statusText)
  }

  return await response.json()
}

const beginSendingMailers = (email, name) => {
  console.log("sending...")

  const data = {
    email, name
  }

  fetch("api/contact", {
    method: "POST",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(users)
  }).then((res) => {
    console.log("Response received")
    if (res.status === 200) {
      console.log("Response succeeded!")
    }
  })
}


const Form = ({ users, setUsers }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const updateName = (event) => {
    setName(event.target.value)
  }

  const updateEmail = (event) => {
    setEmail(event.target.value)
  }

  const resetForm = () => {
    setName('')
    setEmail('')
    setSubmitted(false)
  }

  const submit = async (event, data) => {
    event.preventDefault()
    try {
      await saveUser({ email, name })
      setUsers([...users, { email, name }])
      beginSendingMailers(email, name)
      resetForm()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <form className={styles.main} onSubmit={submit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        className={styles.inputField}
        onChange={updateName}
        value={name}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        className={styles.inputField}
        value={email}
        onChange={updateEmail}
      />
      <button type="submit">Click</button>
    </form>
  )
}

export default Form
