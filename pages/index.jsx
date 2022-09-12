import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getUsers, getMessages } from "./api"

export async function getServerSideProps() {
  const users = await getUsers()
  const messages = await getMessages()

  return {
    props: {
      initialUsers: users,
      messages,
    },
  }
}


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

export default function Home({ initialUsers, messages }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [users, setUsers] = useState(initialUsers)

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

  // const onSubmit = (event) => {
  //   event.preventDefault()
  //   console.log("sending...")

  //   let data = {
  //     name,
  //     email
  //   }
  //   fetch("/api/contact", {
  //     method: "POST",
  //     headers: {
  //       "Accept": "application/json, text/plain, */*",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(data)
  //   }).then((res) => {
  //     console.log("Response received")
  //     if (res.status === 200) {
  //       console.log("Response succeeded!")
  //       setSubmitted(true)
  //       setName("")
  //       setEmail("")
  //     }
  //   })
  // }

  const submit = async (event, data) => {
    event.preventDefault()
    try {
      await saveUser({ email })
      setUsers([...users, { email, name }])
    } catch (error) {
      console.error(error)
    }
  }

  console.log({ users, messages })

  return (
    <div className={styles.container}>
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
    </div>
  )
}
