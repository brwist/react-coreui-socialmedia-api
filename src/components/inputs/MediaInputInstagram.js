import React, {useEffect, useState}  from 'react';
import { Spinner, Button, FormGroup, Label, Input, } from 'reactstrap';
import { connect } from "react-redux";
import axios from 'axios';
import Slider from "react-slick";

import SocialImg from '../social-img/index';
import { GET_INSTAGRAM_DATA } from '../../store/types/instagramData'
import { GET_USER } from '../../store/types/account'
import { GET_INSTAGRAM_ACCOUNTS } from '../../store/types/instagramAccounts'


const sliderSettings = {
  className: "slider variable-width",
  dots: false,
  slidesToShow: 6,
  infinite: false,
  slidesToScroll: 1,
  variableWidth: true,
  centerMode: false,
};

const MediaInputInstagram = (props) => {
  const {
    inputSetUp,
    getInstagramData,
    instagramData,
    isLoading,
    instagramAccounts,
    getUser,
    getInstagramAccounts,
    user
  } = props
  const { locationId } = inputSetUp

  const [ activeTab, setTab ] = useState('posts')
  const [ activeMedia, setMedia ] = useState([])
  const [ instagramConnectionStatus, setInstagramStatus ] = useState(false)
  const [showCollections, setCollectionsState] = useState(true)
  const [mediaItems, setMediaItems] = useState([])

  const handleTabChange = tab => e => {
    setTab(tab)
    setCollectionsState(true)
  }

  useEffect(() => {
    getUser()
  }, [getUser, instagramConnectionStatus])

  const instagramConnector = user.conf && user.conf.mediaConnectors.find(connector => connector.type === "INSTAGRAM")
  const instagramConnected = instagramConnector && instagramConnector.authorized

  useEffect(() => {
    if (instagramConnected && instagramConnector.account) {
      getInstagramData(locationId);
    }
  }, [getInstagramData, locationId, instagramConnector, instagramConnected])

  useEffect(() => {
    if (instagramConnected ) {
      getInstagramAccounts(locationId);
    }
  }, [getInstagramAccounts, locationId, instagramConnected])


  useEffect(() => {
    window.localStorage.setItem('s', false)
  }, [])

  const localStorageUpdated = () => {
    if (!localStorage.getItem('s')) {
      setInstagramStatus(false)
    } else {
      setInstagramStatus(true)
    }
  }

  useEffect(() => {
    window.addEventListener('storage', localStorageUpdated)
  }, [])

  const handleClick = url => (e) => {
    const newMedia = activeMedia.includes(url) ? activeMedia.filter(media => media !== url) : [...activeMedia, url]
    inputSetUp.handleParamsChange(inputSetUp.name, `["${newMedia.join('","')}"]`)
    inputSetUp.setPreviewImage(newMedia)
    setMedia(newMedia)
  }

  const instagramAccountsList = Object.keys(instagramAccounts).map(account => ({
    id: instagramAccounts[account],
    name: account
  }))

  const handleAccountChange = (e) => {
    axios.post('account/config', {
      ...user.conf,
      mediaConnectors: [
        user.conf.mediaConnectors[0],
        {
          ...user.conf.mediaConnectors[1],
          name: e.target.value,
          account: instagramAccounts[e.target.value]
        }
      ]
    }).then(resp => {
      getUser()
    })
  }

  const inputTitle = <div>
    <h4>{inputSetUp.title}</h4>
    <div dangerouslySetInnerHTML={{__html: inputSetUp.html}}></div>
  </div>

  const handleCollectionsChange = (e) => {
    setCollectionsState(!showCollections)
  }

  const handleSelectCollection = collectionItems => e => {
    setMediaItems(collectionItems.map(({url}) => url))
    handleCollectionsChange()
  }

  if (instagramAccountsList.length && !instagramConnector.account) return <div>
    {inputTitle}
    <FormGroup>
      <Label for="exampleSelect">Select Instagram Account</Label>
      <Input type="select" name="select" id="InstagramSelect" onChange={handleAccountChange}>
          <option value="" key='none' selected disabled>None</option>
          {instagramAccountsList.map(account => {
            return <option value={account.name} key={account.id}>{account.name}</option>
          })}
      </Input>
    </FormGroup>
  </div>

  if (!instagramData.posts || isLoading) return <Spinner className='setup__spinner' color="dark" />

  const collections = instagramData[activeTab]

  return <>
    {inputTitle}
    {!!activeMedia.length && <div>
      <h4>Selected Media</h4>
      <div className="media-preview">
        <Slider {...sliderSettings}>
          {activeMedia.map(media => {
            const videoLink = media.indexOf('.mp4') !== -1
            return  media && <div key={media} style={{width: 50}} className="media-holder" onClick={handleClick(media)}>{!videoLink
            ? <img  src={media} alt='phone'/>
            : <video autoplay>
              <source src={media} type="video/mp4" />
                Your browser does not support the video tag.
            </video>}
          </div>
          })}
        </Slider>
      </div>
    </div>}
    <div>
      <p>
        <Button active={activeTab === 'posts'} outline color='dark' className="buttons-three" onClick={handleTabChange('posts')}>
          Posts
        </Button>{' '}
        <Button active={activeTab === 'stories'} outline color='dark' className="buttons-three" onClick={handleTabChange('stories')}>
          Stories
        </Button>
      </p>
      { showCollections
      ? <div className="flex-container">
        {collections.map(collection => {
          const videoLink = collection.thumbnail.url.indexOf('.mp4') !== -1
          return <span className="boxItem" onClick={handleSelectCollection(collection.items)}>
          {collection.thumbnail.url && (!videoLink
            ? <img src={collection.thumbnail.url} alt={collection.thumbnail.title} width="100%"/>
            : <video className='image-preview' autoplay width="100%">
              <source src={collection.thumbnail.url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
          )}
          <span>{collection.title}</span>
        </span>})}
      </div>
      : <div>

      <div style={{cursor: 'pointer'}} className="products-header" onClick={handleCollectionsChange}>
        <div>← Back to <span style={{textTransform: 'capitalize'}}>{activeTab}</span></div>
      </div>
      <SocialImg activeMedia={activeMedia} gallery={mediaItems} handleClick={handleClick} />
    </div>
    }
    </div>
  </>
}

const mapStateToProps = state => ({
  instagramData: state.instagram.instagramData,
  instagramAccounts: state.instagramAccounts.accounts,
  isLoading: state.instagram.isLoading || state.instagramAccounts.isLoading || state.account.isLoading,
  user: state.account.user,
})

const mapDispatchToProps = dispatch => ({
  getInstagramData: (locationId) => dispatch({ type: GET_INSTAGRAM_DATA , payload: {locationId }}),
  getInstagramAccounts: (locationId) => dispatch({ type: GET_INSTAGRAM_ACCOUNTS , payload: {locationId }}),
  getUser: () => dispatch({ type: GET_USER }),
})

export default connect(mapStateToProps, mapDispatchToProps)(MediaInputInstagram);