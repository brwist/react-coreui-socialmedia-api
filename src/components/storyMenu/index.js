import React from 'react'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.scss'

const StoryMenu = props => {
  return (
    <div className='story-menu'>
      <ListGroup >
        {props.menuItem.map(menu => (
          <ListGroupItem
            className='story-menu__list'
            action color="dark"
            onClick={() => props.changeClickedPanel(menu.title)}
            key={menu.title}
          >
            {menu.article === 'fa' ? <div className='story-menu__icon-wrapepr'>
              <FontAwesomeIcon icon={menu.icon} className='story-menu__icon' />
            </div> :
              <div className='story-menu__icon-wrapepr'>
                <i className={`story-menu__icon ${menu.icon}`}></i>
              </div>
            }
            <div className='story-menu__wrapper'>
              <ListGroupItemHeading className='story-menu__title'>{menu.title}</ListGroupItemHeading>
              <ListGroupItemText className='story-menu__item-block'>
                {menu.message.map(text => (
                  <Button className='story-menu__item' outline color='dark' key={text}>{text}</Button>
                ))}
              </ListGroupItemText>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  )
}

export default StoryMenu

