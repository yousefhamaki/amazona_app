import React from 'react'

const ErrorBox = (props) => {
  return (
    <div className={`alert alert-error`}>
      {props.children}
    </div>
  )
}

export default ErrorBox