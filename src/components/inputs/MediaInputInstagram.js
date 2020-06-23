import React, {useEffect}  from 'react';
import { Spinner } from 'reactstrap';
import { connect } from "react-redux";

import SocialImg from '../social-img/index';
import { GET_INSTAGRAM_DATA } from '../../store/types/instagramData'


const MediaInputInstagram = (props) => {
  const {
    inputSetUp,
    getInstagramData,
    instagramData,
    isLoading,
  } = props
  const { locationId } = inputSetUp

  useEffect(() => {
    getInstagramData(locationId);
  }, [getInstagramData, locationId])

  const handleClick = url => (e) => {
    inputSetUp.handleParamsChange(inputSetUp.name, `["${url}"]`)
    inputSetUp.setPreviewImage(url)
  }

  if (!instagramData.posts || isLoading) return <Spinner className='setup__spinner' color="dark" />

  const posts = instagramData.posts.map(post => post.mediaList[0])

  return <>
    <h4>{inputSetUp.title}</h4>
    <div dangerouslySetInnerHTML={{__html: inputSetUp.html}}></div>
    <SocialImg gallery={posts} handleClick={handleClick} />
  </>


}

const mapStateToProps = state => ({
  instagramData: state.instagram.instagramData,
  isLoading: state.instagram.isLoading,
})

const mapDispatchToProps = dispatch => ({
  getInstagramData: (locationId) => dispatch({ type: GET_INSTAGRAM_DATA , payload: {locationId }}),
})

export default connect(mapStateToProps, mapDispatchToProps)(MediaInputInstagram);