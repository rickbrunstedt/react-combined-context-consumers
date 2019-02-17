import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import renderer from 'react-test-renderer';

import { CounterContext, CounterStore } from '../examples/CounterStore';
import { CombinedConsumers } from '../src';

class App extends Component {
  render() {
    return (
      <CounterStore>
        <CombinedConsumers consumers={[CounterContext.Consumer]}>
          {([counterProps]) => {
            return (
              <div>
                <p id="value">{counterProps.value}</p>
                <button id="increment" onClick={counterProps.increment}>
                  increment
                </button>
                <button id="decrement" onClick={counterProps.decrement}>
                  decrement
                </button>
              </div>
            );
          }}
        </CombinedConsumers>
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
