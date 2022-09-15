import { useState } from 'react'
import Form from './Form'
import styles from '../styles/Home.module.css'
import { getUsers, getMessages } from './api'

export async function getServerSideProps() {
  const users = await getUsers()
  const messages = await getMessages()

  return {
    props: {
      initialUsers: users,
      initialMessages: messages,
    },
  }
}

const Home = ({ initialUsers, initialMessages }) => {
  const [users, setUsers] = useState(initialUsers)
  const [messages, _] = useState(initialMessages)

  return (
    <div className={styles.container}>
      <span>Sign up to receive a The Beatles lyric every minute!</span>
      <Form users={users} setUsers={setUsers} messages={messages}/>
    </div>
  )
}

export default Home