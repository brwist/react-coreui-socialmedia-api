import { SET_ANALYTICS, ANALYTICS_ERROR } from '../types/analytics';

export const setAnalytics = analytics => ({
  type: SET_ANALYTICS,
  analytics,
})

export const setAnalyticsError = error => {
  return ({
    type: ANALYTICS_ERROR,
    error
  })
}