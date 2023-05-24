export default {

  getLyricsArray: (data) => {
    let words = []

    for (var i = 0; i < data.lines.length; i++) {
      words.push(data.lines[i].words)
    }

    return words
  },
  getLyricsString: (data) => {
    let words = ''

    for (var i = 0; i < data.lines.length; i++) {
      words = words + data.lines[i].words + '\n'
    }

    return words
  }

};


