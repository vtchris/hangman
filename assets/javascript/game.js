//Hangman words - picture name.jpg should also be added to switch in the clearBoard function
var arrWords = ["jon snow", 
                "bran stark", 
                "tyrion lannister",
                "theon greyjoy",
                "petyr baelish",
                "brienne of tarth",
                "ramsay bolton",
                "tommen baratheon",
                "cersei lannister",
                "jaime lannister",
                "olenna tyrell",
                "hodor",
                "daenerys targaryen",
                "grey worm",
                "stannis baratheon"];

//Game object keeps track of current word, guessed letters, wins, and losses
var objGame = {
                "word":"",
                "img":"",
                "unguessed":"",
                "wrongGuess":[],
                "rightGuess":[],               
                "wins":0,
                "losses":0,
                "status":0 //0=new match,1=match over,2=game over
}
var letters = "abcdefghijklmnopqrstuvwxyz"

//Set our element variables
    var gameBoard = document.getElementById("gameBoard");
    var wins = document.getElementById("wins");
    var losses = document.getElementById("losses");
    var guessed = document.getElementById("guessedLetters");
    var imgHangman = document.getElementById("imgHangman");
    var imgCharacter = document.getElementById("imgCharacter");
    var txtHidden = document.getElementById("txtMobile");
    var gameOverMsg = document.getElementById("gameOverMsg");
    

    var characterSRC = "assets/images/"
    wins.innerText = "WINS: " + objGame.wins;
    losses.innerText = "LOSSES: " + objGame.losses;
    
    document.addEventListener("click", function(event) {

        if (!event.target.matches("#btnEscape")){
            return;
        }

        NextWord();

    }, false);
   
    clearBoard();    

//Resets board for new match, if more words are available in the arrWords
function clearBoard() {

    if (arrWords.length > 0) {
        objGame.status = 0
        gameOverMsg.innerHTML = "";
        imgHangman.src = "assets/images/hangman_0.png"
        objGame.wrongGuess = [];
        objGame.rightGuess = [];
        guessed.innerText = "GUESSED: " 
        objGame.word = arrWords[Math.floor(Math.random() * arrWords.length)];
        objGame.unguessed = findUniqueString(objGame.word);
        objGame.unguessed = objGame.unguessed.replace(' ', '');             
        //Remove current word from arrWords
        var iCurrentWordIdx = arrWords.indexOf(objGame.word);
        arrWords.splice(iCurrentWordIdx, 1);
        gameBoard.innerText = hideUnguessedLetters(objGame).toUpperCase()
        
        //assigns picture based on current word selected for match
        imgCharacter.src = ""
        characterSRC = "assets/images/"
        switch (objGame.word) {
            case "bran stark":
                characterSRC = characterSRC + "bran.jpg"
                break;
            case "brienne of tarth":
                characterSRC = characterSRC + "brienne.jpg"
                break;
            case "cersei lannister":
                characterSRC = characterSRC + "cersei.jpg"
                break;
            case "daenerys targaryen":
                characterSRC = characterSRC + "daenerys.jpg"
                break;
            case "grey worm":
                characterSRC = characterSRC + "grey.jpg"
                break;
            case "hodor":
                characterSRC = characterSRC + "hodor.jpg"
                break;
            case "jaime lannister":
                characterSRC = characterSRC + "jaime.jpg"
                break;
            case "jon snow":
                characterSRC = characterSRC + "jon.jpg"
                break;
            case "olenna tyrell":
                characterSRC = characterSRC + "olenna.jpg"
                break;
            case "petyr baelish":
                characterSRC = characterSRC + "petyr.jpg"
                break;
            case "ramsay bolton":
                characterSRC = characterSRC + "ramsay.jpg"
                break;
            case "stannis baratheon":
                characterSRC = characterSRC + "stannis.jpg"
                break;
            case "theon greyjoy":
                characterSRC = characterSRC + "theon.jpg"
                break;
            case "tommen baratheon":
                characterSRC = characterSRC + "tommen.jpg"
                break;
            case "tyrion lannister":
                characterSRC = characterSRC + "tyrion.jpg"
                break;

        }
    } else{
        gameBoard.innerHTML = "GAME OVER"
    }

}

