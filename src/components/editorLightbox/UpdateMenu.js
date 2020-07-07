import React, { useState } from 'react';
import { connect } from "react-redux";

import axios  from 'axios';
import { Button, Col, FormGroup, Input } from 'reactstrap';

import { GET_STORIES } from '../../store/types/stories'



function UpdateMenu(props) {
  const {
    handleBack,
    userLocation: {
      id
    },
    getStories,
    menu: {
      id: menuId,
      label,
      name,
      enabled
    },
  } = props
  const [title, setTitle] = useState(label || name)
  const [file, setFile] = useState(null)

  const linkType = label ? 'menu' : 'story'

  const handleTitleChange = e => {
    setTitle(e.target.value)
  }

  const handleFileChange = e => {
    setFile(e.target.files[0])
  }


  const disableClick = e => {
    const data = new FormData()
    data.append('enabled', !enabled)
    axios.post('locn/'+id+'/'+linkType+'/'+menuId, data).then(resp => {
      getStories(id)
    })
  }

  const handleUpdate = e => {
    const data = new FormData()
    if (title) {
      data.append('title', title)
    }
    if (file) {
      data.append('thumbnail', file)
    }

    axios.post('locn/'+id+'/'+linkType+'/'+menuId, data).then(resp => {
      getStories(id)
    })
  }

  const handleDelete = e => {
    axios.delete(linkType+'/'+menuId).then(resp => {
      getStories(id)
    })
  }


  return <Col>
    <div className='box'>
      <div>
        <div className="dropbtn-active">
          <i className="fas fa-chevron-left" onClick={handleBack} ></i>
          <span>{label || name}</span>
          <i className="fas fa-trash" onClick={handleDelete}></i>
        </div>
      </div>
      <div className='box__wrapper-buttons'>
        <div className='box__block-up-buttons'>
          <p></p>
          <FormGroup className='setup-profile__form-group'>
            <Input className='setup-profile__input' type="text" value={title} id="title" onChange={handleTitleChange} name="title" />
          </FormGroup>
          <FormGroup className='setup-profile__form-group'>
            <Input className='setup-profile__file' type="file" id="thumbnail" name="thumbnail" onChange={handleFileChange} />
          </FormGroup>
        </div>
        <div className='box__block-down-buttons'>
          <div>
            <Button onClick={disableClick} className='box__down-buttons' color={enabled ? 'secondary' : 'warning'}>{enabled ? 'Disable' : 'Enable'}</Button>
          </div>
          <Button className='box__down-buttons' color='warning' onClick={handleUpdate}>Update</Button>
        </div>
      </div>
    </div>
  </Col>
}


const mapStateToProps = state => ({
  userLocation: state.user.userLocation,
})

const mapDispatchToProps = dispatch => ({
  getStories: (locationId) => dispatch({ type: GET_STORIES , payload: { locationId }}),
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMenu);