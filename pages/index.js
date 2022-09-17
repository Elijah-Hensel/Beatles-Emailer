import { useState } from 'react'
import Head from 'next/head'
import types from 'prop-types'
import styles from '../styles/Home.module.css'
import { getUsers } from './api'
import Form from '../components/Form'
import { SetupToastContainer } from '../components/Toast'

export async function getServerSideProps() {
  const users = await getUsers()

  return {
    props: {
      initialUsers: users,
    },
  }
}

const Home = ({ initialUsers }) => {
  const [users, setUsers] = useState(initialUsers)

  return (
    <>
      <Head>
        <title>Cope Notes: Elijah Hensel</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.main}>
        <SetupToastContainer />
        <div className={styles.container}>
          <span>Sign up to receive a The Beatles lyric every minute!</span>
          <Form users={users} setUsers={setUsers} />
        </div>
      </div>
    </>
  )
}

Home.propTypes = {
  initialUsers: types.array.isRequired,
}

export default Home
