import React, {Component} from 'react';
//import Formsy from 'formsy-react';
import RaisedButton from 'material-ui/RaisedButton';
import {FormsyText} from 'formsy-material-ui/lib';
import {FormsyDate} from '../utils/formsyComponents/FormsyComponents';
import errorMessages from '../utils/FormsErrorMessages';
import ClientSubForm from './ClientSubForm';
import PropTypes from 'prop-types';


var {
  wordsError,
} = errorMessages;
class ClientDependentForm extends Component {
  constructor(props){
    super(props);
  }

  state = {
    dependents: [],
    key: 0
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    if (nextProps.parent_id!== undefined) {
      this.setState({id: nextProps.parent_id});
      console.log('update next props state');
    }
  }

  addDependent = () => {
    this.setState({
      dependents: [...this.state.dependents,
        this.state.key],
      key: this.state.key + 1
    });
  }

  removeDependent = (key) => {
    const array = this.state.dependents.slice();
    this.setState({
      dependents: array.filter(e => e !== key),
    });
  }

  render = () => {
    console.log(this.state.dependents, this);
    return (
      <div>
        {this.state.dependents.map(e => 
          <div key={e}
          >
            <ClientSubForm
              title="Dependente"
              name="dependent"
              parent_name='active_client_id'
              parent_id={this.props.parent_id}>
              <div>
                <FormsyText
                  name="name"
                  validations="isWords"
                  validationError={wordsError}
                  hintText="Nome do dependente"
                  floatingLabelText="Nome"
                />
                <FormsyText
                  name="surname"
                  validations="isWords"
                  validationError={wordsError}
                  hintText="Sobrenome do dependente"
                  floatingLabelText="Sobrenome"
                />
                <FormsyDate
                  name="birthday"
                  floatingLabelText="Data de Nascimento"
                />
              </div>
            </ClientSubForm>
            <RaisedButton onClick={this.removeDependent.bind(this, e)}>Remove</RaisedButton>
          </div>
        )}
        <RaisedButton onClick={this.addDependent}>add</RaisedButton>
      </div>
    );
  }
}

export default ClientDependentForm;

ClientDependentForm.propTypes = {
  parent_id: PropTypes.number,
};