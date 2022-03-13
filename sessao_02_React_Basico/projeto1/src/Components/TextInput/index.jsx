import {Component} from 'react';
import './styles.css'

export class TextInput extends Component{
  render(){
    const {onChange, value, type, placeholder} = this.props;
    return(
      <input 
          className='input'
          onChange={onChange}
          type={type} 
          value={value}
          placeholder={placeholder}
        /> 
      )
  }
}
