import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "../Card";
import TextField from '@mui/material/TextField';
import styled from "styled-components";
import LoadingButton from '@mui/lab/LoadingButton';

const FormInput = styled.div`
  margin-bottom: 8px;
`;
const Form = styled.form`
  width: 100%;
  text-align: left;
`;

function Login({ setOverlayModal, setIsAdmin }) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [loginInput, setLoginInput] = useState({
    username: '',
    password: ''
  });

  // Simple auth using JSON Server
  function authUser(credentials) {
    fetch(`${process.env.REACT_APP_JSON_API}/users`)
      .then(res => res.json())
      .then(json => {
        const user = json.find(user => user.username === credentials.username && user.password === credentials.password);
        setLoading(false);
        if (user) {
          setIsAdmin(user);
          setOverlayModal({
            active: true,
            title: "Logged in!",
            message: `Nice to see you again, ${user.username}!`
          })
          history.push(`/admin`)
        } else {
          setOverlayModal({
            active: true,
            title: "Oops!",
            message: `Invalid username/password.`
          })
          setLoginInput({
            ...loginInput,
            password: ''
          })
        }
      })
      .catch(err => console.log(err))
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    authUser(loginInput);
  }

  function handleInputchange(e) {
    setLoginInput({
      ...loginInput,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Card title="Admin Login">
      <Form onSubmit={handleSubmit}>
        <FormInput>
          <TextField
            id="username"
            name="username"
            label="Username"
            onChange={handleInputchange}
            value={loginInput.username}
            fullWidth
          />
        </FormInput>
        <FormInput>
          <TextField
            name="password"
            id="password"
            label="Password"
            type="password"
            onChange={handleInputchange}
            value={loginInput.password}
            fullWidth
          />
        </FormInput>
        <FormInput>
          <LoadingButton variant="contained" disableElevation className="primaryBtn" loading={loading} type="submit">Login</LoadingButton>
        </FormInput>
      </Form>
    </Card>
  )
}

export default Login;