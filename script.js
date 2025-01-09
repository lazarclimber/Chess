let mainContainer = document.querySelector('.main-container');
let id = 1;
let blocks = [];
let copyBlocks;
let whiteToMove = true;
let whiteCastle = false;
let blackCastle = false;
let promoteModalW = document.querySelector('.modalW');
let promoteModalB = document.querySelector('.modalB');
let resultModal = document.querySelector('.custom-modal');
let result;
let winner;

function createBoard(){
    let x = 0
    let y = 1

    for(let i = 0; i < 64; i++){  
        
        if(x != 8){
            x++
        }
        else{
            x = 1;
            y++
        }       
        let square = document.createElement('button');

    
        mainContainer.appendChild(square);
        blocks.push({
            ref:square,  
            id: id++,      
            x: x,
            y: y,   
            name: "empty",   
            selectedSquare: false,
            possibleMoves: false,
        });     

        square.classList.add('squareW');
        square.id = i;

        if(y == 1 || y == 3 || y == 5 || y == 7){
            if(x % 2 == 0){
                square.classList.remove('squareW');
                square.classList.add('squareB');
            }
        }
        if(y == 2 || y == 4 || y == 6 || y == 8){
            if(x % 2 != 0){
                square.classList.remove('squareW');
                square.classList.add('squareB')
            }
        }
    } 
}

function resetPeices(){
    blocks[0].name = 'Brook'
    blocks[1].name = 'Bknight'
    blocks[2].name = 'Bbishop'
    blocks[3].name = 'Bqueen'
    blocks[4].name = 'Bking'
    blocks[5].name = 'Bbishop'
    blocks[6].name = 'Bknight'
    blocks[7].name = 'Brook'
    blocks[8].name = 'Bpawn'
    blocks[9].name = 'Bpawn'
    blocks[10].name = 'Bpawn'
    blocks[11].name = 'Bpawn'
    blocks[12].name = 'Bpawn'
    blocks[13].name = 'Bpawn'
    blocks[14].name = 'Bpawn'
    blocks[15].name = 'Bpawn'

    blocks[63].name = 'Wrook' 
    blocks[62].name = 'Wknight'
    blocks[61].name = 'Wbishop'
    blocks[60].name = 'Wking'
    blocks[59].name = 'Wqueen'
    blocks[58].name = 'Wbishop'
    blocks[57].name = 'Wknight'
    blocks[56].name = 'Wrook'
    blocks[55].name = 'Wpawn'
    blocks[54].name = 'Wpawn'
    blocks[53].name = 'Wpawn'
    blocks[52].name = 'Wpawn'
    blocks[51].name = 'Wpawn'
    blocks[50].name = 'Wpawn'
    blocks[49].name = 'Wpawn'
    blocks[48].name = 'Wpawn'

    blocks[0].moved = false;
    blocks[4].moved = false;
    blocks[7].moved = false;


    blocks[56].moved = false;
    blocks[60].moved = false;
    blocks[63].moved = false;

    for(let i=16; i<48; i++){
        blocks[i].name = "empty";
    }
}


///At start
createBoard();
resetPeices();
addImagesToSquares();
copyBlocks = JSON.parse(JSON.stringify(blocks));
///


//After every move

