import React from 'react';
import { cdnURL } from '../../config/endpoints';


export default function MenuCard(props) {
  const {
    handleBack,
    handleStorySelect,
    menu: {
      label,
      subList,
      items
    },
    allowBack,
    setMenu,
    setEditView
  } = props

  const handleEdit = e => {
    setEditView(true)
  }


  return <div className='box-wrapper'>
    <subList class="dropdown">
      <div class="dropbtn-active">
        {allowBack ? <i class="fas fa-chevron-left" onClick={handleBack} ></i> : <span/>}
        <span>{label}</span>
        <i class="fas fa-pen" onClick={handleEdit}></i>
      </div>
    </subList>
    {subList.length ? subList.map(item => (
      <div key={item.label} class="dropdown">
        <div class="dropbtn"  onClick={setMenu(item)}>
          {item.thumbnail && <div className="icon">
            <img src={cdnURL+item.thumbnail.media} alt='icon' />
          </div>}
          <span>{item.label}</span>
          <i class="fas fa-chevron-right"></i>
        </div>
      </div>
    )) :
    items.map(item => (
      <div key={item.label} class="dropdown">
        <div class="dropbtn"  onClick={handleStorySelect(item, cdnURL+item.mediaList[0].media)}>
          {item.thumbnail && <div className="icon">
            <img src={cdnURL+item.thumbnail.media} alt='icon' />
          </div>}
          <span>{item.name}</span>
          <span/>
        </div>
      </div>
    ))}
  </div>
}