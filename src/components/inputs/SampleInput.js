import React, {useEffect}  from 'react';

const SampleInput = ({inputSetUp}) => {

  useEffect(() => {
    inputSetUp.handleParamsChange('SAMPLE', true)
    inputSetUp.setPreviewImage(inputSetUp.samples)
  }, [])

  return <>
    <h4>{inputSetUp.title}</h4>
    <div dangerouslySetInnerHTML={{__html: inputSetUp.html}}></div>
  </>
}

export default SampleInput