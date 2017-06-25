import React from 'react';

const Button = (props) => {

  const buttonStyle = {
    backgroundColor: props.backgroundColor,
    color: props.color,
  }

  return (
    <button style={buttonStyle} type={props.type} onClick={props.onClick}>{props.value}</button>
  )
}

Button.defaultProps = {
  backgroundColor: "#03A9F4",
  color: "white"
}

export default Button;
