import { useEffect, useState } from 'react'
import Form from './Form'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getUsers, getMessages } from './api'

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

export default function Home({ initialUsers, messages }) {
  const [users, setUsers] = useState(initialUsers)

  return (
    <div className={styles.container}>
      <Form users={users} setUsers={setUsers} />
    </div>
  )
}
