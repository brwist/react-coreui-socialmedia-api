import React, { useState, useEffect } from 'react';

import './index.scss';
import MenuCart from './MenuCard';
import UpdateMenu from './UpdateMenu';


const EditorLightbox = (props) => {
  const {
    stories,
    setPreviewImage,
    locationName
  } = props

  const [currentMenu, setCurrentMenu] = useState({...stories, label: `${locationName}`})
  const [historyList, setHistoryList] = useState([stories])
  const [editView, setEditView] = useState(false)

  const previousMenuIndex = historyList.length-2
  const allowBack = historyList.length > 1

  const updateHistory = (id, updatedData, deleteItem=false) => {
    if (allowBack) {
      const replaceNested = (historyItem) => {
        if (historyItem.id === id) {
          Object.keys(updatedData).forEach(function (key) {
            historyItem[key] = updatedData[key]
          });
        } else {
          if (historyItem.subList && historyItem.subList.length) {
            if (deleteItem) {
              const deleteIndex = historyItem.subList.findIndex(item => item && item.id === id)
              if (deleteIndex !== -1) {
                historyItem.subList.splice(deleteIndex, 1)
              }
            }
            for (let item of historyItem.subList) {
              replaceNested(item)
            }
          } else if (historyItem.items) {
            if (deleteItem) {
              const deleteIndex = historyItem.items.findIndex(item => item && item.id === id)
              if (deleteIndex !== -1) {
                historyItem.items.splice(deleteIndex, 1)
              }
            }
            for (let item of historyItem.items) {
              replaceNested(item)
            }
          }
        }

      }
      const currentHistory = [...historyList]
      for (let index in currentHistory) {
        currentHistory[index] && replaceNested(currentHistory[index])
      }
      setHistoryList([...currentHistory])

    }
  }

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
    setPreviewImage(media)
    setHistoryList([...historyList, null])
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
        updateHistory={updateHistory}
        handleBack={handleBack}
      />}

    </div >
  );
}

export default EditorLightbox