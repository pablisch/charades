// import React from 'react'
import PropTypes from 'prop-types'
import './Format.css'

const Format = ({children}) => {
  return (
    <div className='format'>
      {children}
    </div>
  )
}

Format.propTypes = {
  children: PropTypes.node.isRequired
}

export default Format
