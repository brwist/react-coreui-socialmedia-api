import React, {useEffect, useState}  from 'react';
import { Spinner, Button, Input } from 'reactstrap';
import { connect } from "react-redux";
import axios from "axios";

import SocialImg from '../social-img/index';
import { GET_SHOPIFY_DATA } from '../../store/types/shopifyData'
import { GET_SHOPIFY_PRODUCTS } from '../../store/types/shopifyProducts'
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
    getShopifyProducts,
    shopifyProducts,
    user
  } = props
  const { locationId } = inputSetUp

  const [ activeMedia, setMedia ] = useState([])
  const [ shopifyConnectionStatus, setShopifyStatus ] = useState(false)
  const [shopName, setShopName] = useState('')
  const [showCollections, setCollectionsState] = useState(true)

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
    const newMedia = activeMedia.includes(url) ? activeMedia.filter(media => media !== url) : [...activeMedia, url]
    inputSetUp.handleParamsChange(inputSetUp.name, `["${newMedia.join('","')}"]`)
    inputSetUp.setPreviewImage(newMedia)
    setMedia(newMedia)

  }

  const handleCollectionsChange = (e) => {
    setCollectionsState(!showCollections)
  }

  const selectProduct = (collectionId) => (e) => {
    getShopifyProducts(locationId, collectionId)
    handleCollectionsChange()
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
    <h4>Selection a collection</h4>
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


  const mediaList = shopifyProducts && shopifyProducts.reduce((mediaList, product) => {
    return [...mediaList, ...product.items.map(item => item.url)]
  }, [])



  return <>
    {inputTitle}
    {!!activeMedia.length && <div>
      <h4>Selected Media</h4>
      <div className="media-preview">
        {activeMedia.map(media => {
        const videoLink = media.indexOf('.mp4') !== -1
        return  media && <div className="media-holder" onClick={handleClick(media)}>{!videoLink
        ? <img  src={media} alt='phone'/>
        : <video autoplay>
          <source src={media} type="video/mp4" />
            Your browser does not support the video tag.
        </video>}
      </div>
      })}
      </div>
    </div>}

    { showCollections
      ? <div className="flex-container">
        {shopifyData.map(collection => <span className="boxItem" onClick={selectProduct(collection.id)}>{collection.title}</span>)}
      </div>
      : <div>

      <div style={{cursor: 'pointer'}} className="products-header" onClick={handleCollectionsChange}>
        <div>← Back to collections</div>
      </div>
      <SocialImg activeMedia={activeMedia} gallery={mediaList} handleClick={handleClick} />
    </div>
    }
  </>
}

const mapStateToProps = state => ({
  shopifyData: state.shopify.shopifyData,
  shopifyProducts: state.shopifyProducts.shopifyProducts,
  isLoading: state.shopify.isLoading || state.shopifyProducts.isLoading,
  user: state.account.user,
})

const mapDispatchToProps = dispatch => ({
  getShopifyData: (locationId) => dispatch({ type: GET_SHOPIFY_DATA , payload: {locationId }}),
  getShopifyProducts: (locationId, collectionId) => dispatch({ type: GET_SHOPIFY_PRODUCTS , payload: {locationId, collectionId }}),
  getUser: () => dispatch({ type: GET_USER }),
})

export default connect(mapStateToProps, mapDispatchToProps)(MediaInputShopify);