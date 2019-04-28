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
               // "displayWord":"",
                "wrongGuess":[],
                "rightGuess":[],
                "unguessed":[],
                "score":0

}
document.addEventListener('DOMContentLoaded', function(event) {
    var gameBoard = document.getElementById("gameBoard");
    var wins = document.getElementById("wins");

    wins.innerText = "WINS: " + objGame.score;
    clearBoard();
    
  })


function clearBoard(){
    objGame.word =  arrWords[Math.floor(Math.random() * arrWords.length)];
    objGame.unguessed = findUniqueString(objGame.word);
    objGame.unguessed = objGame.unguessed.replace(' ','');

    var sCurrentWordIdx = arrWords.indexOf(objGame.word);
    arrWords.splice(sCurrentWordIdx,1);

    gameBoard.innerText = hideUnguessedLetters(objGame).toUpperCase()
    //console.log(arrWords);
}



//alert(objGame.unguessed);
//alert(hideUnguessedLetters(objGame));


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



       // displayWord = replaceAll(displayWord, sLetter, "_ ");
    }

    return displayWord

}

/*
function replaceAll(str, term, replacement) {
    return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement);
  }
  function escapeRegExp(string){
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
*/

//alert(findUniqueString(objGame.word.replace(' ','')));

//alert(objGame.unguessed);


document.onkeyup = function (event) {
    userSelection = event.key;
    userSelection = userSelection.toLowerCase();

    console.log(userSelection)

    if (userSelection === "escape"){
        clearBoard();

    }else{

        if (objGame.unguessed.indexOf(userSelection) > -1 ){
            objGame.rightGuess.push(userSelection);
            objGame.unguessed =  objGame.unguessed.replace(userSelection,'');
            
        }else{
            objGame.wrongGuess.push(userSelection);
        }
    
        console.log("hi " + objGame.unguessed.length + " " + objGame.unguessed + " " + objGame.score)

        if(objGame.unguessed.length==0){
            console.log("IM IN")
            objGame.score = objGame.score + 1;
            wins.innerText = "WINS: " + objGame.score;
        }
        gameBoard.innerText = hideUnguessedLetters(objGame).toUpperCase()

    }



    
    //lantralert(hideUnguessedLetters(objGame).toUpperCase());
    //alert(objGame.wrongGuess);
}
