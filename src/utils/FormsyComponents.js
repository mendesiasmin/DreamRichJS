import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {HOC} from 'formsy-react';
import {DatePicker, IconButton} from 'material-ui';
import ActionDateRange from 'material-ui/svg-icons/action/date-range';
import {FormsyText} from 'formsy-material-ui/lib';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

/*
reference:
  https://github.com/callemall/material-ui/issues/3933/
*/

class DefFormsyDate extends Component {

  static propTypes = {
    getValue: PropTypes.func,
    setValue: PropTypes.func,
    defaultDate: PropTypes.object,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    requiredError: PropTypes.string,
    validationError: PropTypes.string,
    validationErrors: PropTypes.object,
    validations: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    value: PropTypes.object,
  };


  constructor(props){
    super(props);
    this.datePicker = {};
  }

  state = {
    selectedDate: null,
    dateText: null
  }

  componentDidMount() {
    const { defaultDate } = this.props;
    const value = this.props.getValue();

    if (typeof value === 'undefined' && typeof defaultDate !== 'undefined') {
      this.props.setValue(defaultDate);
    }
  }

  handleDateInputBlur = (value) => {
    let parsedDate = parse(value, 'DD/MM/YYYY');

    this.setState({selectedDate:parsedDate});
  }

  isADate = (maybeDate) => {
    if ( Object.prototype.toString.call(maybeDate) === '[object Date]' ) {
      if ( !isNaN( maybeDate.getTime() ) ) {
        return true;
      }
    }
    return false;
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value) {
      if (!this.props.value || !datesEq(this.props.value, newProps.value)) {
        this.props.setValue(newProps.value);
      }
    } else if (!this.props.value && newProps.defaultDate) {
      if (!datesEq(this.props.defaultDate, newProps.defaultDate)) {
        this.props.setValue(newProps.defaultDate);
      }
    }

    function datesEq(date1, date2) {
      return date1.getFullYear() === date2.getFullYear() &&
        date1.getDate() === date2.getDate() &&
        date1.getDay() === date2.getDay();
    }
  }

  handleChangeDatePicker = (event, date) => {
    this.setState({selectedDate: date, dateText:format(date, 'DD/MM/YYYY')});
  };

  handleChange(event, value) {
    this.props.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  }

  render() {

    const {
      defaultDate, // eslint-disable-line no-unused-vars
      validations, // eslint-disable-line no-unused-vars
      validationErrors, // eslint-disable-line no-unused-vars
      validationError, // eslint-disable-line no-unused-vars
      requiredError, // eslint-disable-line no-unused-vars
      ...rest } = this.props;


    return (
      <div style={{display: 'flex'}}>
        <FormsyText
          id={this.props.name + '_field'}
          style={{width:225, marginLeft: 20}}
          disabled={this.isFormDisabled}
          errorText={this.getErrorMessage}
          value={this.state.dateText}
          hintText="Ex: 01/01/1970"
          validationError='Insira uma data válida'
          validations={{
            matchRegexp:/^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/
          }}
          requiredError={requiredError}
          {...rest}
        />

      <IconButton style={{opacity:'0.65', marginTop:20}}
        onClick={() => this.datePicker.focus()}>
        <ActionDateRange />
      </IconButton>

      <div style={{width:'0px', height:'0px'}}>
        <DatePicker
          id={this.props.name + '_dataPicker'}
          formatDate={date => { return format(date, 'DD/MM/YYYY'); } }
          onChange={this.handleChangeDatePicker}
          value={this.state.selectedDate}
          ref={picker => { this.datePicker = picker;}}
          default={defaultDate}
          container='inline'
          fullWidth
          autoOk
        />
      </div>
    </div>
    );
  }
}

const FormsyDate = HOC(DefFormsyDate);

export {FormsyDate};