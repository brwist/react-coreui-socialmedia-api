import React, { useState, useEffect } from 'react'
import { Col, Row, Button, Form, FormGroup, Label, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShopify } from "@fortawesome/free-brands-svg-icons"
import { connect } from "react-redux";

import { GET_USER } from '../../store/types/account'

import './index.scss';

const Panel = (props) => {
  const [status, setStatus] = useState('');
  const {
    user,
    getUser
    } = props

  useEffect(() => {
    getUser()
  }, [getUser, status])

  useEffect(() => {
    window.localStorage.setItem('s', false)
  }, [])

  const localStorageUpdated = () => {
    if (!localStorage.getItem('s')) {
      setStatus(false)
    } else {
      setStatus(true)
    }
  }

  useEffect(() => {
    window.addEventListener('storage', localStorageUpdated)
  }, [])

  const openConnect = account => e => {
    const [authLink, encodedState] = user.auth[account].split('state=')
    const stateParams = JSON.parse(decodeURIComponent(encodedState))
    stateParams['r'] = window.location.origin+'/connection-status'
    window.open(authLink+'state='+encodeURI(JSON.stringify(stateParams)),
       'instagramConnect',
       'width=600,height=650');
  }
  if (!user.conf) return <Spinner className='setup__spinner' color="dark" />

  const [shopify, instagram] = user.conf.mediaConnectors



  return (
    <div className='panelSetup'>

      <Form>
        <Row>
          <Col className="d-flex justify-content-center" col={2}>
            <Label className="panelSetup__accountSetup"><span>Account Setup</span></Label>
          </Col>
        </Row>
        <FormGroup className="form2">

          <h2>Media Connectors</h2>

          {user.auth.INSTAGRAM && <Button active={instagram.authorized} outline block color='dark' className="buttons-three" onClick={openConnect('INSTAGRAM')} disabled={instagram.authorized}>
            <span><i className="fa fa-instagram icons-three" />
              {instagram.authorized ? 'Connected' : 'Instagram Connect'}
            </span>
          </Button>}

          {user.auth.SHOPIFY && <Button active={shopify.authorized} block outline color='dark' className="buttons-three" onClick={openConnect('SHOPIFY')} disabled={shopify.authorized}>
            <span><FontAwesomeIcon icon={faShopify} className="icons-three" /> </span>
            {instagram.authorized ? 'Connected' : 'Shopify Connect'}
          </Button>}

        </FormGroup>
      </Form>
    </div>
  )
}

const mapStateToProps = state => ({
  isLoading: state.account.isLoading,
  user: state.account.user,
})

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch({ type: GET_USER }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
