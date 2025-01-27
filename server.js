const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req.query);
  if (req.query.constructor === Object && Object.keys(req.query).length === 0) {
    res.send("No request attached");
  } else {
    const { letters } = req.query;
    const output = JSON.stringify(spellingBee(letters));
    res.json(output);
  }
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});

const fs = require("fs");

function checkWord(word, letters) {
  var primaryLetter = false;

  for (let i = 0; i < word.length; i++) {
    var inWord = false;

    for (let j = 0; j < letters.length; ++j) {
      if (word.charAt(i) == letters[j]) {
        if (j == 0) {
          primaryLetter = true;
        }
        inWord = true;
        break;
      }
    }
    if (!inWord) {
      return false;
    }
  }
  return primaryLetter;
}

function spellingBee(letters) {
  var file = fs.readFileSync("wordlist.txt", { encoding: "utf8" });
  var words = file.split("\n"); // create array of word dictionary

  var letterArray = letters.split(""); // create array of letters
  for (let i = 0; i < letterArray.length; i++) {
    // put center letter at index 0
    if (letterArray[i] == letterArray[i].toUpperCase()) {
      [letterArray[0], letterArray[i]] = [letterArray[i], letterArray[0]];
    }
    letterArray[i] = letterArray[i].toUpperCase();
  }

  var output = [];
  for (let i = 0; i < words.length; i++) {
    if (checkWord(words[i], letterArray)) {
      output.push(words[i]);
    }
  }

  return output;
}
