import React  from 'react';

import {parse} from 'query-string'

function ConnectionStatus(props) {
  const queryParameters = parse(props.location.search)
  for (let key in queryParameters) {
    window.localStorage.setItem(key, queryParameters[key])
  }
  if (queryParameters.s) {
    window.close();
  }
  return <div>{queryParameters.m}</div>
}


export default ConnectionStatus