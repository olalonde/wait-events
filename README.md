# wait-events

[![Build Status](https://travis-ci.org/olalonde/wait-events.svg?branch=master)](https://travis-ci.org/olalonde/wait-events)

Turn a complex [event emitter](https://nodejs.org/api/events.html) into a simple [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

## Install

```bash
npm install --save wait-events
```

## Usage

waitEvents(emitter, [ ...successEvents ], [ ...errorEvents ]) => promise

Example:

```javascript
import waitEvents from 'wait-events'

// ...

waitEvents(slack, [
  'opened_rtm_connection',
  'authenticated',
], [
  'failed_authentication',
  'ws_error',
  'ws_close',
]).then(() => {
  console.log('Slack client connected!')
}).catch((err) => {
  console.error('Failed connecting to Slack')
  console.error(err)
})

slack.start()
```

