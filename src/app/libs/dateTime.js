import React from 'react'

const dateTime = (str) => {
  return (
    str.replace('T', ' ').substring(0,16)
  )
}

export default dateTime
