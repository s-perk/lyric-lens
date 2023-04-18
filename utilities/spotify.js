export default {

  getLyrics: (data) => {
    let words = []

    for (var i = 0; i < data.lines.length; i++) {
      words.push(data.lines[i].words)
    }

    return words
  }

}