import Head from 'next/head'
import types from 'prop-types'

const HeadData = ({ title }) => {
  return (
    <Head>
      <title>
        { title }
      </title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  )
}

HeadData.defaultProps = {
  title: 'Cope Notes: Elijah Hensel',
}

HeadData.propTypes = {
  title: types.string
}

export default HeadData