import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';


function Login() {
  const navigate = useNavigate();

  const [stateLogin, setStateLogin] = useState({
    username: "",
    password: "",
  });

  const [validated, setValidated] = useState(false);

  const cambioUsername = (e) => {
    setStateLogin({ ...stateLogin, username: e.target.value });
  };
  const cambioPassword = (e) => {
    setStateLogin({ ...stateLogin, password: e.target.value });
  };

  const enviarLogin = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      navigate('/pagina2');
    }
    setValidated(true);
  };

  return (
    <div
      className="flex flex-col"
      style={{
        minHeight: "100vh",
        backgroundImage: `url('https://images.unsplash.com/photo-1534289692684-c02577d5560d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card style={{ width: "18rem", opacity: 0.9 }}>
        <Card.Body>
          <Card.Title>
            <FormattedMessage id="app.login" defaultMessage="Internazionalizacion fallando" />
          </Card.Title>
          <Form noValidate validated={validated} onSubmit={enviarLogin}>
            <Form.Group className="mb-3" controlId="formLogin">
              <FormattedMessage id="app.email" defaultMessage="Internazionalizacion fallando" />
              <Form.Control
                required
                type="email"
                onChange={cambioUsername}
              />
              <Form.Control.Feedback type="invalid">
                <FormattedMessage id="app.emailWarning" defaultMessage="Internazionalizacion fallando" />
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <FormattedMessage id="app.password" defaultMessage="Internazionalizacion fallando" />
              <Form.Control
                required
                type="password"
                minLength={8}
                onChange={cambioPassword}
              />
              <Form.Control.Feedback type="invalid">
                <FormattedMessage id="app.passwordWarning" defaultMessage="Internazionalizacion fallando" />
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-start">
              <Button
                style={{ backgroundColor: "#0000ff", borderColor: "#0000ff" }}
                type="submit"
              >
                <FormattedMessage id="app.logButton" defaultMessage="Internazionalizacion fallando" />
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
