import React  from 'react';
import { FormGroup, Input } from 'reactstrap';


const TextInput = ({inputSetUp}) => {
  const handleClick = (e) => {
    const {name, value} =e.target
    inputSetUp.handleParamsChange(name, value)
  }
  return <>
    <h4>{inputSetUp.title}</h4>
    <div dangerouslySetInnerHTML={{__html: inputSetUp.html}}></div>
    <FormGroup className='setup-profile__form-group'>
      <Input className='setup-profile__input' type="text" id={inputSetUp.name} onChange={handleClick} name={inputSetUp.name} />
    </FormGroup>
  </>
}

export default TextInput