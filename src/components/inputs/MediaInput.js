import React  from 'react';
import { FormGroup, Input } from 'reactstrap';


const TextInput = ({inputSetUp}) => {
  const handleClick = (e) => {
    const {name, files} =e.target
    inputSetUp.handleParamsChange(name, files)
  }
  return <>
    <h4>{inputSetUp.title}</h4>
    <div dangerouslySetInnerHTML={{__html: inputSetUp.html}}></div>
    <FormGroup className='setup-profile__form-group'>
      <Input className='setup-profile__file' type="file" id={inputSetUp.name} name={inputSetUp.name} onChange={handleClick} multiple/>
    </FormGroup>
  </>
}

export default TextInput