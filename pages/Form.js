import { useState } from 'react'
import styles from '../styles/Home.module.css'

const saveUser = async (user) => {
  const response = await fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify(user),
  })
  if (!response.ok) {
    throw new Error('User not saved', response.statusText)
  }

  return await response.json()
}

const Form = ({ users, setUsers }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const updateName = (event) => {
    setName(event.target.value)
  }

  const updateEmail = (event) => {
    setEmail(event.target.value)
  }

  const resetForm = () => {
    setName('')
    setEmail('')
  }

  const userDoesNotExist = () => {
    let bool = true
    users.forEach((user) => {
      if (user.email === email) bool = false
    })
    return bool
  }

  const submit = async (event, data) => {
    event.preventDefault()
    try {
      if (userDoesNotExist()) {
        await saveUser({ email, name })
        setUsers([...users, { email, name }])
        resetForm()
      } else {
        alert(`${email} has already signed up`)
        resetForm()
      }
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
