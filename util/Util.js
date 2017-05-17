// let i = 10
// while(i > 0){
//   console.log(randomAlphaNumeric(i));
//   i--
//}
// exports.sayHelloInEnglish = function() {
//   return "HELLO";
// };

module.exports = {
  randomAlphaNumeric: function (length) {
      let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
      return result;
  },

  sayHelloInSpanish: function() {
    return "Hola";
  }
}