function playTheme(){
    var audio = new Audio('https://upload.wikimedia.org/wikipedia/en/a/a8/Game_of_Thrones_Main_Title_sample.ogg');
    audio.play();
}

//Finds unique letters in word string
function findUniqueString(str){
    var unique = "";

    for(var i=0;i < str.length;i++){

        if(unique.indexOf(str.charAt(i)) == -1){
            unique += str[i];
        }        
    }
    return unique
}
//Replaces unguessed letters with _ to be displayed to user
function hideUnguessedLetters(objGame){
    
    displayWord = objGame.word
    var sLetter = ""
       
    for(var i=0;i < objGame.unguessed.length; i++){
                
        sLetter = objGame.unguessed.charAt(i) 
                
        for(var x=0;x<objGame.word.length;x++){
            if (objGame.word.charAt(x) == ' '){
                //do nothing
            }
            else if (objGame.word.charAt(x) == sLetter){
                displayWord = displayWord.replace(sLetter,'_');
                //console.log(x + ' ' + objGame.word.charAt(x))
            }

        }

    }
    return displayWord
}
function NextWord(){

    //If match was not yet won or lost, put word back in circulation.
    if (objGame.status == 0){
        arrWords.push(objGame.word);
    }

    clearBoard();
}

//Actions that occur when user types
document.onkeyup = function (event) {

    //Get key typed and put into lower case
    
    userSelection = event.key;  
    userSelection = userSelection.toLowerCase();
    
    if (txtHidden.value.length > 0){
        txtHidden.value = '';
    }
  
    //If escape is pushed, reset the board
    if (userSelection === "escape" || userSelection === "esc"){

        NextWord();

    //Continue if game has not been won or lost yet
    }else if (objGame.status == "0"){

       
        //Check if letter is part of the word, and not yet guessed
        if (objGame.unguessed.indexOf(userSelection) > -1 ){
            objGame.rightGuess.push(userSelection);
            objGame.unguessed =  objGame.unguessed.replace(userSelection,'');
            gameBoard.innerText = hideUnguessedLetters(objGame).toUpperCase()
         
        //Letter is not part of the word    
        } else if(letters.indexOf(userSelection) > -1) {

            //Proceed if letter has not been guessed before
            if (objGame.wrongGuess.indexOf(userSelection) < 0 && objGame.rightGuess.indexOf(userSelection) < 0) {
                //Record wrong guess and update hangman image
                objGame.wrongGuess.push(userSelection);
                imgHangman.src = "assets/images/hangman_" + objGame.wrongGuess.length + ".png"

                //If hangman image is complete, record loss and reveal word
                if (objGame.wrongGuess.length >= 9) {
                    playTheme();
                    objGame.losses = objGame.losses + 1
                    objGame.status = "1";
                    losses.innerText = "LOSSES: " + objGame.losses
                    gameBoard.innerText = objGame.word.toUpperCase();
                }

            }
            
        }
            //Displayed guessed letters in alphabetical order
            var arrGuessed = objGame.rightGuess.concat(objGame.wrongGuess);
            var guessedMessage = ""

            for(var i=0;i < arrGuessed.length;i++){
                arrGuessed[i] = arrGuessed[i].toUpperCase();
            }
            arrGuessed = arrGuessed.sort();
            guessed.innerText = "GUESSED: " + arrGuessed.join(" ")
           
        //If match is won, update wins
        if(objGame.unguessed.length==0){
            playTheme()
            objGame.wins = objGame.wins + 1;
            objGame.status = "1";
            wins.innerText = "WINS: " + objGame.wins;
        }
        //If the match is ended (won or lost) reveal the character image
        if (objGame.status > 0){
            gameOverMsg.innerHTML = "Press Escape to continue, if you dare!";
            imgCharacter.src = characterSRC
        } 
       
    }
    
    
}