let peice;
let x2;
let y2;
mainContainer.addEventListener('click', event => {
    let targetSquare = event.target;
    let target = targetSquare.id;
    let peice2 = null;
    let x = blocks[targetSquare.id].x;
    let y = blocks[targetSquare.id].y;
    
    let startsWithW = blocks[targetSquare.id].name;
    //#region MOVEMENT FUNCTIONS
    
    function whitePawnMovement(){
        for(i = 0; i < 64; i++){

            //Capture//
            if((blocks[i].x+1 == x || blocks[i].x-1 == x) && (blocks[i].y+1 == y) && (blocks[i].name != "empty" || blocks[i].enPassant) && blocks[i].name.substring(0,1) != startsWithW.substring(0,1)){
                blocks[i].possibleMoves = true;
            }

            //Double push pawn//
            if(blocks[target].y == 7 && blocks[i].x == x && blocks[i].y+2 == y && blocks[i].name == "empty" && blocks[i+8].name == 'empty'){
                blocks[i].possibleMoves = true;
            }

            //Push pawn once//
            if(blocks[i].x == x && blocks[i].y+1 == y && blocks[i].name == "empty"){
                blocks[i].possibleMoves = true;
            }
        }
    }

    function blackPawnMovement(){
        for(i = 0; i < 64; i++){

            //Capture//
            if((blocks[i].x+1 == x || blocks[i].x-1 == x) && (blocks[i].y-1 == y) && (blocks[i].name != "empty" || blocks[i].enPassant) && blocks[i].name.substring(0,1) != startsWithW.substring(0,1)){
                blocks[i].possibleMoves = true;
            }

            //Double push pawn//
            if(blocks[target].y == 2 && blocks[i].x == x && blocks[i].y-2 == y && blocks[i].name == "empty" && blocks[i-8].name == 'empty'){
                blocks[i].possibleMoves = true;
            }

            //Push pawn once//
            if(blocks[i].x == x && blocks[i].y-1 == y && blocks[i].name == "empty"){
                blocks[i].possibleMoves = true;
            }
        }
    }

    function knightMovement(){
        for(i = 0; i < 64; i++){
            if(blocks[i].name.substring(0,1) != startsWithW.substring(0,1)){
                if(blocks[i].x+1 == x && blocks[i].y+2 == y){
                    blocks[i].possibleMoves = true;
                }
                if(blocks[i].x-1 == x && blocks[i].y+2 == y){
                    blocks[i].possibleMoves = true;
                }
                if(blocks[i].x+1 == x && blocks[i].y-2 == y){
                    blocks[i].possibleMoves = true;
                }
                if(blocks[i].x-1 == x && blocks[i].y-2 == y){
                    blocks[i].possibleMoves = true;
                }
                if(blocks[i].x+2 == x && blocks[i].y+1 == y){
                    blocks[i].possibleMoves = true;
                }
                if(blocks[i].x-2 == x && blocks[i].y+1 == y){
                    blocks[i].possibleMoves = true;
                }
                if(blocks[i].x+2 == x && blocks[i].y-1 == y){
                    blocks[i].possibleMoves = true;
                }
                if(blocks[i].x-2 == x && blocks[i].y-1 == y){
                    blocks[i].possibleMoves = true;
                }
            }
            
        }
    }

    function kingMovement(){
        for(let i = 0; i < 64; i++){
            
            if((blocks[i].name.substring(0,1) == "empty" || blocks[i].name.substring(0,1) != startsWithW.substring(0,1))){
                if(blocks[i].x+1 == x && blocks[i].y == y){  
                    blocks[i].possibleMoves = true;
                }
                if(blocks[i].x-1 == x && blocks[i].y == y){  
                    blocks[i].possibleMoves = true;
                }
                if(blocks[i].x == x && blocks[i].y+1 == y){  
                    blocks[i].possibleMoves = true;
                }
                if(blocks[i].x == x && blocks[i].y-1 == y){  
                    blocks[i].possibleMoves = true;
                }       
                if(blocks[i].x+1 == x && blocks[i].y+1 == y){  
                    blocks[i].possibleMoves = true;
                }
                if(blocks[i].x+1 == x && blocks[i].y-1 == y){  
                    blocks[i].possibleMoves = true;
                }
                if(blocks[i].x-1 == x && blocks[i].y+1 == y){  
                    blocks[i].possibleMoves = true;
                }
                if(blocks[i].x-1 == x && blocks[i].y-1 == y){  
                    blocks[i].possibleMoves = true;
                }  
                if(whiteCastle == false){
                    if(kingInCheck(blocks, 'Wking', 'B', 'Brook', 'Bqueen', 'Bbishop', 'Bknight', 'Bpawn', 'Bking') != true){
                        if(blocks[i].x-2 == x && blocks[i].y == y && blocks[60].name == 'Wking' && blocks[61].name == 'empty' && blocks[62].name == 'empty' && blocks[63].name == 'Wrook' && blocks[63].moved == false && blocks[60].moved == false){
                            blocks[i].possibleMoves = true;
                        }           
                        if(blocks[i].x+2 == x && blocks[i].y == y && blocks[60].name == 'Wking' && blocks[59].name == 'empty' && blocks[58].name == 'empty' && blocks[57].name == 'empty' && blocks[56].moved == false && blocks[56].name == 'Wrook' && blocks[60].moved == false){
                            blocks[i].possibleMoves = true;
                        }
                    }
                }
                if(blackCastle == false){
                    if(kingInCheck(blocks, 'Bking', 'W', 'Wrook', 'Wqueen', 'Wbishop', 'Wknight', 'Wpawn', 'Wking') != true){
                        if(blocks[i].x-2 == x && blocks[i].y == y && blocks[4].name == 'Bking' && blocks[5].name == 'empty' && blocks[6].name == 'empty' && blocks[7].name == 'Brook' && blocks[4].moved == false && blocks[7].moved == false){
                            blocks[i].possibleMoves = true;
                        }           
                        if(blocks[i].x+2 == x && blocks[i].y == y && blocks[4].name == 'Bking' && blocks[1].name == 'empty' && blocks[2].name == 'empty' && blocks[0].name == 'Brook' && blocks[3].name == 'empty' && blocks[0].moved == false && blocks[4].moved == false){
                            blocks[i].possibleMoves = true;
                        }
                    }    
                }

            }
        }
    }

    function rookTop(opponentPeice){
        //MOVE ROOK TOP
        let counter = 1;
        for(let i = 63; i > -1; i--){
            
            if(blocks[i].x == x && blocks[i].y+counter == y){                           
                if(blocks[i].name.substring(0,1) == opponentPeice){
                    blocks[i].possibleMoves = true;                                
                    break;
                }else if((blocks[i].name.substring(0,1) == "empty" || blocks[i].name.substring(0,1) != startsWithW.substring(0,1))){
                    blocks[i].possibleMoves = true;
                    counter++
                }                          
            }
        }
    }

    function rookBot(opponentPeice){
        //MOVE ROOK BOT
        let counter = 1;
        for(let i = 0; i < 64; i++){
            
            if(blocks[i].x == x && blocks[i].y-counter == y){
                if(blocks[i].name.substring(0,1) == opponentPeice){
                    blocks[i].possibleMoves = true;                                
                    break;
                }else if((blocks[i].name.substring(0,1) == "empty" || blocks[i].name.substring(0,1) != startsWithW.substring(0,1))){
                    blocks[i].possibleMoves = true;
                    counter++
                }                          
            }
        }
    }

    function rookLeft(opponentPeice){
        //MOVE ROOK LEFT
        let counter = 1;
        for(let i = 63; i > -1; i--){
            
            if(blocks[i].y == y && blocks[i].x+counter == x){
                if(blocks[i].name.substring(0,1) == opponentPeice){
                    blocks[i].possibleMoves = true;                                
                    break;
                }else if((blocks[i].name.substring(0,1) == "empty" || blocks[i].name.substring(0,1) != startsWithW.substring(0,1))){
                    blocks[i].possibleMoves = true;
                    counter++
                }                          
            }
        }
    }

    function rookRight(opponentPeice){
        //MOVE ROOK RIGHT
        let counter = 1;
        for(let i = 0; i < 64; i++){
            
            if(blocks[i].y == y && blocks[i].x-counter == x){
                if(blocks[i].name.substring(0,1) == opponentPeice){
                    blocks[i].possibleMoves = true;                                
                    break;
                }else if((blocks[i].name.substring(0,1) == "empty" || blocks[i].name.substring(0,1) != startsWithW.substring(0,1))){
                    blocks[i].possibleMoves = true;
                    counter++
                }                          
            }
        }
    }

    function bishopTopRight(opponentPeice){
        //MOVE BISHOP TOP/RIGHT
        let counter = 1;
        for(let i = 63; i > -1; i--){
            
            if(blocks[i].x-counter == x && blocks[i].y+counter == y){                           
                if(blocks[i].name.substring(0,1) == opponentPeice){
                    blocks[i].possibleMoves = true;                                
                    break;
                }else if((blocks[i].name.substring(0,1) == "empty" || blocks[i].name.substring(0,1) != startsWithW.substring(0,1))){
                    blocks[i].possibleMoves = true;
                    counter++
                }                          
            }
        }
    }

    function bishopTopLeft(opponentPeice){
        //MOVE BISHOP TOP/LEFT
        let counter = 1;
        for(let i = 63; i > -1; i--){
            
            if(blocks[i].x+counter == x && blocks[i].y+counter == y){                           
                if(blocks[i].name.substring(0,1) == opponentPeice){
                    blocks[i].possibleMoves = true;                                
                    break;
                }else if((blocks[i].name.substring(0,1) == "empty" || blocks[i].name.substring(0,1) != startsWithW.substring(0,1))){
                    blocks[i].possibleMoves = true;
                    counter++
                }                          
            }
        }
    }

    function bishopBottomRight(opponentPeice){
        //MOVE BISHOP BOTTOM/RIGHT
        let counter = 1;
        for(let i = 0; i < 64; i++){
            
            if(blocks[i].x-counter == x && blocks[i].y-counter == y){                           
                if(blocks[i].name.substring(0,1) == opponentPeice){
                    blocks[i].possibleMoves = true;                                
                    break;
                }else if((blocks[i].name.substring(0,1) == "empty" || blocks[i].name.substring(0,1) != startsWithW.substring(0,1))){
                    blocks[i].possibleMoves = true;
                    counter++
                }                          
            }
        }
    }

    function bishopBottomLeft(opponentPeice){
        //MOVE BISHOP BOTTOM/LEFT
        let counter = 1;
        for(let i = 0; i < 64; i++){
            
            if(blocks[i].x+counter == x && blocks[i].y-counter == y){                           
                if(blocks[i].name.substring(0,1) == opponentPeice){
                    blocks[i].possibleMoves = true;                                
                    break;
                }else if((blocks[i].name.substring(0,1) == "empty" || blocks[i].name.substring(0,1) != startsWithW.substring(0,1))){
                    blocks[i].possibleMoves = true;
                    counter++
                }                          
            }
        }
    }

    function kingInCheck(blocks, king, opponentPeice, opponentRook, opponentQueen, opponentBishop, opponentKnight, opponentPawn, opponentKing){
        for(let i = 0; i < 64; i++){
            if(blocks[i].name == king){     
                let x = blocks[i].x;
                let y = blocks[i].y;  
                let counter = 1;

                // === CHECK FROM BOT (QUEEN AND ROOK) === //
                for(let i = 0; i < 64; i++){                    
                    if(blocks[i].x == x && blocks[i].y-counter == y){
                        if(blocks[i].name.substring(0,1) == opponentPeice){
                            if(blocks[i].name == opponentRook || blocks[i].name == opponentQueen){                                                  
                                return true;
                            }
                        }else if(blocks[i].name == "empty"){                         
                            counter++;
                        }else if(blocks[i].name != opponentPeice){                                                    
                            break;
                        }
                    }
                }
                counter = 1;
                // === CHECK FROM TOP (QUEEN AND ROOK) === //
                for(let i = 63; i > -1; i--){                    
                    if(blocks[i].x == x && blocks[i].y+counter == y){
                        if(blocks[i].name.substring(0,1) == opponentPeice){
                            if(blocks[i].name == opponentRook || blocks[i].name == opponentQueen){
                                return true;
                            }
                        }else if(blocks[i].name == "empty"){
                            counter++;
                        }else if(blocks[i].name != opponentPeice){
                            break;
                        }
                    }
                }
                counter = 1;
                // === CHECK FROM LEFT (QUEEN AND ROOK) === //
                for(let i = 63; i > -1; i--){                    
                    if(blocks[i].y == y && blocks[i].x+counter == x){
                        if(blocks[i].name.substring(0,1) == opponentPeice){
                            if(blocks[i].name == opponentRook || blocks[i].name == opponentQueen){
                                return true;
                            }
                        }else if(blocks[i].name == "empty"){
                            counter++;
                        }else if(blocks[i].name != opponentPeice){
                            break;
                        }
                    }
                }
                counter = 1;
                // === CHECK FROM RIGHT (QUEEN AND ROOK) === //
                for(let i = 0; i < 64; i++){                    
                    if(blocks[i].y == y && blocks[i].x-counter == x){
                        if(blocks[i].name.substring(0,1) == opponentPeice){
                            if(blocks[i].name == opponentRook || blocks[i].name == opponentQueen){                  
                                return true;
                            }
                        }else if(blocks[i].name == "empty"){
                            counter++;
                        }else if(blocks[i].name != opponentPeice){                          
                            break;
                        }
                    }
                }
                counter = 1;
                // === CHECK FROM TOP/RIGHT (QUEEN AND BISHOP) === //
                for(let i = 63; i > -1; i--){                    
                    if(blocks[i].x-counter == x && blocks[i].y+counter == y){
                        if(blocks[i].name.substring(0,1) == opponentPeice){
                            if(blocks[i].name == opponentBishop || blocks[i].name == opponentQueen){               
                                return true;
                            }
                        }else if(blocks[i].name == "empty"){
                            counter++;
                        }else if(blocks[i].name != opponentPeice){                        
                            break;
                        }
                    }
                }
                counter = 1;
                // === CHECK FROM TOP/LEFT (QUEEN AND BISHOP) === //
                for(let i = 63; i > -1; i--){                    
                    if(blocks[i].x+counter == x && blocks[i].y+counter == y){
                        if(blocks[i].name.substring(0,1) == opponentPeice){
                            if(blocks[i].name == opponentBishop || blocks[i].name == opponentQueen){      
                                return true;
                            }
                        }else if(blocks[i].name == "empty"){
                            counter++;
                        }else if(blocks[i].name != opponentPeice){                       
                            break;
                        }
                    }
                }
                counter = 1;
                // === CHECK FROM BOTTOM/RIGHT (QUEEN AND BISHOP) === //
                for(let i = 0; i < 64; i++){                    
                    if(blocks[i].x-counter == x && blocks[i].y-counter == y){
                        if(blocks[i].name.substring(0,1) == opponentPeice){
                            if(blocks[i].name == opponentBishop || blocks[i].name == opponentQueen){                    
                                return true;
                            }
                        }else if(blocks[i].name == "empty"){
                            counter++;
                        }else if(blocks[i].name != opponentPeice){                     
                            break;
                        }
                    }
                }
                counter = 1;
                // === CHECK FROM BOTTOM/LEFT (QUEEN AND BISHOP) === //
                for(let i = 0; i < 64; i++){                    
                    if(blocks[i].x+counter == x && blocks[i].y-counter == y){
                        if(blocks[i].name.substring(0,1) == opponentPeice){
                            if(blocks[i].name == opponentBishop || blocks[i].name == opponentQueen){               
                                return true;
                            }
                        }else if(blocks[i].name == "empty"){
                            counter++;
                        }else if(blocks[i].name != opponentPeice){                         
                            break;
                        }
                    }
                }
                // === CHECK FROM KNIGHT === //
                for(let i = 0; i < 64; i++){
                    if(blocks[i].name == opponentKnight){
                        if(blocks[i].x+1 == x && blocks[i].y+2 == y){
                            return true;
                        }
                        if(blocks[i].x-1 == x && blocks[i].y+2 == y){
                            return true;
                        }
                        if(blocks[i].x+1 == x && blocks[i].y-2 == y){
                            return true;
                        }
                        if(blocks[i].x-1 == x && blocks[i].y-2 == y){
                            return true;
                        }
                        if(blocks[i].x+2 == x && blocks[i].y+1 == y){
                            return true;
                        }
                        if(blocks[i].x-2 == x && blocks[i].y+1 == y){
                            return true;
                        }
                        if(blocks[i].x+2 == x && blocks[i].y-1 == y){
                            return true;
                        }
                        if(blocks[i].x-2 == x && blocks[i].y-1 == y){
                            return true;
                        }
                    }
                }   
                        
                // === CHECK FROM WHITE PAWN && KING === //
                for(let i = 0; i < 64; i++){
                    if(blocks[i].x+1 == x && blocks[i].y-1 == y){
                        if(blocks[i].name == opponentPawn || blocks[i].name == opponentKing){
                            return true;
                        }
                    }
                    if(blocks[i].x-1 == x && blocks[i].y-1 == y){
                        if(blocks[i].name == opponentPawn || blocks[i].name == opponentKing){
                            return true;
                        }
                    }
                }

                // === CHECK FROM BLACK PAWN && KING === //
                for(let i = 0; i < 64; i++){
                    if(blocks[i].x-1 == x && blocks[i].y+1 == y){
                        if(blocks[i].name == opponentPawn || blocks[i].name == opponentKing){
                            return true;
                        }
                    }
                    if(blocks[i].x+1 == x && blocks[i].y+1 == y){
                        if(blocks[i].name == opponentPawn || blocks[i].name == opponentKing){
                            return true;
                        }
                    }
                }

                // === KING CAN'T MOVE NEAR OPPONENT'S KING === //
                for(let i = 63; i > -1; i--){          
                    if(blocks[i].x == x && blocks[i].y+1 == y){
                        if(blocks[i].name == opponentKing){
                            return true;
                        }
                    }
                    if(blocks[i].y == y && blocks[i].x+1 == x){
                        if(blocks[i].name == opponentKing){
                            return true;
                        }
                    }
                }
                for(let i = 0; i < 64; i++){
                    if(blocks[i].x == x && blocks[i].y-1 == y){
                        if(blocks[i].name == opponentKing){
                            return true;
                        }
                    }
                    if(blocks[i].y == y && blocks[i].x-1 == x){
                        if(blocks[i].name == opponentKing){
                            return true;
                        }
                    }
                }
                
            }
        }
    }
    
    function isCheckMate(ownPeice, enemyPeice, Bpawn, Wpawn, knight, king, rook, bishop, queen){
        let num = 0;
        
        for(let j = 0; j < 64; j++){
            if(blocks[j].name.substring(0,1) == ownPeice){
                peice = blocks[j].name;
                startsWithW = blocks[j].name;
                target = j;
                
                x = blocks[j].x;
                y = blocks[j].y;
        
                switch(peice){
                    case Bpawn:
                        blackPawnMovement();
                    break;
            
                    case Wpawn:
                        whitePawnMovement();
                    break;
            
                    case knight:
                        knightMovement();
                    break;
            
                    case king:
                        kingMovement();
                    break;

                    case rook:                   
                        rookTop(enemyPeice);
                        rookBot(enemyPeice);
                        rookLeft(enemyPeice);
                        rookRight(enemyPeice);
                    break;
            
                    case bishop:
                        bishopTopRight(enemyPeice);
                        bishopTopLeft(enemyPeice);
                        bishopBottomRight(enemyPeice);
                        bishopBottomLeft(enemyPeice);
                    break;
            
                    case queen:
                        rookTop(enemyPeice);
                        rookBot(enemyPeice);
                        rookLeft(enemyPeice);
                        rookRight(enemyPeice);
                        bishopTopRight(enemyPeice);
                        bishopTopLeft(enemyPeice);
                        bishopBottomRight(enemyPeice);
                        bishopBottomLeft(enemyPeice);
                    break;
                }
            
                // === CAN'T MOVE PEICE IF IT'S CHECK AFTER (PIN) === // 
                copyBlocks = JSON.parse(JSON.stringify(blocks));
                    let returnBack2 = copyBlocks[j].name;
                for(let i = 0; i < 64; i++){
                    if(blocks[i].possibleMoves){
                        let returnBack = copyBlocks[i].name;
                        peice2 = blocks[i].name;
                            if(blocks[i].name == 'empty'){                   
                                copyBlocks[i].name = peice;
                                copyBlocks[j].name = peice2;
                            }else{
                                copyBlocks[i].name = peice;
                                copyBlocks[j].name = 'empty';
                            }
                        
                        if(ownPeice == 'B'){
                            if(kingInCheck(copyBlocks, 'Bking', 'W', 'Wrook', 'Wqueen', 'Wbishop', 'Wknight', 'Wpawn', 'Wking')){
                                blocks[i].possibleMoves = false;
                            }else{
                                blocks[i].safeSquare = true;
                            }
                            copyBlocks[i].name = returnBack;
                            copyBlocks[j].name = returnBack2;
                        }
                        else if(ownPeice == 'W'){
                            if(kingInCheck(copyBlocks, 'Wking', 'B', 'Brook', 'Bqueen', 'Bbishop', 'Bknight', 'Bpawn', 'Bking')){
                                blocks[i].possibleMoves = false;
                            }else{
                                blocks[i].safeSquare = true;
                            }
                            copyBlocks[i].name = returnBack;
                            copyBlocks[j].name = returnBack2;
                        }
                        
                    }
                }
            }
        }

        for(let i = 0; i < 64; i++){
            if(blocks[i].safeSquare){
                num++;
                blocks[i].possibleMoves = false;
                blocks[i].safeSquare = false;
            }
        }

        if(num == 0){
            return true;
        }
    }

    function removeInvalidCastleMoves(){
        if(peice == 'Wking'){
            if(blocks[62].possibleMoves && !blocks[61].possibleMoves && blocks[60].name == 'Wking'){
                blocks[62].possibleMoves = false;
            }
            if(blocks[58].possibleMoves && !blocks[59].possibleMoves && blocks[60].name == 'Wking'){
                blocks[59].possibleMoves = false;
            }
        }else if(peice == 'Bking'){
            if(blocks[2].possibleMoves && !blocks[3].possibleMoves && blocks[4].name == 'Bking'){
                blocks[2].possibleMoves = false;
            }
            if(blocks[6].possibleMoves && !blocks[5].possibleMoves && blocks[4].name == 'Bking'){
                blocks[6].possibleMoves = false;
            }
        }

    }

    function removeEnPassantBlack(){
        for(let i = 16; i < 24; i++){           
            blocks[i].enPassant = false;                    
        }
    }

    function removeEnPassantWhite(){
        for(let i = 40; i < 48; i++){
            blocks[i].enPassant = false;
        }
    }

    


    function kingInCheckCSS(king){
        for(let i = 0; i < 64; i++){
            if(blocks[i].name == king){
                blocks[i].ref.classList.add('kingInCheck')
            }else{
                blocks[i].ref.classList.remove('kingInCheck');
            }
        }
    }

    function removeCheckCSS(){
        for(let i = 0; i < 64; i++){
            blocks[i].ref.classList.remove('kingInCheck');
        }
    }

    
    //#endregion

    
if(whiteToMove){
    //CLICK ON POSSIBLE MOVE// 
    if(blocks[targetSquare.id].possibleMoves){
        peice2 = blocks[targetSquare.id].name;
        removeCheckCSS();
        removeEnPassantBlack();

    // PROMOTE PAWN//
    if(peice == 'Wpawn' && y == 1){
        promoteModalW.style.display = 'block';
        promoteModalW.addEventListener('click', event => {
        const div = event.target;
        const backgroundImage = window.getComputedStyle(div).backgroundImage;
        const match = backgroundImage.match(/\/([\w-]+)\.png/);
        blocks[targetSquare.id].name = match[1];
        promoteModalW.style.display = 'none';

        if(kingInCheck(blocks, 'Bking', 'W', 'Wrook', 'Wqueen', 'Wbishop', 'Wknight', 'Wpawn', 'Wking')){
            kingInCheckCSS('Bking');
        }

        if(isCheckMate('B', 'W', 'Bpawn', 'Wpawn', 'Bknight', 'Bking', 'Brook', 'Bbishop', 'Bqueen')){
            if(kingInCheck(blocks, 'Bking', 'W', 'Wrook', 'Wqueen', 'Wbishop', 'Wknight', 'Wpawn', 'Wking')){
                result = 'Checkmate!';
                winner = 'White wins';
                whoWon()
                resultModal.style.display = 'block';
            }else{
                result = 'Stalemate!';
                winner = "It's a draw";
                whoWon()
                resultModal.style.display = 'block';
            }
        }    
        addImagesToSquares();
        })
    }
    // EN PASSANT (WHITE) //
    if(peice == 'Wpawn' && y == 5 && y2 == 7){
        for(let i = 40; i < 48; i++){
            if(blocks[i].x == x && blocks[i].y-1 == y){
                blocks[i].enPassant = true;
            }
        }
    }
    // EN PASSANT CAPTURE //
    if(peice == 'Wpawn' && peice2 == 'empty' && x != x2 && y!= y2){
        for(let i = 0; i < 64; i++){
            if(blocks[i].selectedSquare){
                blocks[i].name = 'empty';
                let target = blocks[targetSquare.id].id + 7;
                blocks[target].name = 'empty';              
            }
        }
    }
    //SMALL CASTLE (WHITE)//
    if(peice == 'Wking' && blocks[targetSquare.id].id == 63 && blocks[63].moved == false && blocks[60].moved == false && blocks[60].name == 'Wking' && blocks[63].name == 'Wrook'){
        blocks[63].name = 'empty';
        blocks[61].name = 'Wrook';
        whiteCastle = true;
    }
    //BIG CASTLE (WHITE)//
    if(peice == 'Wking' && blocks[targetSquare.id].id == 59 && blocks[56].moved == false && blocks[60].moved == false && blocks[60].name == 'Wking' && blocks[56].name == 'Wrook'){
        blocks[56].name = 'empty';
        blocks[59].name = 'Wrook';
        whiteCastle = true;
    }


    if(peice == 'Wking' && !whiteCastle){
        blocks[60].moved = true;
    }
    if(peice == 'Wrook' && !whiteCastle){
        if(blocks[56].name == 'empty'){
            blocks[56].moved = true;
        }
        if(blocks[63].name == 'empty'){
            blocks[63].moved = true;
        }
    }

        for(i = 0; i < 64; i++){
            if(peice2 != 'empty' && blocks[i].selectedSquare){
                blocks[i].name = 'empty';
                blocks[targetSquare.id].name = peice;
                blocks[i].selectedSquare = false;
            }
            if(blocks[i].selectedSquare == true){
                blocks[i].name = peice2;
                blocks[targetSquare.id].name = peice;
            }
            blocks[i].possibleMoves = false;
            blocks[i].selectedSquare = false;
        }   
        
        addImagesToSquares();

        whiteToMove = false;

            if(kingInCheck(blocks, 'Bking', 'W', 'Wrook', 'Wqueen', 'Wbishop', 'Wknight', 'Wpawn', 'Wking')){
                kingInCheckCSS('Bking');
            }
    
            if(isCheckMate('B', 'W', 'Bpawn', 'Wpawn', 'Bknight', 'Bking', 'Brook', 'Bbishop', 'Bqueen')){
                if(kingInCheck(blocks, 'Bking', 'W', 'Wrook', 'Wqueen', 'Wbishop', 'Wknight', 'Wpawn', 'Wking')){
                    result = 'Checkmate!';
                    winner = 'White wins';
                    whoWon()
                    resultModal.style.display = 'block';
                }else{
                    result = 'Stalemate!';
                    winner = "It's a draw";
                    whoWon()
                    resultModal.style.display = 'block';
                }
            }
        
        addImagesToSquares();
        return;
    }
    //

    for(i = 0; i < 64; i++){
        blocks[i].selectedSquare = false;
        blocks[i].possibleMoves = false;
    }
    

    if(startsWithW.substring(0,1) == "W"){
        blocks[targetSquare.id].selectedSquare = true;
        peice = blocks[targetSquare.id].name;
        x2 = blocks[targetSquare.id].x;
        y2 = blocks[targetSquare.id].y;

        switch(peice){
            case 'Wpawn':
                whitePawnMovement();
            break;

            case 'Wknight':
                knightMovement();
            break;

            case 'Wking':
                kingMovement();
            break;

            case 'Wrook':                   
                rookTop('B');
                rookBot('B');
                rookLeft('B');
                rookRight('B');
            break;

            case 'Wbishop':
                bishopTopRight('B');
                bishopTopLeft('B');
                bishopBottomRight('B');
                bishopBottomLeft('B');
            break;

            case 'Wqueen':
                rookTop('B');
                rookBot('B');
                rookLeft('B');
                rookRight('B');
                bishopTopRight('B');
                bishopTopLeft('B');
                bishopBottomRight('B');
                bishopBottomLeft('B');
            break;
        }
        copyBlocks = JSON.parse(JSON.stringify(blocks));
        let returnBack2 = copyBlocks[targetSquare.id].name;
    for(let i = 0; i < 64; i++){
        if(blocks[i].possibleMoves){
            let returnBack = copyBlocks[i].name;
            peice2 = blocks[i].name;
                if(blocks[i].name == 'empty'){                   
                    copyBlocks[i].name = peice;
                    copyBlocks[targetSquare.id].name = peice2;
                }else if(blocks[i].name.substring(0,1) == 'B'){
                    copyBlocks[i].name = peice;
                    copyBlocks[targetSquare.id].name = 'empty';
                }
                
                
            

            if(kingInCheck(copyBlocks, 'Wking', 'B', 'Brook', 'Bqueen', 'Bbishop', 'Bknight', 'Bpawn', 'Bking')){
                blocks[i].possibleMoves = false;
            }
            copyBlocks[i].name = returnBack;
            copyBlocks[targetSquare.id].name = returnBack2;
        }
    } 
    removeInvalidCastleMoves();
    } 
}
else{
//CLICK ON POSSIBLE MOVE// 
if(blocks[targetSquare.id].possibleMoves){
    peice2 = blocks[targetSquare.id].name;
    removeCheckCSS();
    removeEnPassantWhite();

//PROMOTE QUEEN//
if(peice == 'Bpawn' && y == 8){
    promoteModalB.style.display = 'block';
    promoteModalB.addEventListener('click', event => {
    const div = event.target;
    const backgroundImage = window.getComputedStyle(div).backgroundImage;
    const match = backgroundImage.match(/\/([\w-]+)\.png/);
    blocks[targetSquare.id].name = match[1];
    promoteModalB.style.display = 'none';

    if(kingInCheck(blocks, 'Wking', 'B', 'Brook', 'Bqueen', 'Bbishop', 'Bknight', 'Bpawn', 'Bking')){
        kingInCheckCSS('Wking');
    }

    if(isCheckMate('W', 'B', 'Wpawn', 'Bpawn', 'Wknight', 'Wking', 'Wrook', 'Wbishop', 'Wqueen')){
        if(kingInCheck(blocks, 'Wking', 'B', 'Brook', 'Bqueen', 'Bbishop', 'Bknight', 'Bpawn', 'Bking')){
            result = 'Checkmate!';
            winner = 'Black wins';
            whoWon()
            resultModal.style.display = 'block';
        }else{
            result = 'Stalemate!';
            winner = "It's a draw";
            whoWon()
            resultModal.style.display = 'block';
        }
    }
    addImagesToSquares();
    })
}
// EN PASSANT (BLACK) //
if(peice == 'Bpawn' && y == 4 && y2 == 2){
    for(let i = 16; i < 24; i++){
        if(blocks[i].x == x && blocks[i].y+1 == y){
            blocks[i].enPassant = true;
        }
    }
}
// EN PASSANT CAPTURE //
if(peice == 'Bpawn' && peice2 == 'empty' && x != x2 && y!= y2){
    for(let i = 0; i < 64; i++){
        if(blocks[i].selectedSquare){
            blocks[i].name = 'empty';
            let target = blocks[targetSquare.id].id - 9;
            blocks[target].name = 'empty';
        }
    }
}
//SMALL CASTLE (BLACK)//
if(peice == 'Bking' && blocks[targetSquare.id].id == 7 && blocks[4].moved == false && blocks[7].moved == false && blocks[4].name == 'Bking' && blocks[7].name == 'Brook'){
    blocks[7].name = 'empty';
    blocks[5].name = 'Brook';
    blackCastle = true;
}
//BIG CASTLE (BLACK)//
if(peice == 'Bking' && blocks[targetSquare.id].id == 3 && blocks[0].moved == false && blocks[4].moved == false && blocks[4].name == 'Bking' && blocks[0].name == 'Brook'){
    blocks[0].name = 'empty';
    blocks[3].name = 'Brook';
    blackCastle = true;
}

if(peice == 'Bking' && !blackCastle){
    blocks[4].moved = true;
}
if(peice == 'Brook' && !blackCastle){
    if(blocks[0].name == 'empty'){
        blocks[0].moved = true;
    }
    if(blocks[7].name == 'empty'){
        blocks[7].moved = true;
    }
}
    //
    for(i = 0; i < 64; i++){
        if(peice2 != 'empty' && blocks[i].selectedSquare == true){
            blocks[i].name = 'empty';
            blocks[targetSquare.id].name = peice;
            blocks[i].selectedSquare = false;
        }
        if(blocks[i].selectedSquare == true){
            blocks[i].name = peice2;
            blocks[targetSquare.id].name = peice;
        }
        blocks[i].possibleMoves = false;
        blocks[i].selectedSquare = false;
    }
    addImagesToSquares();
    
    whiteToMove = true;


    if(kingInCheck(blocks, 'Wking', 'B', 'Brook', 'Bqueen', 'Bbishop', 'Bknight', 'Bpawn', 'Bking')){
        kingInCheckCSS('Wking');
    }

    if(isCheckMate('W', 'B', 'Wpawn', 'Bpawn', 'Wknight', 'Wking', 'Wrook', 'Wbishop', 'Wqueen')){
        if(kingInCheck(blocks, 'Wking', 'B', 'Brook', 'Bqueen', 'Bbishop', 'Bknight', 'Bpawn', 'Bking')){
            result = 'Checkmate!';
            winner = 'Black wins';
            whoWon()
            resultModal.style.display = 'block';
        }else{
            result = 'Stalemate!';
            winner = "It's a draw";
            whoWon()
            resultModal.style.display = 'block';
        }
    }


    return;
}
//

for(i = 0; i < 64; i++){
    blocks[i].selectedSquare = false;
    blocks[i].possibleMoves = false;
}


if(startsWithW.substring(0,1) == "B"){
    blocks[targetSquare.id].selectedSquare = true;
    copyBlocks[targetSquare.id].selectedSquare = true;
    peice = blocks[targetSquare.id].name;
    x2 = blocks[targetSquare.id].x;
    y2 = blocks[targetSquare.id].y;

    switch(peice){
        case 'Bpawn':
            blackPawnMovement();
        break;

        case 'Bknight':
            knightMovement();
        break;

        case 'Bking':
            kingMovement();
        break;

        case 'Brook':                   
            rookTop('W');
            rookBot('W');
            rookLeft('W');
            rookRight('W');
        break;

        case 'Bbishop':
            bishopTopRight('W');
            bishopTopLeft('W');
            bishopBottomRight('W');
            bishopBottomLeft('W');
        break;

        case 'Bqueen':
            rookTop('W');
            rookBot('W');
            rookLeft('W');
            rookRight('W');
            bishopTopRight('W');
            bishopTopLeft('W');
            bishopBottomRight('W');
            bishopBottomLeft('W');
        break;
    }

    copyBlocks = JSON.parse(JSON.stringify(blocks));
        let returnBack2 = copyBlocks[targetSquare.id].name;
    for(let i = 0; i < 64; i++){
        if(blocks[i].possibleMoves){
            let returnBack = copyBlocks[i].name;
            peice2 = blocks[i].name;
                if(blocks[i].name == 'empty'){                   
                    copyBlocks[i].name = peice;
                    copyBlocks[targetSquare.id].name = peice2;
                }else if(blocks[i].name.substring(0,1) == 'W'){
                    copyBlocks[i].name = peice;
                    copyBlocks[targetSquare.id].name = 'empty';
                }
            

            if(kingInCheck(copyBlocks, 'Bking', 'W', 'Wrook', 'Wqueen', 'Wbishop', 'Wknight', 'Wpawn', 'Wking')){
                blocks[i].possibleMoves = false;
            }
            copyBlocks[i].name = returnBack;
            copyBlocks[targetSquare.id].name = returnBack2;
        }
    }

removeInvalidCastleMoves();
     
} 
}
addImagesToSquares();  
})
    

