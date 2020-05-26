import React from 'react'
import { Col, Row,  Button, Form, FormGroup, Label, Input, FormText, ButtonToggle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag , faBoxTissue} from '@fortawesome/free-solid-svg-icons';

import './index.scss';

const Panel = () => (
  <div className='panelSetup'>

<Form>
<Row>
      <Col className="d-flex justify-content-center" col={2}>
        <Label className="panelSetup__accountSetup"><span>Account Setup</span></Label>
      </Col>
    </Row>
      <FormGroup className="form2">
      
           <h2>Media Connectors</h2>
           <Button block className="panelSetup__btnSetup btn-square btns">
           <span><i className="fa fa-instagram"/>  
              Instagram Connect
              </span>
           </Button>
           <Button block className="panelSetup__btnSetup btn-square btns ">
           <span><FontAwesomeIcon icon={faBoxTissue} />  
               Google Drive Connect
               </span>
           </Button>
           <Button block className="panelSetup__btnSetup btn-square btns">
           <span><FontAwesomeIcon icon={faShoppingBag} /> </span>
               <span>Shopify Connect</span>
           </Button>

           {/* <ButtonToggle className="panelSetup__btnSetup btn-square btns"><p>primary</p></ButtonToggle>{' '} */}
     
      </FormGroup>
</Form>        
</div>
)

export default Panel