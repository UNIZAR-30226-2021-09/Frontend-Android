const DIM = 10;
const CARRIER = 5;
const BATTLESHIP = 4;
const SUBMARINE1 = 3;
const SUBMARINE2 = 1;
const CRUISER = 2;
const OCEAN = 0;
var carrier_to_detected = 5;
var battleship_to_detected = 4;
var submarine1_to_detected = 3;
var submarine2_to_detected = 3;
var crusier_to_detected = 2;
export const OCEAN_BOX = 0;
export const TOUCHED_BOX = 1;
export const SUNKEN_BOX = 2;
export const NO_ATACK_BOX = -1;
export const ATACK_BOX = 0;
export const INVALID_CLICK = -1; 
const VERTICAL = 0;
const HORIZONTAL = 1;
var coord_carrier = [[5, 0],[6,0],[7,0],[8,0],[9,0]];
var coord_battleship = [[0, 3],[0,4],[0,5],[0,6]];
var coord_submarine1 = [[3, 6],[4,6],[5,6]];
var coord_submarine2 = [[7, 7],[7, 8], [7,9]];
var coord_crusier = [[7, 3], [8, 3]];
var no_detected_ship = [2, 1, 2, 3, 4];
var coord_ships = [[[7, 7], [7, 8], [7, 9]], [[7, 3], [8, 3]],  [[3, 6], [4, 6], [5, 6]], [[0, 3], [0, 4], [0, 5], [0, 6]], [[5, 0], [6, 0], [7, 0], [8, 0], [9, 0]] ];
export const SUCCESS = "Success";
export const OUTBOARD = "Está intentando colocar un barco fuera del tablero";
export const ANOTHERSHIP = "Está intentando colocar un barco sobre otro o a su alrededor";
export const OCEAN_NOT_ATTACK = 0;
export const OCEAN_ATTACK = 1;
export const SHIP_NOT_ATTACK = 2;
export const SHIP_ATTACK = 3;
export const initBoard = () => {
	return [
		[OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN],
		[OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN],
		[OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN],
		[OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN],
		[OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN],
		[OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN],
		[OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN],
		[OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN],
		[OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN],
		[OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN, OCEAN],
	];
}


