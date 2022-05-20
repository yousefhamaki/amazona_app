import React from 'react'

const MessageBox = (props) => {
  return (
    <div className={`alert alert-${props.varient || "info"}`}>
      {
        // props.message ? props.message : 
        props.children
      }
    </div>
  )
}

export default MessageBox