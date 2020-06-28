import React, { useState, useEffect } from 'react'
import { Col, Row, Button, Form, FormGroup, Label, Spinner, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShopify } from "@fortawesome/free-brands-svg-icons"
import { connect } from "react-redux";
import axios from 'axios';

import { GET_USER } from '../../store/types/account'

import './index.scss';

const Panel = (props) => {
  const [status, setStatus] = useState('');
  const [shopName, setShopName] = useState('');
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

  useEffect(() => {
    if (user.auth.SHOPIFY && !user.conf.mediaConnectors[0].authorized) {
      openConnect('SHOPIFY')()
    }
  }, [user])

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

  const handleShopName = e => {
    const { value } = e.target
    setShopName(value)
  }

  const setAccountName = e => {
    axios.post('account/config', {
      ...user.conf,
      mediaConnectors: [
        {
          ...user.conf.mediaConnectors[0],
          account: shopName,
        },
        user.conf.mediaConnectors[1]

      ]
    }).then(resp => {
      getUser()
    })
  }

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

          {!user.auth.SHOPIFY && <Input className="shop-input" placeholder="Enter Shopify Shop Name" value={shopName} onChange={handleShopName} />}
          <Button active={shopify.authorized} block outline color='dark' className="buttons-three" onClick={setAccountName} disabled={shopify.authorized || !shopName}>
            <span><FontAwesomeIcon icon={faShopify} className="icons-three" /> </span>
            {shopify.authorized ? 'Connected' : 'Shopify Connect'}
          </Button>

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
