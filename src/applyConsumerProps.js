import React from 'react';
import CombinedConsumers from './CombinedConsumers';

export function applyConsumerProps(Component, consumers, propsToPass) {
  return () => {
    return (
      <CombinedConsumers consumers={consumers}>
        {(...props) => {
          let propsToUse = props;

          if (propsToPass) {
            propsToUse = propsToPass(props);
          } else {
            propsToUse = propsToUse.reduce((prevValue, currentValue) => {
              return { ...prevValue, ...currentValue };
            });
          }

          return <Component {...propsToUse} />;
        }}
      </CombinedConsumers>
    );
  };
}
