import React, { Component } from 'react';
import {
  Button, Card, CardBody, Col,
  Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row
} from 'reactstrap';

import logo from '../../assets/logo.png';
import './index.scss'

class Login extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl='6'>
              <Card className='login__card'>
                <CardBody>
                  <Form>
                    <Row className="justify-content-center">
                      <Col className="login__info" xs="11">
                        <img className='login__logo' alt='logo' src={logo} />
                        <h1 className='login__title'>Welcome to Lightbox</h1>
                        <p className='login__text'>
                          The simplest solution for stores to bring digital
                          interactive content into their existing brick and mortar environments.
                        </p>
                      </Col>
                    </Row>
                    <Row className="justify-content-center">
                      <Col xs="9">
                        <InputGroup>
                          <Input className="login__input" type="email" id="username2" name="username2" placeholder="Email" autoComplete="name" />

                          <InputGroupAddon addonType="append">
                            <InputGroupText className='login__input-img'><i className="fa fa-envelope"></i></InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                        <InputGroup style={{ marginTop: '10px' }}>
                          <Input className="login__input" type="password" id="email2" name="email2" placeholder="Password" autoComplete="username" />
                          <InputGroupAddon addonType="append">
                            <InputGroupText className='login__input-img'>
                              <img className='password-icon' alt='password' src={require('../../assets/lock.svg')} />
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                        <Button className='login__button' color="dark" size="lg" block>Login</Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;