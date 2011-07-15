var parser = require('./lib/parse-js.js');

var Tokens = function (source) {
  var next   = parser.tokenizer(source);
  var token  = next();

  this.tokens = [];
  this.cur    = -1;
  while (token.type != 'eof') {
    this.tokens.push(token);
    token = next();
  }
}

Tokens.prototype = {
  step: function () {
    this.cur++;
    if (this.cur < this.tokens.length)
      return this.current();
  },

  stepUntil: function (type, value) {
    var token = this.step();
    while (token.type != type || token.value != value)
      token = this.step();
    return token;
  },

  next: function () {
    if (this.cur < this.tokens.length)
      return this.tokens[this.cur + 1];
  },

  prev: function () {
    if (this.cur > 0)
      return this.tokens[this.cur - 1];
  },

  current: function () {
    return this.tokens[this.cur];
  }
};

exports.Tokens = Tokens;