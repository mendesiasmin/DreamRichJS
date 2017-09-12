import React, {Component} from 'react';
import {Auth} from '../Auth';
import '../../stylesheet/LoginForm.sass';
import RaisedButton from 'material-ui/RaisedButton';
import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';


export default class LoginForm extends Component{

  constructor(props){
    super(props);
    this.state={send: false, userExist: true};
    this.handleSubmit = this.handleSubmit.bind(this);

    Formsy.addValidationRule('userExist', () => {
      return this.state.userExist;
    });

    this.invalidMessage = 'Usuário e/ou senha inválidos.';
  }

  handleSubmit(data){
    console.log(data);
    // console.log(event.target.username.value);
    // console.log(event.target.password.value);
    fetch('/api/auth/',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      if(response.ok){
        return response.json();
      }else {
        throw new Error(`Requisition error ${response.status}`);
      }
    })
    .then(Auth.authenticate)
    .catch((error) => {
      this.setState({userExist: false});
      this.form.validateForm();
      console.log('asdf', error);
    });
  }

  render(){
    return (
      <Formsy.Form ref={ (form) => {this.form = form;}}
        onInvalid={() => {this.setState({userExist: true});} }
        onValidSubmit={this.handleSubmit}>
        <FormsyText type="text"
          name="username"
          required
          hintText="E-mail ou nome de usuário"
          floatingLabelText="Usuário"
          validations = "userExist"
          validationError={' '}
        />
        <br/>
        <FormsyText type="password"
          name="password"
          required
          hintText="Senha"
          floatingLabelText="Senha"
          validations = "userExist"
          validationError={this.invalidMessage} />
        <br/><br/>
        <RaisedButton primary label="ENTRAR" type="submit"/>
        <br/><br/>
      </Formsy.Form>

    );
  }
}
