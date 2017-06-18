import React from 'react';

const Input = (props) =>
{
    return (
      <div>
        <label>{props.label}
          <input type={props.type} name={props.name} value={props.value} placeholder={props.placeholder} onChange={props.onchange} />
        </label>
      </div>
    )
}
export default Input;
