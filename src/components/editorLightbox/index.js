import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    if (allowBack) {
      const currentHistory = [...historyList]
      currentHistory[0] = stories
      const replaceHistory = (obj) => {
        if (obj.subList.length) {
          for (let item of obj.subList) {
            const indexInHistory = currentHistory.findIndex(historyState => historyState && historyState.id === item.id)
            if (currentMenu.id === item.id) {
              setCurrentMenu(item)
            }
            if (indexInHistory !== -1) {
              currentHistory[indexInHistory] = item
            }
            replaceHistory(item)

          }
        } else {
          for (let item of obj.items) {
            const indexInHistory = currentHistory.findIndex(historyState => historyState && historyState.id === item.id)
            if (indexInHistory !== -1) {
              currentHistory[indexInHistory] = item
            }
            if (currentMenu.id === item.id) {
              setCurrentMenu(item)
            }
          }
        }
      }
      replaceHistory(stories)
      setHistoryList([...currentHistory])


    }
  }, [stories])

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
    <div className="light-box" color="white">
      <h3 className='light-box__title'>Live lightbox stories</h3>
      {!editView ? <MenuCart
        menu={currentMenu}
        allowBack={allowBack}
        setMenu={setMenu}
        handleBack={handleBack}
        handleStorySelect={handleStorySelect}
        setEditView={setEditView}
        historyList={historyList}
        setHistoryList={setHistoryList}
      /> : <UpdateMenu
        menu={currentMenu}
        handleBack={handleBack}
      />}

    </div >
  );
}

export default EditorLightbox