import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button } from 'reactstrap';

import './index.scss'

const StoryMenu = props => {
  const {locations} = props
  const [locationWorkflows, setLocationWorkflow] = useState([])

  useEffect(() => {
    for (let location of locations) {
      let workflowPromises = location.locnConfig.workflows.map(workflow => axios.get('workflow/'+workflow))
      Promise.all(workflowPromises).then((values) => {
        setLocationWorkflow([
          ...locationWorkflows,
          {
            id: location.id,
            name: location.name,
            workflows: values.map(value => ({id: value.data.id, title: value.data.title}))
          }
        ])
      });

    }
  }, [locations, setLocationWorkflow])


  return (
    <div className='story-menu'>
      <ListGroup >
        {locationWorkflows.map(location => (
          <ListGroupItem
            className='story-menu__list'
            key={location.name}
          >
            <div className='story-menu__wrapper'>
              <ListGroupItemHeading className='story-menu__title'>{location.name}</ListGroupItemHeading>
              <ListGroupItemText className='story-menu__item-block'>
                {location.workflows.map(workflow => (
                  <Button className='story-menu__item' outline color='dark' onClick={props.changeClickedPanel(workflow.id, location.id)} key={workflow.id}>{workflow.title}</Button>
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

