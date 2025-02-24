let boxes= document.querySelectorAll(".box");
let msgContainer=document.getElementsByClassName("msg-container")[0];
let msg=document.getElementById("msg");
let resetbtn=document.getElementsByTagName('button')[0];
const winningCombinations = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
let turn0=true;
window.onload=function(){
    if(turn0){
        document.getElementsByClassName('t-box')[0].style.background="red";
    }
}

boxes.forEach((box)=>{
    box.textContent="";
    box.addEventListener('click',function(){
        if (box.textContent !== "") return; // Prevent overwriting
        if(turn0){
            box.textContent="X";   
            turn0=false;
            document.getElementsByClassName('t-box')[1].style.background="red";
            document.getElementsByClassName('t-box')[0].style.background="white";
        }
        else{
            box.textContent="O";
            turn0=true;
            document.getElementsByClassName('t-box')[0].style.background="red";
            document.getElementsByClassName('t-box')[1].style.background="white";
        }
        box.classList.add('clicked');
        checkwinner();
    });
});

function checkwinner(){
 return winningCombinations.forEach((combination)=>{
    const [a,b,c]=combination;

const box1 = boxes[a];
const box2 = boxes[b];
const box3 = boxes[c];
const pos1Val = box1.innerText;
const pos2Val = box2.innerText;
const pos3Val = box3.innerText;
    if(pos1Val !=""&& pos2Val!=""&&pos3Val!=""){
        if(pos1Val == pos2Val && pos2Val == pos3Val){
            box1.style.background = "orange";
            box2.style.background = "orange";
            box3.style.background = "orange";
            todisablebox();
            showWinner(pos1Val);
        }
        else{
            checkTie();
        }
    }
  });
}

function checkTie() {
let allFilled = true; 
boxes.forEach((box) => {
if (box.textContent === "") {
    allFilled = false; // If any box is empty, set to false
}
});
if (allFilled && msgContainer.classList.contains('hide')) { // Ensure no winner is already declared
msg.innerText = "It's a Tie!";
msgContainer.classList.remove('hide');}
}

function showWinner(winner){
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove('hide');
}

function todisablebox(){
    boxes.forEach((box)=>{
        box.classList.add('clicked');
    });
}
function resetfun(){
    boxes.forEach((box)=>{
    box.textContent="";
    box.style.background = ""; 
    box.classList.remove('clicked');
});
msgContainer.classList.add('hide');
turn0=true;
document.getElementsByClassName('t-box')[0].style.background="red";
document.getElementsByClassName('t-box')[1].style.background="white";
}