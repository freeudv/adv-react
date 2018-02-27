import React from "react"

function ErrorField(props) {
  const { input, type, meta: { error, touched } } = props
  const errorText = touched &&
    error && <div style={{ color: "tomato" }}>{error}</div>

  console.log("props", props)
  return (
    <div>
      <label>{input.name}</label>
      <input type={type} {...input} />
      {errorText}
    </div>
  )
}

export default ErrorField
