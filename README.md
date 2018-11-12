# Combine your react context consumers into one component

## How to use

Do only exists on github atm, and will probably not publish it on npm..
You could either install this repo as a package or just copy-paste the index.js file into your project.

```JSX
import CombinedConsumers from 'react-combined-context-consumers';

<CombinedConsumers
  consumers={[SomeContext.Consumer, SomeOtherContext.Consumer]}
>
  {([SomeContext, SomeOtherContext]) => {
    return (
      <TheComponentThatNeedTheseProps
        foo={SomeContext.foo}
        bar={SomeOtherContext.bar}
      />
    );
  }}
</CombinedConsumers>;
```

---

Without this package it would end up with a lot of nesting and look something like this..

```JSX
<SomeContext.Consumer>
  {(someContext) => {
    return (
      <SomeOtherContext.Consumer>
        {(someOtherContext) => {
          return (
            <TheComponentThatNeedTheseProps
              foo={someContext.foo}
              bar={someOtherContext.bar}
            />
          );
        }}
      </SomeOtherContext.Consumer>
    );
  }}
</SomeContext.Consumer>
```
