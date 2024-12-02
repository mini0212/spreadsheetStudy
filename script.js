const ROWS = 10;
const COLS = 10;
const spreadsheet = [];

class Cell {
	constructor(isHeader, disabled, data, row, column, active = false) {
		this.isHeader = isHeader;
		this.disabled = disabled;
		this.data = data;
		this.row = row;
		this.column = column;
		this.active = active;
	}
}

// 기본 데이터 생성
initSpreadsheet();

function initSpreadsheet() {
	for (let i = 0; i < ROWS; i++) {
		let spreadsheetRow = [];
		for (let j = 0; j < COLS; j++) {
			const cell = new Cell(false, false, i + '-' + j, i, j, false);
			spreadsheetRow.push(cell);
		}
		spreadsheet.push(spreadsheetRow);
	}
	console.log(spreadsheet);
}
