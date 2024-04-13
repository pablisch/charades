export const capitaliseString = (inputString) => { 
  const smallWords = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'from', 'in', 'into', 'nor', 'of', 'on', 'or', 'over', 'so', 'the', 'to', 'with'];
  const rawWords = inputString.split(' ');
  const lowerWords = rawWords.map(word => word.toLowerCase());
  // const letters = lowerWords.map(word => word.split(''));
  const capitalisedWords = lowerWords.map((word, index) => {
    if (smallWords.includes(word) && index !== 0) {
      return word
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1)
    }
  })

  // console.log(capitalisedWords)
  return capitalisedWords.join(' ')
}