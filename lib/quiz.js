var read = require("read")

var Quiz = function(questions,user){
  this.user = user
  this.questions = questions
  this.currentQuestionIndex = 0
  this.wrongAnswers = 0
  this.totalPoints = 0
  this.bonusQuestion = this.questions[Math.floor(Math.random()* this.questions.length)]
}

Quiz.prototype.initiate = function(){
  console.log("******\nThe quiz will now begin," + this.user + " You will be permitted 3 wrong answers.\n********")
  this.askQuestion()
}

Quiz.prototype.askQuestion = function(){
   currentQuestion = this.questions[this.currentQuestionIndex]
   read({prompt: currentQuestion.prompt}, this.questionResult.bind(this))
}
Quiz.prototype.questionResult = function(err, answer){
  var currentQuestion = this.questions[this.currentQuestionIndex]
  var correctAnswer = currentQuestion.correct(answer)

  if (correctAnswer) {
    console.log("Right")
    this.currentQuestionIndex++
    this.calcPointTotal(currentQuestion, correctAnswer)
    this.displayPointTotal()
    if (this.isFinalQuestion()) {console.log("Quiz Complete"); return}
    this.askQuestion()
  } else {
    console.log("Wrong")
    this.wrongAnswers++
    this.calcPointTotal(currentQuestion, correctAnswer)
    this.displayPointTotal()
    if (this.wrongAnswers === 3){
      console.log("\nYou're done")
      return
    }
    this.askQuestion()
  }
}

Quiz.prototype.calcPointTotal = function(question, correctAnswer){
  var bonusDouble = (question === this.bonusQuestion ? 2 : 1)
  if (correctAnswer){
     bonusDouble === 2 ? console.log("**Bonus Double**") : null
     this.totalPoints += currentQuestion.pointValue * bonusDouble
   } else {
     this.totalPoints -= currentQuestion.pointValue
   }
}

Quiz.prototype.displayPointTotal = function(question){
  console.log("Your point total: " + this.totalPoints);
}

Quiz.prototype.isFinalQuestion = function(){
  return this.currentQuestionIndex === this.questions.length
}

module.exports = Quiz
