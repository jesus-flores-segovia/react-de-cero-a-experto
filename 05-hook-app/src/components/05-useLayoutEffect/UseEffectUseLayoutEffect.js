import React, {useLayoutEffect, useState, useEffect} from 'react'

export const UseEffectUseLayoutEffect = () => {
    const [value, setValue] = useState(0);
 
  /* useLayoutEffect(() => {
    if (value === 0) {
      setValue(10 + Math.random() * 200);
    }
  }, [value]); */

  useEffect(() => {
    if (value === 0) {
      setValue(10 + Math.random() * 200);
    }
  }, [value]);
 
  console.log('render', value);
 
  return (
    <div onClick={() => setValue(0)}>
      value: {value}
    </div>
  );
}
