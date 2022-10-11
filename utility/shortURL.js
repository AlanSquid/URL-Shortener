function generateShorURL() {
  let shortURL = 'http://shorturl.herokuapp.com/' + generateRandomString(5)
  return shortURL
}

function generateRandomString(stringLength) {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'
  const collection = lowerCaseLetters + upperCaseLetters + numbers

  let randomString = ''
  for (let i = 0; i < stringLength; i++) {
    const randomIndex = Math.floor(Math.random() * collection.length)
    randomString += collection[randomIndex]
  }
  return randomString
}

console.log(shorten())

