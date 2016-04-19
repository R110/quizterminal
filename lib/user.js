var read = require('read')
var Quiz = require('./quiz.js')
var Question = require("./question.js")


var User = (function() {
   var nextId = 1;
   var userList = []
   return function (name) {
      this.name = name;
      this.id = nextId++;
      userList.push(this.name)
      this.userList = userList
   }
})();

User.prototype.start = function(){
   read({prompt: "New User? y/n \n>"}, this.newUserResponse.bind(this))
}

User.prototype.newUserResponse = function (err,input){
  input === "y" ? this.makeUserName() : this.login()
}

User.prototype.makeUserName = function(){
  read({prompt: "Make user name: "}, this.createUser.bind(this))
}

User.prototype.createUser = function(err,input){
  if (err) {throw err}
  new User(input)
  console.log("New User Created-- Redirecting to login now:");
  this.login()
}

User.prototype.login = function() {
  read({prompt: "LoginID:"}, this.setUser.bind(this))
}

User.prototype.setUser = function (err,input) {
    var user = this.userList.filter(function (user){
      return user === input
    })[0]

    if(user) {
      console.log("Logging in...")
      var quiz = new Quiz([ new Question("Capital of GA?", "Atlanta"),
                            new Question("Capital of VA?","Richmond"),
                            new Question("Capital of MT?", "Helena")
                          ], user);
      quiz.initiate()
     } else {
       console.log("Invalid user\n Redirecting.")
      this.start()
     }
}

module.exports = User
