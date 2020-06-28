import React, {useEffect, useState}  from 'react';
import { Spinner, Button, Input } from 'reactstrap';
import { connect } from "react-redux";
import axios from "axios";

import SocialImg from '../social-img/index';
import { GET_SHOPIFY_DATA } from '../../store/types/shopifyData'
import { GET_USER } from '../../store/types/account'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShopify } from "@fortawesome/free-brands-svg-icons"


const MediaInputShopify = (props) => {
  const {
    inputSetUp,
    getShopifyData,
    shopifyData,
    isLoading,
    getUser,
    user
  } = props
  const { locationId } = inputSetUp

  const [ activeMedia, setMedia ] = useState('')
  const [ shopifyConnectionStatus, setShopifyStatus ] = useState(false)
  const [shopName, setShopName] = useState('')

  useEffect(() => {
    window.localStorage.setItem('s', false)
  }, [])

  const localStorageUpdated = () => {
    if (!localStorage.getItem('s')) {
      setShopifyStatus(false)
    } else {
      setShopifyStatus(true)
    }
  }

  useEffect(() => {
    window.addEventListener('storage', localStorageUpdated)
  }, [])

  useEffect(() => {
    const shopify = user.conf && user.conf.mediaConnectors[0]
    if(shopify && shopify.authorized && shopify.account)
    getShopifyData(locationId);
  }, [getShopifyData, locationId, user])

  useEffect(() => {
    getUser()
  }, [getUser, shopifyConnectionStatus])

  const handleClick = url => (e) => {
    inputSetUp.handleParamsChange(inputSetUp.name, `["${url}"]`)
    inputSetUp.setPreviewImage(url)
    setMedia(url)
  }

  useEffect(() => {
    if (user.auth && user.auth.SHOPIFY && !user.conf.mediaConnectors[0].authorized) {
      openShopifyConnect('SHOPIFY')
    }
  }, [user])

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

  const handleShopName = e => {
    const { value } = e.target
    setShopName(value)
  }

  const openShopifyConnect = () => {
    const [authLink, encodedState] = user.auth.SHOPIFY.split('state=')
    const stateParams = JSON.parse(decodeURIComponent(encodedState))
    stateParams['r'] = window.location.origin+'/connection-status'
    window.open(authLink+'state='+encodeURI(JSON.stringify(stateParams)),
       'instagramConnect',
       'width=600,height=650');
  }

  const inputTitle = <div>
    <h4>{inputSetUp.title}</h4>
    <div dangerouslySetInnerHTML={{__html: inputSetUp.html}}></div>
  </div>

  const shopifyConnected = user.conf && user.conf.mediaConnectors.find(connector => connector.type === "SHOPIFY").authorized

  if (!shopifyConnected && user.auth) return <div>
    {inputTitle}
    {!user.auth.SHOPIFY && <p><Input className="shop-input" placeholder="Enter Shopify Shop Name" value={shopName} onChange={handleShopName} /></p>}
    <Button active={shopifyConnected} block outline color='dark' className="buttons-three" onClick={setAccountName} disabled={shopifyConnected || !shopName}>
      <span><FontAwesomeIcon icon={faShopify} className="icons-three" /> </span>
      Shopify Connect
    </Button>
  </div>

  if (!shopifyData.length || isLoading) return <Spinner className='setup__spinner' color="dark" />


  const mediaList = shopifyData.reduce((mediaList, product) => {
    return [...mediaList, ...product.items.map(item => item.url)]
  }, [])



  return <>
    {inputTitle}
    <SocialImg activeMedia={activeMedia} gallery={mediaList} handleClick={handleClick} />
  </>
}

const mapStateToProps = state => ({
  shopifyData: state.shopify.shopifyData,
  isLoading: state.shopify.isLoading,
  user: state.account.user,
})

const mapDispatchToProps = dispatch => ({
  getShopifyData: (locationId) => dispatch({ type: GET_SHOPIFY_DATA , payload: {locationId }}),
  getUser: () => dispatch({ type: GET_USER }),
})

export default connect(mapStateToProps, mapDispatchToProps)(MediaInputShopify);