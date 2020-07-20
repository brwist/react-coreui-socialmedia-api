import React from 'react';
import { cdnURL } from '../../config/endpoints';


export default function MenuCard(props) {
  const {
    handleBack,
    handleStorySelect,
    menu: {
      label,
      name,
      subList,
      items,
      mediaList
    },
    historyList,
    allowBack,
    setMenu,
    setHistoryList,
    setEditView
  } = props

  const handleEdit = e => {
    setEditView(true)
    setHistoryList([...historyList, null])
  }

  return <div className='box-wrapper'>
    <div className="dropdown">
      <div className="dropbtn-active">
        {allowBack ? <i className="fas fa-chevron-left" onClick={handleBack} ></i> : <span/>}
        <span>{label || name}</span>
        <i className="fas fa-pen" onClick={handleEdit}></i>
      </div>
    </div>
    {subList && subList.map(item => (
      <div key={item.id} className="dropdown">
        <div className="dropbtn"  onClick={setMenu(item)}>
          {item.thumbnail && <div className="icon">
            <img src={cdnURL+item.thumbnail.media} alt='icon' />
          </div>}
          <span>{item.label}</span>
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>
    ))}
    {(subList && !subList.length) && items && items.map(item => (
      <div key={item.id} className="dropdown">
        <div className="dropbtn"  onClick={setMenu(item)}>
          {item.thumbnail && <div className="icon">
            <img src={cdnURL+item.thumbnail.media} alt='icon' />
          </div>}
          <span>{item.name}</span>
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>
    ))}
    {!subList && !items && mediaList.map(item => (
      <div key={item.id} className="dropdown">
        <div className="dropbtn"  onClick={handleStorySelect(item, [cdnURL+item.media])}>
          {item.thumbnail && <div className="icon">
            <img src={cdnURL+item.thumbnail.media} alt='icon' />
          </div>}
          <span>{item.name}</span>
          <span/>
        </div>
      </div>
    ))
    }
  </div>
}