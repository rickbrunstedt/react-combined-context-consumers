import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { CounterContext, CounterStore } from './CounterStore';
import { applyConsumerProps, CombinedConsumers } from '../src/index';

class SomeComponentDeepDown extends Component {
  render() {
    return (
      <div>
        <p>SomeComponentDeepDownWithCounterProps</p>
        <p>{this.props.value}</p>
        <button onClick={this.props.increment}>Increment</button>
        <button onClick={this.props.decrement}>Decrement</button>
      </div>
    );
  }
}
const SomeComponentDeepDownWithCounterProps = applyConsumerProps(
  // The component
  SomeComponentDeepDown,

  // Consumers to listen to
  [CounterContext.Consumer /* We can pass several conumers here */]

  /* 
    Optional: function where we can decide what things we will use from the props.
    if not applied everything will be directly on the props. e.g. this.props.increment
    But if we want to rearange we can do that like this:
    ([counter]) => {
      return { counter };
    }
  */
);

class ComponentWithoutProps extends Component {
  render() {
    return (
      <div>
        <p>ComponentWithoutProps</p>

        <CombinedConsumers consumers={[CounterContext.Consumer]}>
          {([counter]) => {
            return (
              <div>
                <p>{counter.value}</p>
                <button onClick={counter.increment}>Increment</button>
                <button onClick={counter.decrement}>Decrement</button>
              </div>
            );
          }}
        </CombinedConsumers>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <CounterStore>
        <p>App</p>
        <SomeComponentDeepDownWithCounterProps />
        <ComponentWithoutProps />
      </CounterStore>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
