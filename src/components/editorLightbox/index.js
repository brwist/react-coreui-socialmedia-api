import React, { useState } from 'react';

import './index.scss';
import MenuCart from './MenuCard';
import UpdateMenu from './UpdateMenu';

const EditorLightbox = (props) => {
  const {
    stories,
    setPreviewImage
  } = props

  const [currentMenu, setCurrentMenu] = useState(stories)
  const [historyList, setHistoryList] = useState([stories])
  const [editView, setEditView] = useState(false)

  const previousMenuIndex = historyList.length-2
  const allowBack = historyList.length > 1

  const setMenu = menu => e => {
    setCurrentMenu(menu)
    setHistoryList([...historyList, menu])
  }

  const handleBack = e => {
    setCurrentMenu(historyList[previousMenuIndex])
    const currentHistoryList = [...historyList]
    currentHistoryList.splice(-1,1)
    setHistoryList([...currentHistoryList])
    setEditView(false)
  }

  const handleStorySelect = (menu, media) => e => {
    setCurrentMenu(menu)
    setPreviewImage(media)
    setHistoryList([...historyList, null])
    setEditView(true)
  }



  return (
    <div className="light-box" color="white" fluid>
      <h3 className='light-box__title'>Live lightbox stories</h3>
      {!editView ? <MenuCart
        menu={currentMenu}
        allowBack={allowBack}
        setMenu={setMenu}
        handleBack={handleBack}
        handleStorySelect={handleStorySelect}
        setEditView={setEditView}
      /> : <UpdateMenu
        menu={currentMenu}
        handleBack={handleBack}
      />}

    </div >
  );
}

export default EditorLightbox