const {foo, bar} = require('./src/foo')

const o = {
  a: 1,
  b: 'foo',
  c: [1,2,3],
  d: ['foo', 'bar'],
  e: [1, 'foo'],
  f: null
}

function baz() {
  return o
}

function boo() {
  return args => {
    return args * 2
  }
}

module.exports = {
  foo,
  bar,
  baz,
  boo
}