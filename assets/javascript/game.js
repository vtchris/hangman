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

var objGame = {
                "word":"",
                "unguessed":"",
                "wrongGuess":[],
                "rightGuess":[],
                "totalGuess":[],
                "wins":0,
                "losses":0,
                "status":0 //0=new match,1=match over,2=game over

}
//document.addEventListener('DOMContentLoaded', function(event) {
    var gameBoard = document.getElementById("gameBoard");
    var wins = document.getElementById("wins");
    var losses = document.getElementById("losses");
    var guessed = document.getElementById("guessedLetters");
    var imgHangman = document.getElementById("imgHangman");

    wins.innerText = "WINS: " + objGame.wins;
    losses.innerText = "LOSSES: " + objGame.losses;
   
    clearBoard();    
 //})


function clearBoard() {

    if (arrWords.length > 0) {
        objGame.status = 0
        imgHangman.src = "assets/images/hangman_0.png"
        objGame.wrongGuess = [];
        objGame.rightGuess = [];
        guessed.innerText = "GUESSED: " 
        objGame.word = arrWords[Math.floor(Math.random() * arrWords.length)];
        objGame.unguessed = findUniqueString(objGame.word);
        objGame.unguessed = objGame.unguessed.replace(' ', '');             
        var iCurrentWordIdx = arrWords.indexOf(objGame.word);
        arrWords.splice(iCurrentWordIdx, 1);
        gameBoard.innerText = hideUnguessedLetters(objGame).toUpperCase()
    }

}

function findUniqueString(str){
    var unique = "";

    for(var i=0;i < str.length;i++){

        if(unique.indexOf(str.charAt(i)) == -1){
            unique += str[i];
        }        
    }
    return unique
}
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
                console.log(x + ' ' + objGame.word.charAt(x))
            }

        }

    }
    return displayWord
}

document.onkeyup = function (event) {
    userSelection = event.key;
    userSelection = userSelection.toLowerCase();
  
    if (userSelection === "escape"){
        clearBoard();

    }else if (objGame.status == "0"){

       console.log("status " + objGame.status)
        
        if (objGame.unguessed.indexOf(userSelection) > -1 ){
            objGame.rightGuess.push(userSelection);
            objGame.unguessed =  objGame.unguessed.replace(userSelection,'');
            
            
        }else{
            
            if(objGame.wrongGuess.indexOf(userSelection)  < 0 && objGame.rightGuess.indexOf(userSelection) < 0){           
                objGame.wrongGuess.push(userSelection);            
                               imgHangman.src = "assets/images/hangman_" + objGame.wrongGuess.length + ".png"
                

                if(objGame.wrongGuess.length >= 9){
                    objGame.losses = objGame.losses + 1
                    objGame.status = "1";
                    losses.innerText = "LOSSES: " + objGame.losses
                    
                }

            }
            console.log("wrong guess len: " + objGame.wrongGuess.length )     

        }

        //console.log("right guess " + objGame.rightGuess)
            var arrGuessed = objGame.rightGuess.concat(objGame.wrongGuess);
            var guessedMessage = ""

            for(var i=0;i < arrGuessed.length;i++){
                arrGuessed[i] = arrGuessed[i].toUpperCase();
            }
            arrGuessed = arrGuessed.sort();
            console.log("RIGHT: " + objGame.rightGuess )
            console.log("Wrong: " + objGame.wrongGuess)
            

            guessed.innerText = "GUESSED: " + arrGuessed.join(" ")
           

        if(objGame.unguessed.length==0){
            objGame.wins = objGame.wins + 1;
            objGame.status = "1";
            wins.innerText = "WINS: " + objGame.wins;
        }
        gameBoard.innerText = hideUnguessedLetters(objGame).toUpperCase()

    }

}
