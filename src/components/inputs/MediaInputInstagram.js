import React, {useEffect, useState}  from 'react';
import { Spinner, Button } from 'reactstrap';
import { connect } from "react-redux";

import SocialImg from '../social-img/index';
import { GET_INSTAGRAM_DATA } from '../../store/types/instagramData'
import { GET_USER } from '../../store/types/account'


const MediaInputInstagram = (props) => {
  const {
    inputSetUp,
    getInstagramData,
    instagramData,
    isLoading,
    getUser,
    user
  } = props
  const { locationId } = inputSetUp

  const [ activeTab, setTab ] = useState('posts')
  const [ activeMedia, setMedia ] = useState('')

  const handleTabChange = tab => e => {
    setTab(tab)
  }

  useEffect(() => {
    getInstagramData(locationId);
  }, [getInstagramData, locationId])

  useEffect(() => {
    getUser()
  }, [getUser])

  const handleClick = url => (e) => {
    inputSetUp.handleParamsChange(inputSetUp.name, `["${url}"]`)
    inputSetUp.setPreviewImage(url)
    setMedia(url)
  }

  if (!instagramData.posts || isLoading) return <Spinner className='setup__spinner' color="dark" />

  const posts = instagramData.posts.reduce((mediaList, post) => {
    return [...mediaList, ...post.items.map(item => item.url)]
  }, [])
  const stories = instagramData.stories.reduce((mediaList, story) => {
    return [...mediaList, ...story.items.map(item => item.url)]
  }, [])

  const instagramConnected = user.conf.mediaConnectors.find(connector => connector.type === "INSTAGRAM").authorized

  return <>
    <h4>{inputSetUp.title}</h4>
    <div dangerouslySetInnerHTML={{__html: inputSetUp.html}}></div>
    { instagramConnected
      ? <div>
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
      : <a href={user.auth.INSTAGRAM} target="_blank" rel="noopener noreferrer">
        <Button outline block color='dark' className="buttons-three">
          <span><i className="fa fa-instagram icons-three" />
            Instagram
          </span>
        </Button>
      </a>
    }
  </>
}

const mapStateToProps = state => ({
  instagramData: state.instagram.instagramData,
  isLoading: state.instagram.isLoading,
  user: state.account.user,
})

const mapDispatchToProps = dispatch => ({
  getInstagramData: (locationId) => dispatch({ type: GET_INSTAGRAM_DATA , payload: {locationId }}),
  getUser: () => dispatch({ type: GET_USER }),
})

export default connect(mapStateToProps, mapDispatchToProps)(MediaInputInstagram);