import React, { Suspense, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Card, CardBody, } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'; import {
  AppSidebar,
  AppSidebarNav2 as AppSidebarNav,
  AppSidebarHeader,
  AppSidebarForm,
} from '@coreui/react';
import { Col, Container, Row } from 'reactstrap';
import * as router from 'react-router-dom';

import './index.scss';
import navigation from '../../../config/nav'

import { connect } from "react-redux";


import { GET_ANALYTICS } from '../../../store/types/analytics'


const line = {
  labels: [],
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
      data: [],
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
  labels: [],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.3)',
      borderColor: 'transparent',
      data: [],
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


function Analytics (props) {
  const {
    getAnalytics,
    analytics,
    userLocation: {
      id,
      name
    }
  } = props


  useEffect(() => {
    if(id) {
      getAnalytics(id)
    }
  }, [id, getAnalytics])

  const lightBoxes = Object.keys(analytics)

  return (
    <Container className='analytics' fluid>
      <p className='title-page'>Analytics</p>
      <Row>
        <Col lg={2} xl={2}>
          <AppSidebar fixed display="md">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={navigation} router={router} />
            </Suspense>
          </AppSidebar>
        </Col>
        <Col className='analytics__page' md={12} lg={9} xl={10}>

          {lightBoxes.map(lb => {
            const {interaction} = analytics[lb]
            const {session} = analytics[lb]

            const interactionsLabels = Object.getOwnPropertyNames(interaction)
            const sessionsLabels = Object.getOwnPropertyNames(session)

            const interactionsSum = interactionsLabels.reduce((sum, date) => {
              return sum+interaction[date].sum_touches
            }, 0)
            const sessionsSum = sessionsLabels.reduce((sum, date) => {
              return sum+session[date].count
            }, 0)

            const interactionData = interactionsLabels.reduce((list, date) => {
              return [...list, interaction[date].sum_touches]
            }, [])
            const sessionData = sessionsLabels.reduce((list, date) => {
              return [...list, session[date].count]
            }, [])



            const lineChartSetup = {...line}
            lineChartSetup.labels = interactionsLabels
            lineChartSetup.datasets[0].data = interactionData

            const sessionsChartSetup = {...cardChartData4}
            sessionsChartSetup.labels = interactionsLabels
            sessionsChartSetup.datasets[0].data = sessionData

            return <div>

              <Row key={lb} className='analytics__wrapper-card'>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <h4>{lb} ({name})</h4>
                </Col>
                <Col xs={12} sm={6} md={12} lg={6}>
                  <Card className="text-white analytics__card">
                    <CardBody className="pb-0">
                      <div className="text-value analytics__value">{interactionsSum}</div>
                      <div className='analytics__description'>Total Interactions</div>
                    </CardBody>
                    <div className="chart-wrapper mx-10" style={{ height: '70px' }}>
                      <Line data={lineChartSetup} options={options} height={70} id={'line-'+lb}/>
                    </div>
                  </Card>
                </Col>
                <Col xs={12} sm={6} md={12} lg={6}>
                  <Card className="text-white  analytics__card">
                    <CardBody className="pb-0">
                      <div className="text-value analytics__value">{sessionsSum}</div>
                      <div className='analytics__description'>Total Sessions</div>
                    </CardBody>
                    <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                      <Bar data={sessionsChartSetup} options={cardChartOpts4} height={70} id={'bar-'+lb} />
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          })}

        </Col>
      </Row>
    </Container >
  )
}

const mapStateToProps = state => ({
  userLocation: state.user.userLocation,
  analytics: state.analytics.analytics,
})

const mapDispatchToProps = dispatch => ({
  getAnalytics: (locationId) => dispatch({ type: GET_ANALYTICS , payload: { locationId }}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);