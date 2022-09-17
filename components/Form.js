import { useState } from 'react'
import types from 'prop-types'
import styles from '../styles/Home.module.css'
import { successToast, errorToast } from "./Toast"
import PrimaryButton from "./PrimaryButton"

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

    if (name.length < 1 || email.length < 1)
      return errorToast("Please enter a valid name and email address.")

    try {
      if (userDoesNotExist()) {
        await saveUser({ email, name })
        setUsers([...users, { email, name }])
        successToast(`Congratulations, ${name}! You've officially joined the mailing list!`)
        resetForm()
      } else {
        errorToast(`${email} is already in our system. Please try again.`)
        resetForm()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        className={styles.inputField}
        onChange={updateName}
        value={name}
      />
      <label className={styles.inputLabel} htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        className={styles.inputField}
        value={email}
        onChange={updateEmail}
      />
      <PrimaryButton
      type="submit"
      text="Sign Up!"
    />
    </form>
  )
}

Form.propTypes = {
  users: types.array.isRequired,
  setUsers: types.func.isRequired,
}

export default Form
