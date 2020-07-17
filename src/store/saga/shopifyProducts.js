import { put, takeLatest } from "redux-saga/effects";
import axios from 'axios';
import * as actions from '../actions/shopifypProducts'
import * as types from '../types/shopifyProducts'

export function* getShopifyProducts(action) {
  try {
    const shopifyLink = 'locn/'+action.payload.locationId+'/SHOPIFY/'
    const data = yield axios.get(shopifyLink+'PRODUCTS?collectionID='+action.payload.collectionId).then(resp => {
      return resp.data
    })

    yield put(actions.setShopifyProducts(data))


  } catch (e) {
    console.log(e)
    yield put(actions.setShopifyProductsError(e))
  }
}


export default function* () {
  yield takeLatest(types.GET_SHOPIFY_PRODUCTS, getShopifyProducts)
}