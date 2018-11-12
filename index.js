import React, { Component } from 'react';

class CombinedConsumers extends Component {
  renderConsumer(Consumer, consumerIndex, combinedContext) {
    consumerIndex++;
    const isLastConsumer = this.props.consumers.length <= consumerIndex;

    if (isLastConsumer) {
      return (
        <Consumer>
          {context => {
            combinedContext.push(context);

            return this.props.children(combinedContext);
          }}
        </Consumer>
      );
    }

    return (
      <Consumer>
        {context => {
          combinedContext.push(context);

          return this.renderConsumer(
            this.props.consumers[consumerIndex],
            consumerIndex,
            combinedContext
          );
        }}
      </Consumer>
    );
  }

  render() {
    let combinedContext = [];
    let consumerIndex = 0;
    let consumer = this.props.consumers[consumerIndex];

    return this.renderConsumer(consumer, consumerIndex, combinedContext);
  }
}

export default CombinedConsumers;