export const initAttack= () => {
	return [
		[NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX],
		[NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX],
		[NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX],
		[NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX],
		[NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX],
		[NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX],
		[NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX],
		[NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX],
		[NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX],
		[NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX, NO_ATACK_BOX],
	];
}
export const initShip = () => {
	return [2, 1, 2, 3, 4];
}
export const initCoord = () => {
	return [[[], []], [[], [], []], [[], [], []], [[], [], [], []], [[], [], [], [], []]];
}
export const getCoord = () => {
	return [[[7, 7], [7, 8], [7, 9]], [[7, 3], [8, 3]], [[3, 6], [4, 6], [5, 6]], [[0, 3], [0, 4], [0, 5], [0, 6]], [[5, 0], [6, 0], [7, 0], [8, 0], [9, 0]]];
}
export const getSolution = () => {
	return [[0, 0, 0, 4, 4, 4, 4, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
		[5, 0, 0, 0, 0, 0, 3, 0, 0, 0],
		[5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[5, 0, 0, 2, 0, 0, 0, 1, 1, 1],
		[5, 0, 0, 2, 0, 0, 0, 0, 0, 0],
		[5, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
}
const getShipCoord = (ship, myBoard) => {
	switch (ship) {
		case CARRIER:
			return coord_carrier;
		case BATTLESHIP:
			return coord_battleship;
		case SUBMARINE1:
			return coord_submarine1;
		case SUBMARINE2:
			return coord_submarine2;
		case CRUISER:
			return coord_crusier;
		default:
			return [];
	}
}
export const checkIfAllShips = (myBoard) =>{
	let result = true;
	for (let i = 0; i < myBoard.coordShips.length; i++) {
		if (myBoard.coordShips[i][0].length==0)
			result = false;
	}
	return result;
}

export const attack = (row, col, myBoard) => {
	if (myBoard.attack[row][col] == NO_ATACK_BOX) {
		myBoard.attack[row][col] = ATACK_BOX;
		var box = myBoard.solution[row][col];
		if (box == OCEAN)
			myBoard.board[row][col] = OCEAN_BOX;
		else if (box <= CARRIER) {
			if (myBoard.noDetectedShip[box - 1]-- <= 0) {
				var coord = myBoard.coordShips[box-1];
				for (let i = 0; i < coord.length; i++) {
					myBoard.board[coord[i][0]][coord[i][1]] = SUNKEN_BOX;
					//console.log('CASILLA' + myBoard.board[coord[i][0]][coord[i][1]]);
				}
			} else
				myBoard.board[row][col] = TOUCHED_BOX;
			//console.log('ship'+ box +'detected' + myBoard.noDetectedShip[box - 1]);
		}
		let victory = true;
		for (let i = 0; i < 5; i++) {
			if (myBoard.noDetectedShip[i] > 0)
				victory = false;
			//console.log("VICTORY" + victory + "Barco" + i + "casillas" + myBoard.noDetectedShip[i]);

		}
		myBoard.victory = victory;
	} 

	return myBoard;
}

export const IAmove = (IABoard) => {
	let row = Math.floor(Math.random() * 10);
	let col = Math.floor(Math.random() * 10);
	while (IABoard.attack[row][col] != NO_ATACK_BOX) {
		IABoard.attack[row][col] = ATACK_BOX;
		row = Math.floor(Math.random() * 10);
		col = Math.floor(Math.random() * 10);
	}
	return enemyAttack(row, col, IABoard);
}

const checkSpace = (row, col, ship, dir, board) => {
	let result = SUCCESS, nCell = ship, nRow, nCol;
	if (ship == SUBMARINE2) nCell = SUBMARINE1;
	//console.log('CHECK---------row' + row, 'col' + col, 'nCell' + nCell, 'dir' + dir);

	if (dir == VERTICAL && row + nCell <= DIM && row >= 0) {
		nRow = row + nCell + 1;
		nCol = col + 2;
		//console.log('cell--V');
	} else if (dir == HORIZONTAL && col + nCell <= DIM && col >= 0) {
		nRow = row + 2;
		nCol = col + nCell + 1;
		//console.log('cell--H');
	} else {
		//console.log('cell--N');
		return OUTBOARD;
	}
	//console.log('CHECK---------nRow' + nRow, 'nCol' + nCol, 'nCell' + nCell, 'dir' + dir);

	for (let i = row - 1; i < nRow; i++) {
		if (i >= 0 && i<DIM) {
			for (let j = col - 1; j < nCol; j++)
				if (j >= 0 && j < DIM) {
					if (board[i][j] != OCEAN) {
						result = ANOTHERSHIP;
						break;
					}
					//console.log('cell--'+i+'--'+j);
				}
		}
		if (result!=SUCCESS) break;
	}
	//console.log('CORRECTO'+true)
	return result;
}

export const placeShip = (row, col, ship, dir, myBoard) => {
	//console.log('row' + row, 'col' + col, 'ship' + ship, 'dir2' + dir + 'board' + myBoard.board);
	if (myBoard.coordShips[ship - 1][0].length > 0) {
		var removeCoord = myBoard.coordShips[ship - 1];
		console.log('REMOVE ' + removeCoord);
		for (let i = 0; i < removeCoord.length; i++) {
			myBoard.board[removeCoord[i][0]][removeCoord[i][1]] = OCEAN_BOX;
		}
		myBoard.coordShips[ship - 1] = ([[], []]);
	}
	var error = checkSpace(row, col, ship, dir, myBoard.board);
	if (error==SUCCESS) {
		let nCell = ship, nRow, nCol;
		if (ship == SUBMARINE2) nCell = SUBMARINE1;
		if (dir == VERTICAL) {
			nRow = row + nCell;
			nCol = col + 1;
		} else {
			nRow = row + 1;
			nCol = col + nCell;
		}
		let coord = [];
		for (let i = row; i < nRow; i++) {
			for (let j = col; j < nCol; j++) {
				myBoard.board[i][j] = ship;
				//console.log('linea' + i + ':' + myBoard.board[i]);
				coord.push([i, j]);
			}
		}
		myBoard.coordShips[ship - 1] = (coord);
		//console.log('linea:' + coord_ships[nCell]);
	}
	//console.log('board FINAL');

	return { board: myBoard, error: error };
}

export const transformSolution = (newBoard) => {
	console.log("BOARDSOL-----BEFORE----" + newBoard.solution)
	console.log("BOARDSOL-----BEFORE----" + newBoard.board)

	for (let i = 0; i < newBoard.solution.length; i++) {
		for (let j = 0; j < newBoard.solution[i].length; j++) {
			if (newBoard.board[i][j] != OCEAN)
				newBoard.solution[i][j] = SHIP_NOT_ATTACK;
			else
				newBoard.solution[i][j] = OCEAN_NOT_ATTACK;
			console.log("BEFORE--" + newBoard.board[i][j] + "   AFTER--" + newBoard.solution[i][j])
		}
	}
	console.log("BOARDSOL-----" + newBoard.solution)
	return newBoard;
}

export const enemyAttack = (row, col, myBoard) => {
	//console.log("BEFORE BOARD--" + (myBoard.board))
	//console.log("BEFORE BOARDSOL--" + (myBoard.solution))

	if (myBoard.solution[row][col] == OCEAN_NOT_ATTACK)
		myBoard.board[row][col] = OCEAN_ATTACK;
	else
		myBoard.board[row][col] = SHIP_ATTACK;
	//console.log("AFTER BOARD--" + (myBoard.board))
	//console.log("AFTER BOARDSOL--" + (myBoard.solution))

	//console.log("BEFORE--" + (myBoard.solution[row][col]) + "   AFTER--" + myBoard.board[row][col])

	return myBoard;
}