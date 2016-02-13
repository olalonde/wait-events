# wait-events

[![Build Status](https://travis-ci.org/olalonde/wait-events.svg?branch=master)](https://travis-ci.org/olalonde/wait-events)

Turn a complex [event emitter](https://nodejs.org/api/events.html) into a simple [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

## Install

```bash
npm install --save wait-events
```

## How it works?

waitEvents attaches event listeners to the emitter and as soon as one
of them is called, it detaches the listeners and resolves or rejects
the promise.

Event emitters are powerful but sometimes badly implemented or poorly
documented. You should generally not use this library but it's there if
you need to.

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

You can also chain things like this:

```javascript
waitEvents(httpServer, [ 'connect' ]).then(() => {
  console.log('first http connection to server!')
  return waitEvents(httpServer, [ 'connect' ]).then(() => {
    console.log('second http connection to server!')
  })
})
```

