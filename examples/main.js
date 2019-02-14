import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { CounterContext, CounterStore } from './CounterStore';
import { applyConsumerProps } from '../lib/index.es';

class SomeComponentDeepDown extends Component {
  render() {
    return (
      <div>
        <p>{this.props.counter.value}</p>
        <button onClick={this.props.counter.increment}>Increment</button>
        <button onClick={this.props.counter.decrement}>Decrement</button>
      </div>
    );
  }
}

const SomeComponentDeepDownWithCounterProps = applyConsumerProps(
  // The component
  SomeComponentDeepDown,
  // Consumers to listen to
  [CounterContext.Consumer],
  // Optional: function where we can decide what things we will use from the props.
  // if not applied everything will be directly on the props. e.g. this.props.increment
  ([counter]) => {
    return { counter };
  }
);

class App extends Component {
  render() {
    return (
      <CounterStore>
        <p>App</p>
        <SomeComponentDeepDownWithCounterProps />
      </CounterStore>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
