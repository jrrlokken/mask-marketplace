import { useState, useEffect } from 'react'
import axios from 'axios';
import Link from 'next/link';
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react';

import catchErrors from '../utils/catchErrors';
import baseUrl from '../utils/baseUrl';
import { handleLogin } from '../utils/auth';

const INITIAL_USER = {
  email: ""
}

function Login() {
  const [user, setUser] = useState(INITIAL_USER);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el))
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user])

  function handleChange(event) {
    const { name, value } = event.target
    setUser(prevState => ({ ...prevState, [name]: value }));
  }

  // async function handleSubmit() {
  //   try {
  //     setLoading(true);
  //     setError('');
  //     const url = `${baseUrl}/api/login`;
  //     const payload = { ...user };
  //     const response = await axios.post(url, payload);
  //     handleLogin(response.data);
  //   } catch(error) {
  //     catchErrors(error, setError);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  function handleSubmit(event) {

    try {
      event.preventDefault();
      setLoading(true);
      setError('');
      const payload = { ...user }
      console.log(payload);
      setUser(INITIAL_USER);
      setSuccess(true);
    } catch(error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  return (<>
    <Message 
      attached
      icon="privacy"
      header="Password reset"
      content="Request a password reset here"
      color="blue"
    />
    <Form 
      error={Boolean(error)} 
      loading={loading} 
      success={success}
      onSubmit={handleSubmit}
      method='post'
    >
      <Message
        error
        header="Oops!"
        content={error}
      />
      <Message
          success
          icon="check"
          header="Success!"
          content="Check your email for a reset link."
        />
      <Segment>
        <Form.Input
          fluid
          icon="envelope"
          iconPosition="left"
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
        />
        <Button
          disabled={disabled || loading}
          icon="privacy"
          type="submit"
          color="orange"
          content="Request Reset"
        />
      </Segment>
    </Form>
    <Message attached="bottom" warning>
      <Icon name="help" />
      New user?{" "}
      <Link href="/signup">
        <a>Sign up here</a>
      </Link>{" "}instead.
    </Message>
  </>
  );
}

export default Login;

