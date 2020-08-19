import React, {useState, useRef}  from 'react';
import axios  from 'axios';
import {FormGroup, Button} from 'reactstrap';

import Promise from 'bluebird'

import { cdnURL } from '../../config/endpoints';


const TextInput = ({inputSetUp}) => {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [fileUploading, setFileUpload] = useState(false)
  const [fileInputKey, setFileInputKey] = useState(new Date().toLocaleString())

  const hiddenFileInput = useRef(null);

  const clickChooseFile = e => {
    hiddenFileInput.current.click();
  }

  const removeMedia = index => e => {
    const updatedFiles = [...selectedFiles]
    updatedFiles.splice(index, 1)
    setSelectedFiles(updatedFiles)
  }

  const handleSelectFile = e => {
    const {files} =e.target
    setFileInputKey(new Date().toLocaleString())
    setSelectedFiles([...selectedFiles, ...files])
  }

  const uploadFiles = (e) => {
    setFileUpload(true)

    Promise.mapSeries(selectedFiles, (file) => {
      const data = new FormData()
      data.append('file', file)
      data.append('thumbnail', false)
      return axios.put(`location/${inputSetUp.locationId}/media`, data)
    }).then(function(responses) {
      const mediaList = responses.map(response => response.data.id)
      inputSetUp.handleParamsChange(inputSetUp.name, `["${mediaList.join('","')}"]`)
      setFileUpload(false)
      inputSetUp.setPreviewImage(responses.map(response => cdnURL+response.data.media))
    })

  }
  return <>
    <h4>{inputSetUp.title}</h4>
    <div dangerouslySetInnerHTML={{__html: inputSetUp.html}}></div>
    {!!selectedFiles.length && <div className="media-grid">
      {selectedFiles.map((item, index) => {
        const src = URL.createObjectURL(item)
        const videoLink = selectedFiles[index].name.indexOf('.mp4') !== -1

        return <div key={index} className="wrapper-image" onClick={removeMedia(index)}  style={{overflow: "hidden"}}>
                { !videoLink
                    ? <img src={src} alt='img'/>
                    : <video width="320" height="240" autoPlay muted loop>
                      <source src={src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                }
              </div>

      })}
    </div>}
    <FormGroup className='setup-profile__form-group'>
      <input
        type="file"
        id={inputSetUp.name}
        name={inputSetUp.name}
        onChange={handleSelectFile}
        key={fileInputKey}
        ref={hiddenFileInput}
        style={{display: 'none'}}
        multiple/>
      <span style={{paddingRight: '10px'}}><Button onClick={clickChooseFile} color='warning'>Choose Files</Button></span>
      {!!selectedFiles.length && <Button onClick={uploadFiles} color='warning'>Upload Files</Button>}
      {fileUploading && <span style={{paddingLeft: '10px'}}>Uploading...</span>}
    </FormGroup>

  </>
}

export default TextInput