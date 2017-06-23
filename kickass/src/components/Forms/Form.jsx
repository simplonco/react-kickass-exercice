import React, { Component } from 'react';
import '../../CSS/Form.css';
import Input from './Input.jsx'
import Button from '../Button.jsx';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    }
  }

  handleFormChange = (event) => {
     this.setState({
         [event.target.name]: event.target.value
       });
   }

   onFocusInput = (event) => {
     event.target.parentElement.classList.add('is-focused');
     event.target.parentElement.classList.add('has-label');

   }

   onBlurInput = (event) => {
     if (event.target.value.length === 0 ) {
       event.target.parentElement.classList.remove('is-focused')
     }
     event.target.parentElement.classList.remove('has-label')
   }

   render() {
     return(
       <form>
         <Input forLabel="name" nameLabel="name"
           type="text"
           name="name"
           value={this.state.name}
           required="required"
           onChange={this.handleFormChange}
           onFocus={this.onFocusInput}
           onBlur={this.onBlurInput} />
         <Button type="submit" value="valider"/>
       </form>
     )
   }
}

export default Form;
