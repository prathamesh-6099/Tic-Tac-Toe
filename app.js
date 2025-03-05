console.log("JS running..........")
let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resetbtn");
let newgamebtn = document.querySelector("#newbtn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turno = true;
let count = 0;

const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]
const resetgame = () => {
    turno = true;
    count = 0;
    enabledboxes();
    msgcontainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turno) {
            box.innerHTML = "O"
            turno = false;

        }
        else {
            box.innerHTML = "X"
            turno = true;

        }
        box.disabled = true;
        count++;

        let isWinner = checkwinner();

        if (count === 9 && !isWinner) {
            matchDraw();
        }

    });
})

const disabledboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const enabledboxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
    }
}

const matchDraw = () => {
    msg.innerHTML = "Well Try Both of you match is Drawn";
    msgcontainer.classList.remove("hide");
    disabledboxes();

}
const showwinner = (winner) => {

    msg.innerHTML = "Congratulations winner is " + winner;
    msgcontainer.classList.remove("hide");
    disabledboxes();
}

const checkwinner = () => {
    for (pattern of winpatterns) {
        let pos1val = boxes[pattern[0]].innerHTML
        let pos2val = boxes[pattern[1]].innerHTML
        let pos3val = boxes[pattern[2]].innerHTML
        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log(pos1val, "are winner !!!!!")
                showwinner(pos1val);
                return true;
            }
        }
    }
}
newgamebtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);