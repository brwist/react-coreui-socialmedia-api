import React  from 'react';
import TextInput from './TextInput'
import MediaInput from './MediaInput'
import MediaInputInstagram from './MediaInputInstagram'
import MediaInputShopify from './MediaInputShopify'
import MenuInput from './MenuInput'


export default function StoryInput (inputSetUp) {
  switch (inputSetUp.implType) {
    case 'TextInput':
      return <TextInput inputSetUp={inputSetUp}/>
    case 'MediaInput':
      switch (inputSetUp.connectors[0].implType) {
        case 'InstagramConnector':
          return <MediaInputInstagram inputSetUp={inputSetUp}/>
        case 'ShopifyConnector':
          return <MediaInputShopify inputSetUp={inputSetUp}/>
        default:
          return <MediaInput inputSetUp={inputSetUp}/>
      }
    case 'MenuSelect':
        return <MenuInput inputSetUp={inputSetUp}/>

    default:
      return <span/>;
  }
}