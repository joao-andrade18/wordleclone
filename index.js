/* TECLADO */

/*["Q","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["ENTER","Z","X","C","V","B","N","M","DEL"]*/

var height = 6;
var width = 5;
var row = 0;
var col = 0;
var fimDeJogo = false;

var bancoDePalavras = ["teste","terra","certo"]
var adivinha = ["teste","terra","certo","nobre","desde"]

adivinha = adivinha.concat(bancoDePalavras);

var palavra = bancoDePalavras[Math.floor(Math.random()*bancoDePalavras.length)].toUpperCase();
console.log(palavra) 

window.onload = function(){
    initialize();
}

function initialize() {
    for (let i = 0; i < height; i++){

        for (let c = 0; c < width; c++){
            let tile = document.createElement("span");
            tile.id = i.toString()+ "-"+ c.toString();
            tile.classList.add("tile");
            tile.innerText = " ";
            document.getElementById("board").appendChild(tile);
        }
    }



    //Teclado
    let keyboard = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"," "],
    ["ENTER","Z","X","C","V","B","N","M","DEL"]
]


for (let i = 0; i < keyboard.length; i++) {
    let currRow = keyboard[i];
    let keyboardRow = document.createElement("div");
    keyboardRow.classList.add("keyboard-row");

    for (let j = 0; j < currRow.length; j++) {
        let keyTile = document.createElement("div");
        let key = currRow[j];
        keyTile.innerText = key;
        if (key == "ENTER"){
            keyTile.id = "Enter";
        }
        else if (key == "DEL"){
            keyTile.id = "Backspace"
        }
        else if ("A"<= key && key <= "Z")
        {
            keyTile.id = "Key" + key
        }
        keyTile.addEventListener("click",processKey);

        if (key == "Enter") {
            keyTile.classList.add("enter-key-tile");
        }else {
            keyTile.classList.add("key-tile");
        }
        keyboardRow.appendChild(keyTile);
    }
    document.body.appendChild(keyboardRow);
}
document.addEventListener("keyup", (e) => {
    processInput(e);
})
}

function processKey(){
    e = {"code" : this.id};
    processInput(e);
}

function processInput(e){
    if (fimDeJogo) return;

    if("KeyA" <= e.code && e.code <= "KeyZ"){
        if (col < width){
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            if (currTile.innerText == " ") {
                currTile.innerText = e.code[3];
                col+=1
            }
        }
    }
    else if (e.code == "Backspace") {
        if (0 < col && col <= width) {
            col -= 1;
        }
        let currTile = document.getElementById(row.toString()+ '-' + col.toString());
        currTile.innerText = " ";

    }
    else if (e.code == "Enter") {
        update();
    }

    if (!fimDeJogo && row == height) {
        fimDeJogo = true;
        document.getElementById("answer").innerText = palavra;
    }
}

function update() {
    let guess = "";
    document.getElementById("answer").innerText = "";

    for (let c= 0; c < width; c++) {
        let currTile = document.getElementById(row.toString()+ '-'+ col.toString());
        let letter = currTile.innerText;
        guess += letter;
    }
    guess = guess.toLocaleLowerCase();
    console.log(guess);

    if (!adivinha.includes(guess)) {
        document.getElementById("answer").innerText = "Não está correto";
        return;
    }

    let correct = 0;
    let letterCount = {};
    for (let i = 0; i < palavra.length; i++) {
        let letter = palavra[i];
        if (letterCount[letter]){
            letterCount[letter]+=1;
        }
        else {
            letterCount[letter]= 1;
        }
    }
    console.log(letterCount);

    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString()+ '-'+ col.toString());
        let letter = currTile.innerText;


        if(palavra[c] == letter){
            currTile.classList.add("correct");

            let keyTile = document.getElementById("Key" + letter)
            keyTile.classList.remove("present");
            keyTile.classList.add("correct");
            correct+=1;
            letterCount[letter] -= 1;
        }
        if (correct == width) {
            fimDeJogo = true;

        }
    }
    console.log(letterCount);

    for (let c = 0; c < width; c++){
        let currTile = document.getElementById(row.toString()+'-'+col.toString());
        let letter = currTile.innerText;

        if(!currTile.classList.contains("correct")){
          if (palavra.includes(letter)&& letterCount[letter]>0){
              currTile.classList.add("present");

              let keyTile = document.getElementById("Key"+ letter);
              if (!keyTile.classList.contains("correct")){
                  keyTile.classList.add("present");   
              }
              letterCount[letter] -= 1;
          }
          else{
              currTile.classList.add("absent");
              let keyTile = document.getElementById("Key" + letter);
              keyTile.classList.add("absent");
          }  
        }
    }
    row += 1;
    col = 0;
  }

        