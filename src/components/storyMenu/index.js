import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button } from 'reactstrap';

import './index.scss'

const StoryMenu = props => {
  const {location} = props
  const [locationWorkflows, setLocationWorkflow] = useState([])

  useEffect(() => {
    let locationsArray = []
    let workflowPromises = location.locnConfig.workflows.map(workflow => axios.get('workflow/'+workflow))
    Promise.all(workflowPromises).then((values) => {
      locationsArray.push({
          id: location.id,
          name: location.name,
          workflows: values.map(value => ({
            id: value.data.id,
            title: value.data.title,
            icon: value.data.icon,
            labels: value.data.labels
          }))
        })
      setLocationWorkflow([
        ...locationsArray,
      ])
    });

  }, [location, setLocationWorkflow])

  const workflowsGroup = locationWorkflows.reduce((allWorkflows, currentLocation) => {
    return [...allWorkflows, ...currentLocation.workflows.map(workflow => ({...workflow, locationId: currentLocation.id }))]
  }, [])


  return (
    <div className='story-menu'>
      <ListGroup >
        {workflowsGroup.map(workflow => (
          <ListGroupItem
            className='story-menu__list'
            key={workflow.id}
            action color="dark"
            onClick={props.changeClickedPanel(workflow.id, workflow.locationId)}
          >
            {workflow.icon &&
              <div className='story-menu__icon-wrapepr'>
                <i className={`story-menu__icon ${workflow.icon}`}></i>
              </div>
            }
            <div className='story-menu__wrapper'>
              <ListGroupItemHeading className='story-menu__title'>{workflow.title}</ListGroupItemHeading>
              <ListGroupItemText className='story-menu__'>
                {workflow.labels.map(label => (
                  <Button
                    className='story-menu__item'
                    outline color='dark'
                    key={label}>
                    {label}
                  </Button>
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

