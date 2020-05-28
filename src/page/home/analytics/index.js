import React, { Component, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Card, CardBody, } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'; import {
  AppSidebar,
  AppSidebarNav2 as AppSidebarNav,
  AppSidebarHeader,
  AppSidebarForm,
  AppSidebarToggler
} from '@coreui/react';
import { Col, Container, Row, FormGroup, Input, Label, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import * as router from 'react-router-dom';

import Panel from '../../../components/panel/index';
import SocialImg from '../../../components/social-img/index'
import './index.scss';
import navigation from '../../../config/nav'

const line = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  datasets: [
    {
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(255,210,131, 1)',
      borderColor: '#FFDB9C',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(f,f,f)',
      pointBackgroundColor: '#FFDB9C',
      pointBorderWidth: 5,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#FFDB9C',
      pointHoverBorderColor: '#fff',
      pointHoverBorderWidth: 1,
      pointRadius: 4,
      pointHitRadius: 10,
      data: [200, 270, 240, 260, 320, 300, 400],
    },
  ],
};

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, line.datasets[0].data) - 5,
          max: Math.max.apply(Math, line.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

const cardChartData4 = {
  labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.3)',
      borderColor: 'transparent',
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
      barPercentage: 0.6,
    },
  ],
};

const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
};


class Analytics extends Component {
  render() {
    return (
      <Container className='analytics' fluid>
        <p className='title-page'>Analytics</p>
        <Row>
          <Col lg={2} xl={2}>
            <AppSidebar fixed display="md">
              <AppSidebarHeader />
              <AppSidebarForm />
              <Suspense>
                <AppSidebarNav navConfig={navigation} {...this.props} router={router} />
              </Suspense>
            </AppSidebar>
          </Col>
          <Col className='analytics__page' md={12} lg={9} xl={10}>
            <FormGroup row className='analytics__calendar'>
              <Col xs="12">
                <Label htmlFor="date-input">Date Input</Label>
              </Col>
              <Col style={{ display: 'flex', justifyContent: 'space-between' }} xs="12">
                <InputGroup className='analytics__calendar-picker'>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fa fa-calendar-o"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type="date" id="date-input" name="date-input" placeholder="date" />
                </InputGroup>
                <div className='d-flex'>
                  <AppSidebarToggler className="d-md-none promote__wrapper-icon" mobile>
                    <i className="fa fa-navicon promote__icon" />
                  </AppSidebarToggler>
                </div>
              </Col>
            </FormGroup>
            <Row className='analytics__wrapper-card'>
              <Col xs={12} sm={6} md={12} lg={6}>
                <Card className="text-white analytics__card">
                  <CardBody className="pb-0">
                    <div className="text-value analytics__value">450</div>
                    <div className='analytics__description'>Total Interactions</div>
                  </CardBody>
                  <div className="chart-wrapper mx-10" style={{ height: '70px' }}>
                    <Line data={line} options={options} height={70} />
                  </div>
                </Card>
              </Col>
              <Col xs={12} sm={6} md={12} lg={6}>
                <Card className="text-white  analytics__card">
                  <CardBody className="pb-0">
                    <div className="text-value analytics__value">300</div>
                    <div className='analytics__description'>Total Sessions</div>
                  </CardBody>
                  <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                    <Bar data={cardChartData4} options={cardChartOpts4} height={70} />
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container >
    )
  }
}

export default Analytics