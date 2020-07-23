import React, { useState, useEffect } from 'react'
import { Col, Row, Button, Form, FormGroup, Label, Spinner, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShopify } from "@fortawesome/free-brands-svg-icons"
import { connect } from "react-redux";
import axios from 'axios';

import { GET_INSTAGRAM_ACCOUNTS } from '../../store/types/instagramAccounts'


import { GET_USER } from '../../store/types/account'

import './index.scss';

const Panel = (props) => {
  const [status, setStatus] = useState('');
  const [shopName, setShopName] = useState(props.user.conf ? props.user.conf.mediaConnectors[0].account : '');
  const [instagramId, setInstagramId] = useState(props.user.conf ? props.user.conf.mediaConnectors[1].account : '');
  const {
    user,
    getUser,
    userLocation: {
      id: locationId,
    },
    getInstagramAccounts,
    instagramAccounts,
    } = props

  const shopifyShopName = props.user.conf && props.user.conf.mediaConnectors[0].account
  const isNewShopName = shopName !== shopifyShopName

  const instagramConnector = user.conf && user.conf.mediaConnectors.find(connector => connector.type === "INSTAGRAM")
  const instagramConnected = instagramConnector && instagramConnector.authorized

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

  const changeInstagramAccount = (e) => {
    setInstagramId(e.target.value)
  }

  useEffect(() => {
    window.addEventListener('storage', localStorageUpdated)
  }, [])

  useEffect(() => {
    if (instagramConnected ) {
      getInstagramAccounts(locationId);
    }
  }, [getInstagramAccounts, locationId, instagramConnected])

  const handleShopName = e => {
    const { value } = e.target
    setShopName(value)
  }

  const instagramAccountsList = instagramAccounts && Object.keys(instagramAccounts).map(account => ({
    id: instagramAccounts[account],
    name: account
  }))

  const setAccountName = e => {
    const popUpWindow = window.open('/',
       'instagramConnect',
       'width=600,height=650')
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
      axios.get('account/config').then(resp => {
        openConnect('SHOPIFY', resp.data.auth.SHOPIFY, popUpWindow)()
      })
    })
  }

  const handleInstagramAccountChange = (e) => {
    axios.post('account/config', {
      ...user.conf,
      mediaConnectors: [
        user.conf.mediaConnectors[0],
        {
          ...user.conf.mediaConnectors[1],
          name: e.target.value,
          account: instagramId
        }
      ]
    }).then(resp => {
      getUser()
    })
  }

  const openConnect = (account, link='', popUpWindow=null) => e => {
    const authorizationLink = link || user.auth[account]
    const [authLink, encodedState] = authorizationLink.split('state=')
    const stateParams = JSON.parse(decodeURIComponent(encodedState))
    stateParams['r'] = window.location.origin+'/connection-status'
    const socialAuthLink =  authLink+'state='+encodeURI(JSON.stringify(stateParams))
    if (popUpWindow) {
      popUpWindow.location = socialAuthLink
    } else {
      window.open(socialAuthLink,
       'instagramConnect',
       'width=600,height=650');
    }
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

          {!instagram.authorized && user.auth.INSTAGRAM && <Button active={instagram.authorized} outline block color='dark' className="buttons-three" onClick={openConnect('INSTAGRAM')}>
            <span><i className="fa fa-instagram icons-three" />
              {instagram.authorized ? 'Connected' : 'Instagram Connect'}
            </span>
          </Button>}
          {!!instagramAccountsList.length && instagram.authorized && user.auth.INSTAGRAM && <div class="shopify-form ">
            <FormGroup>
              <Label for="exampleSelect">Select Instagram Account</Label>
              <Input type="select" value={instagramId} name="select" id="InstagramSelect" onChange={changeInstagramAccount}>
                  <option value="" key='none' disabled >None</option>
                  {instagramAccountsList && instagramAccountsList.map(account => {
                    return <option value={account.name} key={account.id}>{account.name}</option>
                  })}
              </Input>
            </FormGroup>
            {instagramId !== instagramConnector.account || !instagramId ? <Button disabled={!instagramId} outline block color='dark' className="buttons-three" onClick={handleInstagramAccountChange}>
              <span><i className="fa fa-instagram icons-three" />
                Save
              </span>
            </Button> : <Button active={instagram.authorized} outline block color='dark' className="buttons-three" onClick={openConnect('INSTAGRAM')}>
              <span><i className="fa fa-instagram icons-three" />
                {instagram.authorized ? 'Connected' : 'Instagram Connect'}
              </span>
            </Button>
            }
          </div>}

          <div class="shopify-form ">
            <FormGroup>
              <Label for="shop-name">Shop Name</Label>
              <Input className="shop-input" placeholder="Shop Name" value={shopName} onChange={handleShopName} name="shop-name" id="shop-name" />
            </FormGroup>
            <Button active={shopify.authorized} block outline color='dark' className="buttons-three" onClick={setAccountName} disabled={!shopName}>
              <span><FontAwesomeIcon icon={faShopify} className="icons-three" /> </span>
              {shopify.authorized && !isNewShopName ? 'Connected' : 'Shopify Connect'}
            </Button>
          </div>

        </FormGroup>
      </Form>
    </div>
  )
}

const mapStateToProps = state => ({
  isLoading: state.account.isLoading,
  user: state.account.user,
  instagramAccounts: state.instagramAccounts.accounts,
  userLocation: state.user.userLocation,
})

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch({ type: GET_USER }),
  getInstagramAccounts: (locationId) => dispatch({ type: GET_INSTAGRAM_ACCOUNTS , payload: {locationId }}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
