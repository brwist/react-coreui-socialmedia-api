import React from 'react';
import { cdnURL } from '../../config/endpoints';


export default function MenuCard(props) {
  const {
    handleBack,
    handleStorySelect,
    menu: {
      label,
      thumbnail,
      name,
      subList,
      items,
      mediaList
    },
    handleMediaSelect,
    historyList,
    allowBack,
    setMenu,
    setHistoryList,
    setEditView
  } = props

  const handleEdit = e => {
    setEditView(true)

    const newHistory = [...historyList]
    setHistoryList(newHistory)
  }

  return <div className='box-wrapper'>
    <div className="dropdown">
      <div className="dropbtn-active">
        <div className="flex-center">
          {allowBack ? <i className="fas fa-chevron-left" onClick={handleBack} ></i> : <span/>}
          {thumbnail && <div className="icon">
            <img src={cdnURL+thumbnail.media} alt='icon' />
          </div>}
        </div>
        <span>{label || name}</span>
        <i className="fas fa-pen" onClick={handleEdit}></i>
      </div>
    </div>
    {subList && subList.map(item => (
      <div key={item.id} className="dropdown">
        <div className="dropbtn sublist"  onClick={setMenu(item)}>
          {item.thumbnail && <div className="icon">
            <img src={cdnURL+item.thumbnail.media} alt='icon' />
          </div>}
          <span>{item.label}</span>
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>
    ))}
    {items && items.map(item => (
      <div key={item.id} className="dropdown">
        <div className="dropbtn items"  onClick={handleStorySelect(item, item.mediaList.map(item => cdnURL+item.media))}>
          {item.thumbnail && <div className="icon">
            <img src={cdnURL+item.thumbnail.media} alt='icon' />
          </div>}
          <span>{item.name}</span>
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>
    ))}
    {!subList && !items && <div className="media-grid">
      {mediaList.map((item, index) => {
        const videoLink = item.media && item.media.indexOf('.mp4') !== -1
        if (!videoLink) {
          return <img key={item.id} src={cdnURL+item.media} alt={item.media} onClick={handleMediaSelect(index)}/>
        } else {
          return <video key={item.id} className='image-preview' onClick={handleMediaSelect(index)} autoplay>
            <source src={cdnURL+item.media} type="video/mp4" />
              Your browser does not support the video tag.
          </video>
        }

      })}
    </div>
    }
  </div>
}