import React from 'react'

const Notification = ({message,typeM}) => {
  if (message === null) {
    return null
  }
  console.log("Notification comp, typeM=",typeM)
  return (
    <div className={typeM}>
      {message}
    </div>
  )
}

export default Notification