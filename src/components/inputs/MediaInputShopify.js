import React, {useEffect, useState}  from 'react';
import { Spinner, Button } from 'reactstrap';
import { connect } from "react-redux";

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

  useEffect(() => {
    getShopifyData(locationId);
  }, [getShopifyData, locationId])

  useEffect(() => {
    getUser()
  }, [getUser])

  const handleClick = url => (e) => {
    inputSetUp.handleParamsChange(inputSetUp.name, `["${url}"]`)
    inputSetUp.setPreviewImage(url)
    setMedia(url)
  }

  if (!shopifyData.length || isLoading) return <Spinner className='setup__spinner' color="dark" />


  const mediaList = shopifyData.reduce((mediaList, product) => {
    return [...mediaList, ...product.items.map(item => item.url)]
  }, [])

  const shopifyConnected = user.conf.mediaConnectors.find(connector => connector.type === "SHOPIFY").authorized

  return <>
    <h4>{inputSetUp.title}</h4>
    <div dangerouslySetInnerHTML={{__html: inputSetUp.html}}></div>
    { shopifyConnected
      ? <SocialImg activeMedia={activeMedia} gallery={mediaList} handleClick={handleClick} />
      : <a href={user.auth.SHOPIFY} target="_blank" rel="noopener noreferrer">
        <Button outline block color='dark' className="buttons-three">
          <span><FontAwesomeIcon icon={faShopify} className="icons-three" /> </span>
          <span>Shopify</span>
        </Button>
      </a>
    }
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