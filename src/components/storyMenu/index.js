import React from 'react'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.scss'

const StoryMenu = props => {
  console.log(props.menuItem)
  return (
    <div className='story-menu'>
      <ListGroup >
        {props.menuItem.map(menu => (
          <ListGroupItem className='story-menu__list' key={menu.title} action color="dark">
            {menu.article === 'fa' ? <FontAwesomeIcon icon={menu.icon} className='story-menu__icon' /> :
              <i className={`story-menu__icon ${menu.icon}`}></i>}
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

