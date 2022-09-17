import { useState } from 'react'
import types from 'prop-types'
import styles from '../styles/Home.module.css'
import { getUsers } from './api'
import HeadData from '../components/HeadData'
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
      <HeadData />
      <div className={styles.main}>
        <SetupToastContainer />
        <div className={styles.mainLeft}>
          <span>BEATLES<br />PER<br />SECOND</span>
        </div>
        <div className={styles.mainRight}>
          <div className={styles.container}>
            <span>Sign up to receive a The Beatles lyric every minute!</span>
            <Form users={users} setUsers={setUsers} />
          </div>
        </div>
      </div>
    </>
  )
}

Home.propTypes = {
  initialUsers: types.array.isRequired,
}

export default Home
