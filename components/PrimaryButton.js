import types from 'prop-types'
import styles from '../styles/Home.module.css'

const PrimaryButton = ({ type, text }) => {
  return (
    <button className={styles.button} type={type}>
      { text }
    </button>
  )
}

PrimaryButton.propTypes = {
  type: types.oneOf(['submit', 'reset', 'text']).isRequired,
  text: types.string.isRequired,
}

export default PrimaryButton
