import React, { useState } from 'react';
import { connect } from "react-redux";
import qs from 'query-string'

import axios  from 'axios';
import { Button, Col, FormGroup, Input, Spinner } from 'reactstrap';

import { GET_STORIES } from '../../store/types/stories'



function UpdateMenu(props) {
  const {
    handleBack,
    userLocation: {
      id
    },
    updateHistory,
    menu: {
      id: menuId,
      label,
      name,
      enabled
    },
  } = props
  const [title, setTitle] = useState(label || name)
  const [file, setFile] = useState('')
  const [mediaUrl, setMediaUrl] = useState('')
  const [fileUploading, setFileUpload] = useState(false)
  const [loading, setLoading] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [error, setError] = useState('')

  const linkType = label ? 'menu' : 'story'
  const labelName = label ? 'label' : 'name'

  const handleTitleChange = e => {
    setTitle(e.target.value)
  }

  const handleFileChange = e => {
    setFileUpload(true)
    const data = new FormData()
    data.append('file', e.target.files[0])
    data.append('thumbnail', true)
    axios.put(`location/${id}/media`, data).then(response => {
      setFileUpload(false)
      setFile(response.data.id)
      setMediaUrl(response.data.media)
    }, error => setFileUpload(false))
  }

  const disableClick = e => {
    setLoading(true)
    const data = {}
    data.enabled = !enabled
    axios.post('locn/'+id+'/'+linkType+'/'+menuId, qs.stringify(data), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(resp => {
      setLoading(false)
      updateHistory(menuId, data)
      setUpdated(true)
    }, error => {
      setLoading(false)
      setError(error.response.data.msg)
    })
  }

  const handleUpdate = e => {
    setLoading(true)
    let dataForUpdate = {}
    let data = {}
    data.enabled = enabled
    if (title) {
      data.label = title
      dataForUpdate[labelName] = title
    }
    if (file) {
      data.thumbnail = file
      dataForUpdate.thumbnail= {
        media: mediaUrl
      }
    }

    axios.post('locn/'+id+'/'+linkType+'/'+menuId, qs.stringify(data), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(resp => {
      updateHistory(menuId, dataForUpdate)
      setLoading(false)
      setUpdated(true)
    }, error => {
      setLoading(false)
      setError(error.response.data.msg)
    })
  }

  const handleDelete = e => {
    setLoading(true)
    axios.delete(linkType+'/'+menuId).then(resp => {
      updateHistory(menuId, null, true)
      setLoading(false)
      setDeleted(true)
    }, error => {
      setLoading(false)
      setError(error.response.data.msg)
    })
  }


  return <Col>
    <div className='box'>
      <div>
        <div className="dropbtn-active">
          <i className="fas fa-chevron-left" onClick={handleBack} ></i>
          <span>{label || name}</span>
          <span>{deleted && <span>Deleted </span>}<i className="fas fa-trash" onClick={handleDelete}></i></span>
        </div>
      </div>

      { !loading ? <div className='box__wrapper-buttons'>
        <div className='box__block-up-buttons'>
          <p></p>
          {error && <p style={{color: 'red'}}>{error}</p>}
          <FormGroup className='setup-profile__form-group'>
            <Input className='setup-profile__input' type="text" value={title} id="title" onChange={handleTitleChange} name="title" />
          </FormGroup>
          <FormGroup className='thumbnail-form-group'>
            <span>Upload Thumbnail: </span>
            <Input className='thumbnail' type="file" id="thumbnail" name="thumbnail" onChange={handleFileChange} />
            {fileUploading && <span>Uploading...</span>}
          </FormGroup>
        </div>
        <div className='box__block-down-buttons'>
          <Button onClick={disableClick} className='box__down-buttons' color={enabled ? 'secondary' : 'warning'}>{enabled ? 'Disable' : 'Enable'}</Button>
          {updated && <div style={{color: 'green'}}>Update Successful!</div>}
          <Button className='box__down-buttons' color='warning' disabled={fileUploading} onClick={handleUpdate}>Update</Button>
        </div>
      </div>: <Spinner className='setup__spinner' color="dark" />}
    </div>
  </Col>
}


const mapStateToProps = state => ({
  userLocation: state.user.userLocation,
})

export default connect(mapStateToProps)(UpdateMenu);