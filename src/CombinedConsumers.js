import React, { Component } from 'react';

export class CombinedConsumers extends Component {
  renderConsumer(consumers, context) {
    const Consumer = consumers[0];

    return (
      <Consumer>
        {anotherContext => {
          const restOfConsumers = consumers.slice(1);
          const groupedContext = [...context, anotherContext];

          if (restOfConsumers.length > 0) {
            return this.renderConsumer(restOfConsumers, groupedContext);
          } else {
            return this.props.children(...groupedContext);
          }
        }}
      </Consumer>
    );
  }

  render() {
    return this.renderConsumer(this.props.consumers, []);
  }
}
