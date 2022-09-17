import Head from 'next/head'
import types from 'prop-types'

const Header = ({ title }) => {
  return (
    <Head>
      <title>
        { title }
      </title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  )
}

Header.defaultProps = {
  title: 'Cope Notes: Elijah Hensel',
}

Header.propTypes = {
  title: types.string
}

export default Header