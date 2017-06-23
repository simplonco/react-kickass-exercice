import React, { Component } from 'react';

class Input extends  Component {
  constructor(props) {
    super(props);
  }

   onFocusInput = (event) => {
     const { parentElement } = event.target;
     parentElement.classList.add('is-focused');
     parentElement.classList.add('has-label');
   }

   onBlurInput = (event) => {
     const { parentElement, value } = event.target;
     if (value.length === 0 ) {
       parentElement.classList.remove('is-focused')
     }
     parentElement.classList.remove('has-label')
   }

  render() {
    return(
      <div className="field">
        <label className="field-label" for={this.props.forLabel}>
          {this.props.nameLabel}
        </label>
        <input className="field-input"
          type={this.props.type}
          id={this.props.forLabel}
          name={this.props.name}
          value={this.props.value}
          placeholder={this.props.placeholder}
          required={this.props.required}
          onChange={this.props.onChange}
          onFocus={this.onFocusInput}
          onBlur={this.onBlurInput}/>
      </div>
    )
  }
}


export default Input;
