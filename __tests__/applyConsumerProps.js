import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import renderer from 'react-test-renderer';

import { CounterContext, CounterStore } from '../examples/CounterStore';
import { applyConsumerProps } from '../src';

function CompDeepDown(props) {
  return (
    <div>
      <p id="value">{props.counter.value}</p>
      <button id="increment" onClick={props.counter.increment}>
        increment
      </button>
      <button id="decrement" onClick={props.counter.decrement}>
        decrement
      </button>
    </div>
  );
}

const CompDeepDownWithCounterProps = applyConsumerProps(
  CompDeepDown,
  [CounterContext.Consumer],
  ([counter]) => {
    return { counter };
  }
);

class App extends Component {
  render() {
    return (
      <CounterStore>
        <CompDeepDownWithCounterProps />
      </CounterStore>
    );
  }
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should increase and decrease value of CounterContext', () => {
  const component = renderer.create(<App />);
  const instance = component.root;

  let value = instance.findByProps({ id: 'value' }).children;
  expect(value).toEqual(['0']);

  instance.findByProps({ id: 'increment' }).props.onClick();
  value = instance.findByProps({ id: 'value' }).children;
  expect(value).toEqual(['1']);

  instance.findByProps({ id: 'decrement' }).props.onClick();
  value = instance.findByProps({ id: 'value' }).children;
  expect(value).toEqual(['0']);
});
