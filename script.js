const state = {
    1:{name:'Player 1',symbol:'X'},
    2:{name:'Player 2',symbol:'O'}
}


let filledIn = [];
let turn = 1;
let gameOver = false;

const handleClick = (event, rPos,cPos) =>{
    // console.log(event);
    const element = event.target;
    // not allow the same square to be clicked
    if(filledIn.includes(element.id) || gameOver){
        return;
    }

    element.innerHTML= state[turn].symbol;

  
    // updating the list of occupied squares
    filledIn.push(element.id)
    if(checkWinning(rPos, cPos)){
        document.getElementById('header').innerHTML=`${state[turn].name} (${state[turn].symbol}) is the winner!!!`;
        gameOver = true;
        return;
    }

    if(turn === 2 ){
        turn = 1;
    }else{
        turn++;
    }

    document.getElementById('header').innerHTML=`${state[turn].name} (${state[turn].symbol})`;
}

const checkWinning = (rPos, cPos) => {
    const allSquares = document.getElementsByClassName('square');
    let newArr = [[],[],[]];
    let x = 0;
    for(let i = 0; i< 3; i++){
        for(let j = 0;j<3;j++){
            newArr[i][j] = allSquares[x];
            x++;
        }
    }

   const rowIsAllSame = checkRow(newArr,rPos);
   const columnIsAllSame = checkColumn(newArr, rPos, cPos);
   const diagLRIsAllSame = checkLRDiag(newArr);
   const diagRLIsAllSame = checkRLDiag(newArr);

   
   return rowIsAllSame || columnIsAllSame || diagLRIsAllSame || diagRLIsAllSame ? true : false;
}

const checkRow = (squareList,rPos)=>{
    let allSame = true;
    for(let i = 0; i<3;i++){
        const e = squareList[rPos][i];
        if(e.innerHTML !== state[turn].symbol ){
            allSame = false;
            break;
        }
    }

    return allSame;
}

const checkColumn = (squareList, cPos)=>{
    let allSame = true;
    for(let i = 0; i<3;i++){
        const e = squareList[i][cPos];
        if(e.innerHTML !== state[turn].symbol ){
            allSame = false;
            break;
        }
    }

    return allSame;
}

const checkLRDiag = (squareList)=>{
    let allSame = true;
    for(let i = 0; i<3; i++){
        const e = squareList[i][i]
        if(e.innerHTML !== state[turn].symbol ){
            allSame = false;
            break;
        }
    }

    return allSame;
}

const checkRLDiag = (squareList)=>{

    let allSame = true;
    let j = 2;
    for(let i = 0; i<3; i++){
        const e = squareList[i][j];
        if(e.innerHTML !== state[turn].symbol ){
            allSame = false;
            break;
        }
        j--;
    }

    return allSame;
}