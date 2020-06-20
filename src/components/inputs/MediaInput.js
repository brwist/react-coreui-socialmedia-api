import React, {useState}  from 'react';
import axios  from 'axios';
import { FormGroup, Input } from 'reactstrap';

import { cdnURL } from '../../config/endpoints';


const TextInput = ({inputSetUp}) => {
  const [fileUploading, setFileUpload] = useState(false)
  const handleClick = (e) => {
    setFileUpload(true)
    const {name, files} =e.target
    const data = new FormData()
    data.append('file', files[0])
    axios.put(`location/${inputSetUp.locationId}/media`, data).then(response => {
      inputSetUp.handleParamsChange(name, `["${cdnURL+response.data.media}"]`)
      setFileUpload(false)
      inputSetUp.setPreviewImage(cdnURL+response.data.media)
    }, error => setFileUpload(false))

  }
  return <>
    <h4>{inputSetUp.title}</h4>
    <div dangerouslySetInnerHTML={{__html: inputSetUp.html}}></div>
    <FormGroup className='setup-profile__form-group'>
      <Input className='setup-profile__file' type="file" id={inputSetUp.name} name={inputSetUp.name} onChange={handleClick}/>
      {fileUploading && <span>Uploading...</span>}
    </FormGroup>
  </>
}

export default TextInput