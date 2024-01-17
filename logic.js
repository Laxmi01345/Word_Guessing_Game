const gridItems = document.querySelectorAll(".grid-container .grid-item");

const buttons = document.querySelectorAll(".alphabets .firstpara .btn, .alphabets .firstpara .btn1");
const enter = document.querySelector(".alphabets .firstpara #btn1");
const resetBtn = document.querySelector(".reset-btn"); // Select the reset button
const deleteback=document.querySelector("#delbtn");

let index = 0;
let row = 5;
let word = '';
let word2 = '';
buttons.forEach(function (btn) {
    let btnvalue;
    btn.addEventListener('click', function () {

        
        if (btn.innerText != "Enter") {
            btnvalue = btn.innerText;
        } else {
            btn.innerText = "";
        }


        print(btnvalue);

    });
});

deleteback.addEventListener('click', function () {
    deleteLastCharacter();
});
function deleteLastCharacter() {
    if (index % row === 0 && gridItems[index].innerText !== "") {
        // At the beginning of a new row and the current grid item has text, erase the text
        gridItems[index].innerText = "";
    } else if (index > 0) {
        console.log(index);
        if (index % row === 0 && gridItems[index - 1].innerText !== "") {
            // If at the beginning of a new row and the previous grid item has text, erase its text
            gridItems[index - 1].innerText = "";
        } else {
            // Otherwise, move back two positions and erase the text
            index -= 2;
            index = Math.max(index, 0);
            gridItems[index].innerText = "";
        }
        
    }
}



if (enter) {
    
    enter.addEventListener('click', function () {
        console.log("Enter button clicked. Proceeding to the next set of clicks.");
        row += 5;
        
        // console.log(word)
        let resultWord = word.match(/.{1,5}/g)?.slice(-1)[0];

        
        
        compareCharacters(resultWord, word2);


    });
}








if (resetBtn) {
    resetBtn.addEventListener('click', function () {
        clearGrid();
        // console.log("Reset button clicked. Changing word2.");
        api(); // Call the API to get a new word2
    });
}

function print(btnvalue) {
    
    while (index < gridItems.length && gridItems[index].innerText !== "") {
        index++;
    }


    if (index < row) {
        gridItems[index].innerText = btnvalue;
        
        word += btnvalue;

        index++;
        

    }
    
    
}





async function api() {
    const url = 'https://random-word-api.vercel.app/api?words=1&length=5&type=capitalized';

    try {
        const response = await fetch(url);
        const result = await response.text();
        word2=result;
        console.log("Answer: ", word2)

      
        
    } catch (error) {
        console.error(error);
    }


}

function clearGrid() {
    index = 0
    gridItems.forEach(item => {
        item.innerText = '';
        item.style.backgroundColor = '';
        item.style.color = '';
    });
}
function compareCharacters(word, word2) {
  

    let word1 = word2.replace(/[\[\]"]/g, '').toUpperCase();
    console.log(word, word1);
    if (word.length !== word1.length) {
        console.log("Words have different lengths");
        return;
    }

   
    

    gridItems.forEach((node, nodeIndex) => {
        if (!node.innerText) {
            return
        }
        
        const char1 = node.innerText;
        
        const char2 = word1.charAt(nodeIndex % 5);
        gridItems[nodeIndex].style.backgroundColor = char1 === char2 ? "green" : "red";
        
        gridItems[nodeIndex].style.color = char1 === char2 ? "white" : "black";
    })
  
}

api();


        


