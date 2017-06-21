import React from 'react';

const Button = (props) => {

  const buttonStyle = {
    backgroundColor: props.backgroundColor,
    color: props.color,
  }

  return (
    <button style={buttonStyle} type={props.type}>{props.value}</button>
  )
}

export default Button;
