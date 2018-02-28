import React from "react"

const ErrorField = ({ input, label, type, meta: { error, touched } }) => {
  const errorText = touched &&
    error && <div style={{ color: "tomato" }}>{error}</div>

  return (
    <div>
      <label>{label}</label>
      <input type={type} {...input} />
      {errorText}
    </div>
  )
}

export default ErrorField
