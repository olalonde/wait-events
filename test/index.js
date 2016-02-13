import test from 'blue-tape'
import { EventEmitter } from 'events'
import waitEvents from '../src/'

test('success event', (t) => {
  const emitter = new EventEmitter()
  const p = waitEvents(emitter, ['success']).then((res) => {
    t.equal(res.somevar, 'someval')
  })
  process.nextTick(() => {
    emitter.emit('success', { somevar: 'someval' })
  })
  return p
})

test('fail event', (t) => {
  const emitter = new EventEmitter()
  const p = waitEvents(emitter, ['success'], ['error']).catch((err) => {
    t.equal(err.message, 'some err')
  })
  process.nextTick(() => {
    emitter.emit('error', new Error('some err'))
  })
  return p
})

test('success then fail event', (t) => {
  t.plan(1)
  const emitter = new EventEmitter()
  waitEvents(emitter, ['success'], ['some-error']).then((res) => {
    t.equal(res, 'yay')
  })
  process.nextTick(() => {
    emitter.emit('success', 'yay')
    emitter.emit('some-error', new Error('some err'))
  })
})
