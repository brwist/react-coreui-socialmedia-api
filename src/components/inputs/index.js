import React  from 'react';
import TextInput from './TextInput'
import MediaInput from './MediaInput'


export default function StoryInput (inputSetUp) {
  switch (inputSetUp.implType) {
    case 'TextInput':
      return <TextInput inputSetUp={inputSetUp}/>;
    case 'MediaInput':
      return <MediaInput inputSetUp={inputSetUp}/>;

    default:
      return;
  }
}