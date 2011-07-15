var Tokens = require('./tokens.js').Tokens;

var lint = function (source) {
  "use strict";

  var scopes = [ ['(global)', []] ];
  var tokens = new Tokens(source);
  var token;

  function processArguments() {
    var cur   = tokens.step();
    var scope = scopes.pop();

    while (cur.type != 'punc' || cur.value != ')') {
      if (cur.type == 'name')
        scope[1].push(cur.value);
      cur = tokens.step();
    }

    scopes.push(scope);
  }

  while (tokens.step()) {
    token = tokens.current();

    if (token.type == 'keyword' && token.value == 'function') {
      scopes.push([ '(func)', []]);
      tokens.stepUntil('punc', '(');
      processArguments();
    }
  }

  return scopes;
};

exports.lint = lint;