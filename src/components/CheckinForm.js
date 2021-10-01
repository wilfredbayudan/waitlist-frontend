import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import MaterialUiPhoneNumber from "material-ui-phone-number";
import Location from "../classes/Location";
import Card from "./Card";
import styled from "styled-components";
import LoadingButton from '@mui/lab/LoadingButton';
import API from "../data/API";
import WelcomeBack from "./WelcomeBack";
import HandleCookie from "../classes/HandleCookie";
import Notice from "./Notice";

const Form = styled.form`
  width: 100%;
  text-align: left;
`;

const FormInput = styled.div`
  margin-bottom: 8px;
`;

const ConsentNotice = styled.div`
  font-size: 0.9rem;
  margin-top: 20px;
  color: #1a1a1a;
`;

function CheckInForm({ preCheckParams, storeId, setCheckedIn, contactTracing, setLoaderStatus, setOverlayModal }) {

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [preCheckInput, setPreCheckInput] = useState(preCheckParams ? preCheckParams : '');
  const [preCheckError, setPreCheckError] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [retrievedId, setRetrievedId] = useState(false);
  const [disabledStatus, setDisabledStatus] = useState(Location.info(storeId).contactTracing ? true : false);
  const [additionalDetails, setAdditionalDetails] = useState({
    partySize: '',
    tableType: 'First Available',
    wheelchair: false,
    highchair: false
  })
  const [nameInput, setNameInput] = useState('');
  const [nameError, setNameError] = useState(false);

  function handleNameChange(e) {
    setNameInput(e.target.value);
  }

  function handleDetailsChange(e) {
    let value = e.target.value;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    setAdditionalDetails({
      ...additionalDetails,
      [e.target.name]: value
    })
  }

  useEffect(() => {
    if (nameInput.length > 0) {
      const regex = /^[a-zA-Z][a-zA-Z '‘]{4,45}$/
      if (!regex.test(nameInput)) {
        setNameError('Please enter a valid name. Special characters not allowed.')
      } else {
        setNameError(false)
      }
    }
  },[nameInput])

  function validatePhone(phone) {
    const regex = /^[0-9]{10,15}$/
    const result = regex.test(phone.replace(/\D/g,''));
    if (!result) {
      setPhoneError(true);
      return false;
    } else {
      setPhoneError(false)
      return true;
    }
  }

  useEffect(() => {
    if (phone !== '') {
      validatePhone(phone);
    }
  },[phone])

  useEffect(() => {

    if (preCheckInput.length === 6) {
      setLoaderStatus(true)
      const url = `${API.checkPrecheck}?pid=${preCheckInput}`;
      fetch(url)
        .then(res => res.json())
        .then(json => {
          if (json.length > 0) {
            setPhone(json[0].phone);
            setNameInput(json[0].name);
            setRetrievedId(json[0]);
            setPreCheckError(false);
            setPhoneError(false);
            setDisabledStatus(false)
          } else {
            setPreCheckError(true);
          }
          setLoaderStatus(false)
        })
        .catch(err => {
          setOverlayModal({
            active: true,
            title: "Oops",
            message: err.message
          })
          setLoaderStatus(false);
        })

    } else if (preCheckInput.length > 0) {
      setPreCheckError(true)
    }
    return (() => setLoaderStatus(false))
  }, [preCheckInput, setCheckedIn, setLoaderStatus, setOverlayModal])
  
  function handlePreCheckChange(e) {
    setPreCheckInput(e.target.value);
  }

  function handlePhoneChange(value) {
    setPhone(value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (disabledStatus) {
      return setOverlayModal({
        active: true,
        title: 'Oops!',
        message: 'Already trying to send data...'
      })
    }

    if (preCheckError || !validatePhone(phone) || nameError || parseInt(additionalDetails.partySize) < 1) {
      console.log(!validatePhone(phone), preCheckError, nameError);
      console.log('Error here');
      setOverlayModal({
        active: true,
        title: 'Oops!',
        message: 'Please provide the required information in the proper format to continue.'
      })
    } else {
      setLoaderStatus(true);
      setLoading(true);

      const sendPid = Location.info(storeId).contactTracing ? retrievedId.precheckid : 'NOTRAC';
      const sendName = Location.info(storeId).contactTracing ? retrievedId.name : nameInput;

      // Set Form Data
      const dataObj = {
        ...additionalDetails,
        preCheckId: sendPid,
        phone: phone.replace(/\D/g,''),
        storeId: storeId,
        wwid: Location.waitwhileId(storeId),
        name: sendName,
      }

      // Post Stuff
      handleCheckin(dataObj, sendPid);

    }
  }

  function handleCheckin(dataObj, preCheckId) {

    const sendDataObj = new FormData();
    Object.keys(dataObj).forEach(inputName => {
      sendDataObj.append(inputName, dataObj[inputName]);
    })

    // Check if still open before submitting
    Location.isOpen(storeId)
    .then(isOpen => {
      if (isOpen) {
        // Post checkin
        fetch(API.newCheckin, { method: 'POST', body: sendDataObj })
          .then(res => res.json())
          .then(json => {
            if (json.statusCode === 400) {
              setOverlayModal({
                active: true,
                title: json.error,
                message: json.message
              })

            }
            if (json[0].id) {
              if (Location.info(storeId).contactTracing) HandleCookie.set('preCheckId', preCheckId, 365);
              HandleCookie.set('customerId', json[0].customerId, 0.5);
              HandleCookie.set('locationId', json[0].locationId, 0.5);            
              setCheckedIn(json[0]);
              history.push(`/${storeId}/success/${json[0].customerId}`);
            } else {
              setOverlayModal({
                active: true,
                title: "Oops",
                message: "Something went wrong..."
              })
            }
            setLoading(false);
            setLoaderStatus(false);
          })
          .catch(err => {
            setLoaderStatus(false);
            setLoading(false);
          })

      } else {
        history.push(`/${storeId}`);
      }
    })
    .catch(err => history.push(`/${storeId}`))
  }

  const renderContactTracing = (
    <>
      <Notice color="yellow">
        ⓘ Local mandates now require dine-in customers to be fully vaccinated (2 weeks after final dose) or provide proof of a negative COVID-19 test result taken within 48 hours. Children under 12 are exempt. Please have your documentation ready.
        <a style={{ display: 'block '}} href="https://www.honolulu.gov/rep/site/may/may_docs/2109097-CCH_Proclamation_and_Emergency_Order_No._2021-13_certified_-_signed.pdf" target="_blank" rel="noreferrer">More Information</a>
      </Notice>
      <WelcomeBack userData={retrievedId} storeId={storeId} />
      <FormInput>
        <TextField 
          id="preCheckId" 
          name="preCheckId"
          label="PreCheck ID"
          variant="standard" 
          value={preCheckInput}
          inputProps={{ maxLength: '6'}}
          onChange={handlePreCheckChange}
          error={preCheckError ? true : false}
          helperText={preCheckError ? 'Invalid PreCheck ID' : ''}
          disabled={retrievedId ? true : false}
          fullWidth required
          />
      </FormInput>
    </>
  )

  const renderNameInput = (
    <FormInput>
    <TextField 
      id="customerName" 
      name="customerName"
      label="Name"
      variant="standard" 
      value={nameInput}
      inputProps={{ minLength: '5', maxLength: '32'}}
      onChange={handleNameChange}
      error={nameError ? true : false}
      helperText={nameError ? nameError : ''}
      fullWidth required
      />
  </FormInput>
  )

  return (
    <Card title="Check-In Details" fullWidth>
      <Form onSubmit={handleSubmit}>
        { contactTracing ? renderContactTracing : null }
        { !contactTracing ? renderNameInput : null }
        <FormInput>
          <FormControl fullWidth>
              <MaterialUiPhoneNumber 
                inputProps={{ minLength: '9' }} 
                onChange={handlePhoneChange} 
                value={phone} 
                disableDropdown 
                defaultCountry={'us'} 
                name="phone" 
                label="Confirm Phone Number" 
                helperText="Provide a valid mobile number, we'll use this to text you a virtual waitlist ticket." 
                error={phoneError ? true : false}
                required />
          </FormControl>
        </FormInput>
        <FormInput>
        <FormControl variant="standard" style={{minWidth: '50%'}}>
          <InputLabel id="tabletype-label">Table Preference</InputLabel>
          <Select
            labelId="tabletype-label"
            id="tabletype-select"
            value={additionalDetails.tableType}
            onChange={handleDetailsChange}
            name="tableType"
            label="Table Preference"
            required
          > 
            <MenuItem value="First Available">First Available</MenuItem>
            <MenuItem value="Booth">Booth</MenuItem>
            <MenuItem value="Counter">Counter</MenuItem>
          </Select>
        </FormControl>
        </FormInput>
        <FormInput>
        <FormControl variant="standard" style={{minWidth: 120}}>
          <InputLabel id="partysize-label">Party Size</InputLabel>
          <Select
            labelId="partysize-label"
            id="partysize-select"
            value={additionalDetails.partySize}
            onChange={handleDetailsChange}
            name="partySize"
            label="Party Size"
            required
          > <MenuItem value=""></MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="6">6</MenuItem>
            <MenuItem value="7">7</MenuItem>
            <MenuItem value="8">8</MenuItem>
            <MenuItem value="9">9</MenuItem>
            <MenuItem value="10">10</MenuItem>
          </Select>
        </FormControl>
        </FormInput>
        <FormInput>
          <FormGroup>
            <FormControlLabel control={<Checkbox name="wheelchair" onChange={handleDetailsChange} checked={additionalDetails.wheelchair} />} label="Wheelchair accessible" />
            <FormControlLabel control={<Checkbox name="highchair" onChange={handleDetailsChange} checked={additionalDetails.highchair} />} label="Need high chair" />
          </FormGroup>
        </FormInput>
        <hr />
        <LoadingButton variant="contained" disableElevation className="primaryBtn" loading={loading} type="submit" disabled={disabledStatus}>Check-In</LoadingButton>
      </Form>
      <ConsentNotice>
      By clicking 'Check-In' you agree to the <a href="https://waitwhile.com/privacy" target="_blank" rel="noreferrer" alt="Privacy Policy">Privacy Policy</a> and <a href="https://waitwhile.com/terms" alt="Terms of Use" target="_blank" rel="noreferrer">Terms of Use</a>.
      </ConsentNotice>
    </Card>
  )
}

export default CheckInForm;