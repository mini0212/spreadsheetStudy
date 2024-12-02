const spreadsheetContainer = document.querySelector('#spreadsheet-container');
const ROWS = 10;
const COLS = 10;
const spreadsheet = [];

class Cell {
	constructor(
		isHeader,
		disabled,
		data,
		row,
		column,
		rowName,
		columnName,
		active = false
	) {
		this.isHeader = isHeader;
		this.disabled = disabled;
		this.data = data;
		this.row = row;
		this.column = column;
		this.rowName = rowName;
		this.columnName = columnName;
		this.active = active;
	}
}

const alphabets = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
];

// 기본 데이터 생성
initSpreadsheet();

function initSpreadsheet() {
	for (let i = 0; i < ROWS; i++) {
		let spreadsheetRow = [];

		for (let j = 0; j < COLS; j++) {
			let cellData = '';
			let isHeader = false;
			let disabled = false;

			// 모든 row 첫번째 컬럼에 숫자 넣기
			if (j === 0) {
				isHeader = true;
				disabled = true;
				cellData = i;
			}
			// 모든 columnt 첫번째 컬럼에 알파벳
			if (i === 0) {
				isHeader = true;
				disabled = true;
				cellData = alphabets[j - 1];
			}

			// (0,0) 컬럼은 '';
			// cellData가 undefined면 '';
			if (!cellData) {
				cellData = '';
			}

			const rowName = i;
			const columnName = alphabets[j - 1];

			const cell = new Cell(
				isHeader,
				disabled,
				cellData,
				i,
				j,
				rowName,
				columnName,
				false
			);
			spreadsheetRow.push(cell);
		}
		spreadsheet.push(spreadsheetRow);
	}
	drawSheet();
	console.log(spreadsheet);
}

function createCellElement(cell) {
	const cellElement = document.createElement('input');
	cellElement.className = 'cell';
	cellElement.id = 'cell_' + cell.row + cell.column;
	cellElement.value = cell.data;
	cellElement.disabled = cell.disabled;

	if (cell.isHeader) {
		cellElement.classList.add('header');
	}

	cellElement.onclick = () => handleCellClick(cell);
	cellElement.onchange = () => handleCellOnChange(cellElement.value, cell);
	return cellElement;
}

function drawSheet() {
	for (let i = 0; i < spreadsheet.length; i++) {
		const rowContainerElement = document.createElement('div');
		rowContainerElement.className = 'cell-row';
		for (let j = 0; j < spreadsheet[i].length; j++) {
			const cell = spreadsheet[i][j];
			rowContainerElement.append(createCellElement(cell));
		}
		spreadsheetContainer.append(rowContainerElement);
	}
}

function handleCellClick(cell) {
	clearHeaderActiveStatus();
	const columnHeader = spreadsheet[0][cell.column];
	const rowHeader = spreadsheet[cell.row][0];
	const columnHeaderElement = getElementFromRowAndColumn(
		columnHeader.row,
		columnHeader.column
	);
	const rowHeaderElement = getElementFromRowAndColumn(
		rowHeader.row,
		rowHeader.column
	);

	columnHeaderElement.classList.add('active');
	rowHeaderElement.classList.add('active');
	document.querySelector(
		'#cell-status'
	).textContent = `${cell.columnName}${cell.rowName}`;
}

function handleCellOnChange(data, cell) {
	cell.data = data;
}

function getElementFromRowAndColumn(row, column) {
	return document.getElementById('cell_' + row + column);
}

function clearHeaderActiveStatus() {
	const headers = document.querySelectorAll('.header');
	headers.forEach((header) => {
		header.classList.remove('active');
	});
}

const exportButton = document.querySelector('#export-button');

exportButton.addEventListener('click', (event) => {
	let csv = '';
	for (i = 0; i < spreadsheet.length; i++) {
		if (i === 0) continue; // 헤더 건너뛰기
		csv +=
			spreadsheet[i]
				.filter((item) => !item.isHeader)
				.map((item) => item.data)
				.join(',') + '\r\n';
	}
	const csvObj = new Blob([csv]);
	const csvUrl = URL.createObjectURL(csvObj);
	console.log(csvUrl);

	const a = document.createElement('a');
	a.href = csvUrl;
	a.download = 'spreadsheet.csv';
	a.click();
});
