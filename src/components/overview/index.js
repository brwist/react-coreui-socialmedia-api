import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import TimezonePicker from 'react-bootstrap-timezone-picker';
import * as types from '../../store/types/account'
import { cdnURL } from '../../config/endpoints';

import './index.scss';

class Overview extends React.Component {
  state = {
    user: {},
    name: '',
    tz: '',
    email: '',
    file: '',
    fileName: '',
    isSend: false,
  }

  componentDidMount() {
    this.setState(prevProps => ({
      user: this.props.user,
      name: this.props.user.name,
      tz: this.props.user.tz,
      file: this.props.user.logo,
      fileName: this.props.user.logo.name,
    }))
  }

  componentDidUpdate(prevProps) {
  if (prevProps.user.logo.name !== this.props.user.logo.name) {
      this.setState({
        fileName: this.props.user.logo.name
      })
    }
  }

  handleChange = (tz) => this.setState({ tz })

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  fileChange = e => {
    e.preventDefault();

    this.setState({
      file: e.target.files[0]
    })
  }

  onSubmit = e => {
    const { name, tz, file, user } = this.state;

    e.preventDefault();

    user.name = name;
    user.tz = tz;

    if (user.logo.name) {
      user.logo.name = file?.name;
    }

    if (file.size) {
      user.logo.sizeMB = (file?.size / (1024 * 1024)).toFixed(2);
    }

    this.props.changeUser(user);

    this.setState({
      file: '',
      email: '',
      isSend: true
    })

    setTimeout(() => {
      this.props.getUser()
      this.setState({
        isSend: false
      })
    }, 2000)
  }

  render() {
    const { name, tz, isSend, fileName } = this.state;

    return (
      <div className='overview'>
        <h2>Account overview</h2>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            Upload Brand Logo
            <div className="flex-wrapper">
              {fileName && <div className="icon" style={{backgroundImage: `url(${cdnURL+fileName})`}}>
              </div>}
              <Input onChange={this.fileChange} type="file" name="" id="" />
            </div>
          </FormGroup>

          <FormGroup>
            <Label for="exampleAddress2">Brand Name</Label>
            <Input onChange={this.onChange} name='name' value={name} type="text" id="exampleAddress2" placeholder="Enter your brand name"></Input>
          </FormGroup>

          <FormGroup className='setup-profile__form-group'>
            <Label className='setup-profile__label' htmlFor="inst">Selected Time Zone</Label>
            <TimezonePicker
              absolute={false}
              value={tz || 'Europe/Dublin'}
              placeholder="Select timezone..."
              onChange={this.handleChange}
            />
          </FormGroup>

          {/* <FormGroup>
            <Label for="exampleEmail">Reset Password</Label>
            <Input onChange={this.onChange} value={email} type="email" name="email" id="exampleEmail" placeholder="Enter your email address" />
          </FormGroup> */}

          <div className='overview__wrapper-btn'>
            <Button
              onClick={() => window.location.href = 'https://lightboxlive.auth.us-west-2.amazoncognito.com/forgotPassword?response_type=code&client_id=5nbhcblr12745g4c9lmrg4nhr3&redirect_uri=https://api-dev.lightboxlive.com/aws/auth/login'}
              className="btn_overview btn-reset"
            >
              Reset Password
            </Button>
            <Button type='Submit' className="btn_overview">Save</Button>
          </div>
          {isSend &&
            <Alert style={{ marginTop: '70px', textAlign: 'center' }} color="success">
              Accofunt Overview is a success update!
            </Alert>
          }
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    user: state.account.user.conf,
  })
}

const mapDispatchToProps = dispatch => ({
  changeUser: user => dispatch({ type: types.CHANGE_USER, user }),
  getUser: () => dispatch({ type: types.GET_USER }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Overview)