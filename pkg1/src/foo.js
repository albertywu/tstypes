
function foo(x) {
  return x * 2
}

function bar(x) {
  return x + x
}

const pkg = {
  foo,
  bar
}

module.exports = pkg