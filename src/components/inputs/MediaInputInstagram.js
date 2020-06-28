import React, {useEffect, useState}  from 'react';
import { Spinner, Button, FormGroup, Label, Input, } from 'reactstrap';
import { connect } from "react-redux";
import axios from 'axios';

import SocialImg from '../social-img/index';
import { GET_INSTAGRAM_DATA } from '../../store/types/instagramData'
import { GET_USER } from '../../store/types/account'
import { GET_INSTAGRAM_ACCOUNTS } from '../../store/types/instagramAccounts'


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
  const [ activeMedia, setMedia ] = useState('')
  const [ instagramConnectionStatus, setInstagramStatus ] = useState(false)

  const handleTabChange = tab => e => {
    setTab(tab)
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
    if (instagramConnected && !instagramConnector.account) {
      getInstagramAccounts(locationId);
    }
  }, [getInstagramAccounts, locationId, instagramConnector, instagramConnected])


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
    inputSetUp.handleParamsChange(inputSetUp.name, `["${url}"]`)
    inputSetUp.setPreviewImage(url)
    setMedia(url)
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

  const inputTitle = () => (
    <div>
      <h4>{inputSetUp.title}</h4>
      <div dangerouslySetInnerHTML={{__html: inputSetUp.html}}></div>
    </div>
  )

  const openIntagramConnect = () => {
    const [authLink, encodedState] = user.auth.INSTAGRAM.split('state=')
    const stateParams = JSON.parse(decodeURIComponent(encodedState))
    stateParams['r'] = window.location.origin+'/connection-status'
    window.open(authLink+'state='+encodeURI(JSON.stringify(stateParams)),
       'instagramConnect',
       'width=600,height=650');
  }

  if (!instagramConnected && user.auth) return <div>
    {inputTitle}
    <Button outline block color='dark' className="buttons-three" onClick={openIntagramConnect}>
      <span><i className="fa fa-instagram icons-three" />
        Connect Instagram
      </span>
    </Button>
  </div>

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

  const posts = instagramData.posts.reduce((mediaList, post) => {
    return [...mediaList, ...post.items.map(item => item.url)]
  }, [])
  const stories = instagramData.stories.reduce((mediaList, story) => {
    return [...mediaList, ...story.items.map(item => item.url)]
  }, [])

  return <>
    {inputTitle}
    <div>
      <p>
        <Button active={activeTab === 'posts'} outline color='dark' className="buttons-three" onClick={handleTabChange('posts')}>
          Posts
        </Button>{' '}
        <Button active={activeTab === 'stories'} outline color='dark' className="buttons-three" onClick={handleTabChange('stories')}>
          Stories
        </Button>
      </p>
      <SocialImg activeMedia={activeMedia} gallery={activeTab === 'posts' ? posts : stories} handleClick={handleClick} />
    </div>
    }
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