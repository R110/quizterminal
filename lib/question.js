
var Question = (function (prompt, answer, id) {
  var nextId = 1
  return function(prompt, answer){
    this.prompt = prompt
    this.answer = answer
    this.id = nextId++
    this.pointValue = this.id * 2
  }
})();

Question.prototype.correct = function(input){
  return input === this.answer
}

module.exports = Question
