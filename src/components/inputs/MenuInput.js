import React, {useState, useRef, useEffect}  from 'react';
import axios  from 'axios';
import { FormGroup, Button, Spinner, Input, Label } from 'reactstrap';
import { connect } from "react-redux";

import { GET_MENU_LIST } from '../../store/types/menuList'


const MenuInput = (props) => {
  const [showCreateStory, setShowCreateStory] = useState(false)
  const [fileUploading, setFileUpload] = useState(false)
  const {
    inputSetUp,
    menuList,
    isLoading,
    getMenuListId,
    userLocation: {
      id: locationId,
    }
  } = props

  const hiddenFileInput = useRef(null);

  useEffect(() => {
    getMenuListId(locationId)
  }, [getMenuListId, locationId])

  const clickChooseFile = e => {
    hiddenFileInput.current.click();
  }

  const changeTitle = (e) => {
    const { value } = e.target
    inputSetUp.handleParamsChange('MENU_TITLE', value)
  }

  const changeCheckBox = (e) => {
    const { checked } = e.target
    inputSetUp.handleParamsChange('MAIN_PAGE', checked)
  }

  const selectParentTitle = (e) => {
    const { value } = e.target
    inputSetUp.handleParamsChange(null, null, {
      SELECT_MENU: true,
      MENU_ID: value,
      PARENT_MENU_ID: menuList.find(menu => menu.id === value).parentID
    })
  }

  const selectStory = e => {
    const { value } = e.target
    if (value) {
      if (value && value !== 'NEW_STORY') {
        inputSetUp.handleParamsChange(null, null, {
          SELECT_MENU: true,
          MENU_ID: value,
          PARENT_MENU_ID: menuList.find(menu => menu.id === value).parentID
        })
      } else {
        setShowCreateStory(true)
      }
    }
  }

  const handleFileChange = e => {
    setFileUpload(true)
    const data = new FormData()
    data.append('file', e.target.files[0])
    data.append('thumbnail', true)
    axios.put(`location/${locationId}/media`, data).then(response => {
      inputSetUp.handleParamsChange('MENU_IMAGE', response.data.media)
      setFileUpload(false)
    }, error => setFileUpload(false))
  }

  if (isLoading) return <Spinner className='setup__spinner' color="dark" />

  return <>
    <h4>{inputSetUp.title}</h4>
    <div dangerouslySetInnerHTML={{__html: inputSetUp.html}}></div>
    <FormGroup>
      <Input type="select" name="storySelect" onChange={selectStory}>
        <option value="" key='none' selected>Stories</option>
        {menuList && menuList.map(menuItem => {
          return <option value={menuItem.id} key={menuItem.id}>{menuItem.label}</option>
        })}
        <option value="NEW_STORY" key="NEW_STORY">Create New</option>
      </Input>
    </FormGroup>
    {showCreateStory && <div className="story-details">
      <FormGroup className='form-group'>
        <span>Menu Title</span>
        <Input className='setup-profile__input' type="text" id="menu-title" onChange={changeTitle} name="menu-title" />
      </FormGroup>
      <FormGroup className='form-group'>
        <span>Menu Thumbnail</span>
        <input
          type="file"
          id={inputSetUp.name}
          name={inputSetUp.name}
          onChange={handleFileChange}
          ref={hiddenFileInput}
          style={{display: 'none'}}
          multiple/>
        {fileUploading && <span>Uploading...</span>}
        <Button onClick={clickChooseFile} color='warning'>Upload</Button>
      </FormGroup>
      <FormGroup className="form-group">
        <span>Menu Under</span>
        <Input type="select" name="parentStorySelect" onChange={selectParentTitle}>
          {menuList && menuList.map(menuItem => {
            return <option value={menuItem.id} key={menuItem.id}>{menuItem.label}</option>
          })}
        </Input>
      </FormGroup>
    </div>}
    <FormGroup check>
      <Label check>
        <Input type="checkbox" value={true} onChange={changeCheckBox} name="menu-check"/>{' '}
        Home Page
      </Label>
    </FormGroup>


  </>
}

const mapStateToProps = state => ({
  menuList: state.menuList.menuList,
  isLoading: state.menuList.isLoading,
  userLocation: state.user.userLocation,
})

const mapDispatchToProps = dispatch => ({
  getMenuListId: (locationId) => dispatch({ type: GET_MENU_LIST , payload: { locationId }}),
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuInput);