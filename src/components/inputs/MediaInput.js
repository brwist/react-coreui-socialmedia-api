import React, {useState, useRef}  from 'react';
import axios  from 'axios';
import { FormGroup, Button } from 'reactstrap';

import { cdnURL } from '../../config/endpoints';


const TextInput = ({inputSetUp}) => {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [fileUploading, setFileUpload] = useState(false)

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
    setSelectedFiles([...selectedFiles, ...files])
  }

  const uploadFiles = (e) => {
    setFileUpload(true)

    const uploadRequestsList = selectedFiles.map(file => {
      const data = new FormData()
      data.append('file', file)
      return axios.put(`location/${inputSetUp.locationId}/media`, data)
    })

    Promise.all(uploadRequestsList).then(responses => {
      const mediaList = responses.map(response => response.data.id)
      inputSetUp.handleParamsChange(inputSetUp.name, `["${mediaList.join(',')}"]`)
      setFileUpload(false)
      inputSetUp.setPreviewImage(responses.map(response => cdnURL+response.data.media))
    }, error => setFileUpload(false))
  }
  return <>
    <h4>{inputSetUp.title}</h4>
    <div dangerouslySetInnerHTML={{__html: inputSetUp.html}}></div>
    {!!selectedFiles.length && <div className="media-grid">
      {selectedFiles.map((item, index) => {
        const src = URL.createObjectURL(item)
        return <div className="wrapper-image" onClick={removeMedia(index)}><img key={index} src={src} alt=""/></div>
      })}
    </div>}
    <FormGroup className='setup-profile__form-group'>
      <input
        type="file"
        id={inputSetUp.name}
        name={inputSetUp.name}
        onChange={handleSelectFile}
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