function closeModal(){
    resultModal.style.display = 'none';
}

function playAgain(){
    resetPeices()
    whiteToMove = true;
    whiteCastle = false;
    blackCastle = false;
    result = null;
    winner = null;
    console.log('playAgain');
    resultModal.style.display = 'none';

    for(let i = 0; i < 64; i++){
        blocks[i].ref.classList.remove('kingInCheck');
        blocks[i].possibleMoves = false;
        blocks[i].selectedSquare = false;
    }
    addImagesToSquares();
}

function whoWon(){
    document.querySelector('.gameResult').textContent = result;
    document.querySelector('.winner').textContent = winner;
}


// ---- CSS ----
function addImagesToSquares(){
    for(i = 0; i < 64; i++){

        blocks[i].ref.style.backgroundSize = '80%';
        blocks[i].ref.style.backgroundPosition = 'center';
        blocks[i].ref.style.backgroundRepeat = 'no-repeat'

        switch(blocks[i].name){
            case 'Bpawn':
                blocks[i].ref.style.backgroundImage = "url('./images/Bpawn.png')"
                blocks[i].ref.style.backgroundSize = '60%';
                break;
            case 'Brook':
                blocks[i].ref.style.backgroundImage = "url('./images/Brook.png')"    
                blocks[i].ref.style.backgroundSize = '70%';           
                break;
            case 'Bknight':
                blocks[i].ref.style.backgroundImage = "url('./images/Bknight.png')"
                break;
            case 'Bbishop':
                blocks[i].ref.style.backgroundImage = "url('./images/Bbishop.png')"
                break;
            case 'Bqueen':
                blocks[i].ref.style.backgroundImage = "url('./images/Bqueen.png')"
                break;
            case 'Bking':
                blocks[i].ref.style.backgroundImage = "url('./images/Bking.png')"
                break;
            case 'Wpawn':
                blocks[i].ref.style.backgroundImage = "url('./images/Wpawn.png')"
                blocks[i].ref.style.backgroundSize = '60%';
                break;
            case 'Wrook':
                blocks[i].ref.style.backgroundImage = "url('./images/Wrook.png')"
                blocks[i].ref.style.backgroundSize = '70%';    
                break;
            case 'Wknight':
                blocks[i].ref.style.backgroundImage = "url('./images/Wknight.png')"
                break;
            case 'Wbishop':
                blocks[i].ref.style.backgroundImage = "url('./images/Wbishop.png')"
                break;
            case 'Wqueen':
                blocks[i].ref.style.backgroundImage = "url('./images/Wqueen.png')"
                break;
            case 'Wking':
                blocks[i].ref.style.backgroundImage = "url('./images/Wking.png')"
                break;
            case "empty":
                blocks[i].ref.style.backgroundImage = 'none';
                break;
        }

        if(blocks[i].selectedSquare){
            blocks[i].ref.classList.add('selectedSquare');
        }else{
            blocks[i].ref.classList.remove('selectedSquare');
        }

        if(blocks[i].possibleMoves){
            blocks[i].ref.classList.add('possibleMoves');
        }else{
            blocks[i].ref.classList.remove('possibleMoves');
        }
    }
}


