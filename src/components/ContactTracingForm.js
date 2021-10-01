import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import MaterialUiPhoneNumber from "material-ui-phone-number";
import countryData from "../data/Countries";
import styled from "styled-components";
import Notice from "./Notice";
import LoadingButton from '@mui/lab/LoadingButton';
import HandleCookie from "../classes/HandleCookie";
import API from "../data/API";

const Form = styled.form`
  width: 100%;
  text-align: left;
`;

const FormInput = styled.div`
  margin-bottom: 8px;
`;

function ContactTracingForm({ storeId, setOverlayModal, setLoaderStatus }) {
  const history = useHistory();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    addressStreet: '',
    addressCity: '',
    addressState: '',
    addressZip: '',
    addressCountry: 'US',
    phone: '+1',
    email: '',
    agreement: false,
    marketing: false
  })

  const [formErrors, setFormErrors] = useState({
    firstName: null,
    lastName: null,
    addressStreet: null,
    addressCity: null,
    addressState: null,
    addressZip: null,
    addressCountry: null,
    phone: null,
    email: null,
  })

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const name = e.target.name;
    let value = e.target.value;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    setFormData({
      ...formData,
      [name]: value,
    })

    formValidate(name, value)    
  }

  function handlePhoneChange(input) {
    setFormData({
      ...formData,
      phone: input
    })

    formValidate('phone', input)
  }

  function formValidate(inputName, inputValue) {

    let result = true;
    let regex;
    let errorMessage;
    switch(inputName) {
      case 'firstName':
        regex = /^[a-zA-Z][a-zA-Z ']{1,32}$/
        result = regex.test(inputValue);
        if (!result) {
          errorMessage = 'Please enter a valid first name. Special characters not allowed.';
        }
        break;
      case 'lastName':
        regex = /^[a-zA-Z][a-zA-Z ']{1,32}$/
        result = regex.test(inputValue);
        if (!result) {
          errorMessage = 'Please enter a valid last name. Special characters not allowed.';
        }
        break;
      case 'addressStreet':
        regex = /^[0-9][a-zA-Z0-9 -.#'`]{5,50}$/
        result = regex.test(inputValue);
        if (!result) {
          errorMessage = 'Please enter a valid street address.';
        }
        break;
      case 'addressCity':
        regex = /^[a-zA-Z][a-zA-Z '`]{1,32}$/
        result = regex.test(inputValue);
        if (!result) {
          errorMessage = 'Please enter a valid city.';
        }
        break;
      case 'addressState':
        regex = /^[a-zA-Z -]{2,32}$/
        result = regex.test(inputValue);
        if (!result) {
          errorMessage = 'Please enter a valid state / province.';
        }
        break;
      case 'addressZip':
        regex = /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/
        result = regex.test(inputValue);
        if (!result) {
          errorMessage = 'Please enter a valid zip / postal code.';
        }
        break;
      case 'phone':
        regex = /^[0-9]{11,15}$/
        result = regex.test(inputValue.replace(/\D/g,''));
        if (!result) {
          errorMessage = 'Please enter a valid phone number.';
        }
        break;
      case 'email':
        if (inputValue.length > 0) {
          regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:)*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:)+)\])/
          result = regex.test(inputValue);
          if (!result) {
            errorMessage = 'Please provide a valid email address or no email address.';
          }
        }
        break;
      default:
        result = true;
        break;
    }

    if (result === false) {
      setFormErrors({
        ...formErrors,
        [inputName]: errorMessage
      })
      return { [inputName]: errorMessage }
    } else {
      setFormErrors({
        ...formErrors,
        [inputName]: null
      })
      return { [inputName]: null }
    }
  }

  function preValidate() {
    let updateObj = {}
    Object.keys(formData).forEach(inputName => {
      const currentObj = formValidate(inputName, formData[inputName])
      updateObj[inputName] = currentObj[inputName];
    })
    setFormErrors({
      ...formErrors,
      firstName: updateObj.firstName,
      lastName: updateObj.lastName,
      addressStreet: updateObj.addressStreet,
      addressCity: updateObj.addressCity,
      addressState: updateObj.addressState,
      addressZip: updateObj.addressZip,
      addressCountry: updateObj.addressCountry,
      phone: updateObj.phone,
      email: updateObj.email,
    })

  }

  function handleSubmit(e) {
    e.preventDefault();

    preValidate();

    if (Object.keys(formErrors).filter(key => formErrors[key] !== null).length > 0 || formData.phone.length < 5) {
      console.log('This is where the error is.')
      setOverlayModal({
        active: true,
        title: 'Oops!',
        message: 'Please provide required information in the proper format.'
      })
    } else {
      setLoading(true);
      submitFormData(formData);
    }

  }

  function submitFormData(dataObj) {
    setLoaderStatus(true);
    
    console.log(dataObj);

    let sendData = new FormData();
    Object.keys(dataObj).forEach(inputName => {
      let value = dataObj[inputName];
      if (inputName === "phone") {
        value = dataObj.phone.replace(/\D/g,'');
      }
      sendData.append(inputName, value);
    })

    fetch(API.newCustomer, { method: 'POST', body: sendData })
      .then(res => res.json())
      .then(json => {
        setLoaderStatus(false);
        setLoading(false);
        const data = json.message.data;
        if (data.preCheckId) {
          HandleCookie.set('preCheckId', data.preCheckId, 365);
          history.push(`/${storeId}/checkin/${data.preCheckId}`);
        } else {
          setOverlayModal({
            active: true,
            title: 'Oops!',
            message: `Something went wrong. Please try again.`
          })
        }
      })
      .catch(err => {
        setLoaderStatus(false);
        setLoading(false);
        setOverlayModal({
          active: true,
          title: 'Oops!',
          message: `Something went wrong (${err.message})`
        })
      })
  }

  function renderTextField(id, name, label, required=true) {

    if (formErrors[name]) {
      return (
        <TextField 
          id={id} 
          name={name}
          label={label}
          variant="standard" 
          onChange={handleChange} 
          onBlur={() => {formValidate(name, formData[name])}}
          value={formData[name]} 
          helperText={formErrors[name]}
          fullWidth required={required} error/>
      )
    } else {
      return (
        <TextField 
          id={id} 
          name={name}
          label={label}
          variant="standard" 
          onChange={handleChange} 
          onBlur={() => {formValidate(name, formData[name])}}
          value={formData[name]} 
          fullWidth required={required} />
      )
    }
  }

  const renderCountries = countryData.map(country => {
    const key = `CountrySelect-${country.code}`;
    return <MenuItem value={country.code} key={key}>{country.name}</MenuItem>
  })

  return (
    <Form onSubmit={handleSubmit}>
      <Notice color="yellow">
        ⓘ Local mandates <a href="https://www.hawaiinewsnow.com/2020/09/23/under-order-oahu-restaurants-will-have-keep-diners-contact-details-days/" target="_blank" rel="noreferrer">require restauraunts to collect contact information</a> from one member of each dining party. Please fill out the questionnaire below.
      </Notice>
      <Notice color="blue">
        Already did this? <Link to={`/${storeId}/checkin`}>Click here</Link> to check-in with your PreCheckID.
      </Notice>
      <FormInput>
        {renderTextField('first-name', 'firstName', 'First Name')}
      </FormInput>
      <FormInput>
        {renderTextField('last-name', 'lastName', 'Last Name')}
      </FormInput>
      <FormInput>
        {renderTextField('address-street', 'addressStreet', 'Residency Street Address (No PO Boxes)')}
      </FormInput>
      <FormInput>
        {renderTextField('address-city', 'addressCity', 'City')}
      </FormInput>
      <FormInput>
        {renderTextField('address-state', 'addressState', 'State / Province / Region')}
      </FormInput>
      <FormInput>
        {renderTextField('address-zip', 'addressZip', 'ZIP / Postal Code')}
      </FormInput>
      <FormInput>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="country-label">Country / Territory</InputLabel>
          <Select
            labelId="country-label"
            id="country-select"
            name="addressCountry"
            value={formData.addressCountry}
            label="Country / Territory"
            onChange={handleChange}
          >
            {renderCountries}
          </Select>
        </FormControl>
      </FormInput>
      <FormInput>
        <FormControl>
          {
            formErrors.phone ? 
            <MaterialUiPhoneNumber disableDropdown defaultCountry={'us'} onBlur={() => formValidate('phone', formData.phone)} onChange={handlePhoneChange} name="phone" value={formData.phone} fullWidth label="Phone Number" helperText="Provide a valid mobile number, we'll use this to text you a virtual waitlist ticket." required error />
            :
            <MaterialUiPhoneNumber disableDropdown defaultCountry={'us'} onBlur={() => formValidate('phone', formData.phone)} onChange={handlePhoneChange} name="phone" value={formData.phone} fullWidth label="Phone Number" helperText="Provide a valid mobile number, we'll use this to text you a virtual waitlist ticket." required />
          }
        </FormControl>
      </FormInput>
      <FormInput>
        {renderTextField('email', 'email', 'Email (Optional)', false)}
      </FormInput>
      <hr />
      <FormInput>
        <FormGroup>
          <FormControlLabel control={<Checkbox name="agreement" onChange={handleChange} value="agree" onClick={preValidate} required />} label="I agree that all information provided is true and accurate. I/we will not dine in if experiencing COVID-19 symptoms." />
          <FormControlLabel control={<Checkbox name="marketing" onChange={handleChange} value="agree" />} label="Send my reuseable PreCheck ID and updates from Genki Sushi to the email address provided." />
        </FormGroup>
      </FormInput>
      <hr />
      <LoadingButton variant="contained" disableElevation className="primaryBtn" loading={loading} type="submit">Next</LoadingButton>
      <p>
      By submitting this form, you are agreeing to our <a href="https://www.genkisushiusa.com/privacy" target="_blank" rel="noreferrer">privacy policy</a>.
      </p>
    </Form>
  )
}

export default ContactTracingForm;