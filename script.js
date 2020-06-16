var arr =[[],[],[],[],[],[],[],[],[]] //DOM
var temp =[[],[],[],[],[],[],[],[],[]] // for reference
var board = [[],[],[],[],[],[],[],[],[]] // variable


let solve = document.getElementById('solve')
let button = document.getElementById('generate-sudoku')



for(let i=0;i<9;i++){
    for(let j=0;j<9;j++){
        arr[i][j]= document.getElementById(i*9 + j);
    }
}


function initializeTemp(temp){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            temp[i][j]= false;
        }
    }
}

function resetColor(){
     for(var i=0;i<9;i++) {
        for (var j=0;j<9;j++) {
            arr[i][j].style.color = "green";
        }
    }
    
}
function setTemp(board,temp){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(board[i][j]!=0){
                temp[i][j]=true;
                    
            }
        }
    }
}

function setColor(temp){
    for (var i=0;i<9;i++) {
        for (var j=0;j<9;j++) {
            if (temp[i][j] == true) {
                arr[i][j].style.color = "#DC3545";
            }
        }
    }
}
function changeBoard(board){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(board[i][j]!=0){
                arr[i][j].innerText = board[i][j];
            }
            else{
                arr[i][j].innerText = '';
            }
        }
    }   
}

// XMLHttpRequest
button.onclick = function(){
    
   var xmlhttp = new XMLHttpRequest();
   method = 'GET';
   url = 'https://sugoku.herokuapp.com/board?difficulty=easy';
    
   xmlhttp.open(method, url, true); 
   xmlhttp.onload = function () {
        
        var response = JSON.parse(xmlhttp.response);
        //console.log(response)
        initializeTemp(temp);  //set temp = false
        resetColor();     //   set dom color = green;
       
        board = response.board;
        setTemp(board, temp);     // set temp = true for board!=0
        setColor(temp);           // set dom color = red for board!=0
        changeBoard(board);        // set dom = board';
   };
   xmlhttp.send();
}


// backtracking code

function isPossible(board,rows,cols,no){
    
    for(let i=0;i<9;i++){      // check in column
        if(board[rows][i]==no){
            return false;
        }
    }
    
    for(let i=0;i<9;i++){   // check in rows
        if(board[i][cols]==no){
            return false;
        }
    }
    
    //var rowStart= rows - rows%3; 
    //var colStart= cols - cols%3;
    var rowStart = (Math.floor(rows/3) * 3 ); 
    var colStart = (Math.floor(cols/3) * 3 ); 
    for(var i = rowStart;i<rowStart+3;i++){
        for(var j=colStart;j<colStart+3;j++){
            if(board[i][j]==no){
                return false;
            }
        }
    }
    return true;
}
function solveSudokuHelper(board,rows,cols){
    if(rows==9){
        changeBoard(board);
        return;
    }
    if(cols==9){
        solveSudokuHelper(board,rows+1,0);
        return;
    }
    if(board[rows][cols]!=0){
        solveSudokuHelper(board,rows,cols+1);
        return;
    }
    
    for(var k=1;k<=9;k++){
        
        if(isPossible(board,rows,cols,k)){
            board[rows][cols]=k;
            solveSudokuHelper(board,rows,cols+1);
            board[rows][cols]=0;
        }
    }
    
}
function solveSudoku(board){
    
    solveSudokuHelper(board,0,0);
    
}
solve.onclick = function(){
    solveSudoku(board);
}