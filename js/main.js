document.addEventListener("DOMContentLoaded", () => {
    
    createSquares();
    let guessedWords = [[]] /*array of array */
    let availableSpace = 1;

    let guessedWordCount = 0;

    let word = "dairy";

    const keys = document.querySelectorAll('.keyboard-row button')/*returns nodelist*/

    function getCurrentWordArr() {
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords -1];
    }

    function updateGuessedWords(letter) {
        const currentWordArr = getCurrentWordArr()

        if (currentWordArr && currentWordArr.length <5) {
            currentWordArr.push(letter);
            const availableSpaceEl = document.getElementById(String(availableSpace));
            availableSpace = availableSpace+1;

            availableSpaceEl.textContent = letter;

        }

    }

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);
    
        if (!isCorrectLetter) {
          return "rgb(58, 58, 60)";
        }
    
        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = letter === letterInThatPosition;
    
        if (isCorrectPosition) {
          return "rgb(83, 141, 78)";
        }
    
        return "rgb(181, 159, 59)";
      }

    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr();
        if(currentWordArr.length != 5) {
            window.alert("word must be 5 letters");
        }

        const currentWord = currentWordArr.join('');

        /*go through each letter & check */
        const firstLetterId = guessedWordCount *5 +1; /*get index of 30 array square*/
        const interval = 200; /*ms*/

        currentWordArr.forEach((letter, index) => {
            /*special javascrpt func, executes after certain time */
            setTimeout(() => {
              const tileColor = getTileColor(letter, index);
              const letterId = firstLetterId + index;
              const letterEl = document.getElementById(letterId);
              letterEl.classList.add("animate__flipInX");
              letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
            }, interval * index);
          });

        guessedWordCount += 1;

        if (currentWord === word) {
            window.alert("congrats");
        }


        if(guessedWords.length===6) {
            window.alert(`sorry. the word is ${word}`);
        }
        guessedWords.push([]); /*create another row */

    }


    function createSquares() {
        const gameBoard = document.getElementById("board");
    
        for (let index = 0; index < 30; index++) {
          let square = document.createElement("div");
          square.classList.add("square");
          square.classList.add("animate__animated"); 
          square.setAttribute("id", index + 1);
          gameBoard.appendChild(square);
        }
    }

    function handleDeleteLetter() {
        const currentWordArr = getCurrentWordArr();
        const removedLetter = currentWordArr.pop()

        guessedWords[guessedWords.length -1] = currentWordArr;
        const lastLetterEl = document.getElementById(String(availableSpace -1));
        lastLetterEl.textContent= '';
        availableSpace = availableSpace -1;

    }

    console.log(keys)/*array of buttons */

    for (let i=0; i<keys.length; i++) {
        /*onclick on the button sends an event which has a target property*/
        keys[i].onclick = (event) => {
            /* event is PointerEvent, with bunch of attributes 
            event.target is a button*/
            const target = event.target;
            console.log(event) 
            console.log(target) 
            const letter = target.getAttribute("data-key");
            if (letter === "enter") {
                handleSubmitWord();
                return;
            }
            if (letter === "del") {
                handleDeleteLetter();
                return;
            }
            console.log(letter);

            updateGuessedWords(letter);
        }
    }




})