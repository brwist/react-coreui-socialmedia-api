import { put, takeLatest } from "redux-saga/effects";
import axios from 'axios';
import * as actions from '../actions/shopifyData'
import * as types from '../types/shopifyData'

export function* getShopifyData(action) {
  try {
    const shopifyLink = 'locn/'+action.payload.locationId+'/SHOPIFY/'
    const data = yield axios.get(shopifyLink+'COLLECTIONS?limit=10').then(resp => {
      const productsRequests = resp.data.custom_list.slice(0, 10).map(collection => axios.get(`${shopifyLink}PRODUCTS?collectionID=${collection.id}`))
      return Promise.all(productsRequests).then(resp => {
        return resp.reduce((productsList, product) => ([...productsList, ...product.data]), [])
      })
    })

    yield put(actions.setShopifyData(data))


  } catch (e) {
    console.log(e)
    yield put(actions.setShopifyDataError(e))
  }
}


export default function* () {
  yield takeLatest(types.GET_SHOPIFY_DATA, getShopifyData)
}