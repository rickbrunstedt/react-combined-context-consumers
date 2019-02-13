import React, { Component } from 'react';

export const CounterContext = React.createContext(null);

export class CounterStore extends Component {
  state = {
    value: 0,
  };

  increment = () => {
    this.setState({ value: this.state.value + 1 });
  };

  decrement = () => {
    this.setState({ value: this.state.value - 1 });
  };

  render() {
    const { increment, decrement } = this;

    return (
      <CounterContext.Provider value={{ ...this.state, increment, decrement }}>
        {this.props.children}
      </CounterContext.Provider>
    );
  }
}
