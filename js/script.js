// select elements
const inputElement = document.querySelector(".input");
const outputResultElement = document.querySelector(".result .value");
const outputOperationElement = document.querySelector(".operation .value");

// variables and constants
const OPERATIONS = ["+", "-", "*", "/"];
const POWER = "POWER(";
const FACTORIAL = "FACTORIAL(";

let data = {
	operation: [],
	formula: [],
};

let ans = 0;
// calculator buttons
let calculator_buttons = [
	{
		name: "rad",
		symbol: "Rad",
		formula: false,
		type: "key",
	},
	{
		name: "deg",
		symbol: "Deg",
		formula: false,
		type: "key",
	},
	{
		name: "acos",
		symbol: "cos-1",
		formula: "inv_trigo(Math.acos,",
		type: "trigo_function",
	},
	{
		name: "asin",
		symbol: "sin-1",
		formula: "inv_trigo(Math.asin,",
		type: "trigo_function",
	},
	{
		name: "atan",
		symbol: "tan-1",
		formula: "inv_trigo(Math.atan,",
		type: "trigo_function",
	},
	{
		name: "pi",
		symbol: "π",
		formula: "Math.PI",
		type: "number",
	},
	{
		name: "exp",
		symbol: "exp",
		formula: "Math.exp",
		type: "math_function",
	},
	{
		name: "cos",
		symbol: "cos",
		formula: "trigo(Math.cos,",
		type: "trigo_function",
	},
	{
		name: "sin",
		symbol: "sin",
		formula: "trigo(Math.sin,",
		type: "trigo_function",
	},
	{
		name: "tan",
		symbol: "tan",
		formula: "trigo(Math.tan,",
		type: "trigo_function",
	},
	{
		name: "power",
		symbol: "x<span>y</span>",
		formula: POWER,
		type: "math_function",
	},
	{
		name: "ln",
		symbol: "ln",
		formula: "Math.log",
		type: "math_function",
	},
	{
		name: "log",
		symbol: "log",
		formula: "Math.log10",
		type: "math_function",
	},
	{
		name: "open-parenthesis",
		symbol: "(",
		formula: "(",
		type: "number",
	},
	{
		name: "close-parenthesis",
		symbol: ")",
		formula: ")",
		type: "number",
	},
	{
		name: "square-root",
		symbol: "√",
		formula: "Math.sqrt",
		type: "math_function",
	},
	{
		name: "percent",
		symbol: "%",
		formula: "/100",
		type: "number",
	},
	{
		name: "square",
		symbol: "x²",
		formula: POWER,
		type: "math_function",
	},
	
	{
		name: "clear",
		symbol: "AC",
		formula: false,
		type: "key",
	},
	{
		name: "delete",
		symbol: "⌫",
		formula: false,
		type: "key",
	},
	{
		name: "factorial",
		symbol: "×!",
		formula: FACTORIAL,
		type: "math_function",
	},
	
	{
		name: "7",
		symbol: 7,
		formula: 7,
		type: "number",
	},
	{
		name: "8",
		symbol: 8,
		formula: 8,
		type: "number",
	},
	{
		name: "9",
		symbol: 9,
		formula: 9,
		type: "number",
	},
	{
		name: "division",
		symbol: "÷",
		formula: "/",
		type: "operator",
	},
	{
		name: "e",
		symbol: "e",
		formula: "Math.E",
		type: "number",
	},
	
	{
		name: "4",
		symbol: 4,
		formula: 4,
		type: "number",
	},
	{
		name: "5",
		symbol: 5,
		formula: 5,
		type: "number",
	},
	{
		name: "6",
		symbol: 6,
		formula: 6,
		type: "number",
	},
	{
		name: "multiplication",
		symbol: "×",
		formula: "*",
		type: "operator",
	},
	
	{
		name: "ANS",
		symbol: "ANS",
		formula: "ans",
		type: "number",
	},
	
	{
		name: "1",
		symbol: 1,
		formula: 1,
		type: "number",
	},
	{
		name: "2",
		symbol: 2,
		formula: 2,
		type: "number",
	},
	{
		name: "3",
		symbol: 3,
		formula: 3,
		type: "number",
	},
	{
		name: "subtraction",
		symbol: "–",
		formula: "-",
		type: "operator",
	},


	
	{
		name: "comma",
		symbol: ".",
		formula: ".",
		type: "number",
	},
	{
		name: "0",
		symbol: 0,
		formula: 0,
		type: "number",
	},
	{
		name: "calculate",
		symbol: "=",
		formula: "=",
		type: "calculate",
	},
	{
		name: "addition",
		symbol: "+",
		formula: "+",
		type: "operator",
	},
];

// create calculator button 
function createButtons() {
	const btnPerRow = 5;
	let addedBtns = 0;

	calculator_buttons.forEach((button) => {
		if (addedBtns % btnPerRow == 0) {
			inputElement.innerHTML += `<div class="row"></div>`;
		}

		const row = document.querySelector(".row:last-child");

		row.innerHTML += `<button id="${button.name}">
							${button.symbol}
						</button>`;

		addedBtns++;
	});
}
createButtons();

// radian or degree
let RADIAN = true;
const radBtn = document.getElementById("rad");
const degBtn = document.getElementById("deg");

radBtn.classList.add("active-angle");

function angleToggler() {
	radBtn.classList.toggle("active-angle");
	degBtn.classList.toggle("active-angle");
}

// calculator buttons event listener
inputElement.addEventListener("click", (e) => {
	const targetBtn = e.target;

	calculator_buttons.forEach((button) => {
		if (button.name == targetBtn.id) {
			calculator(button);
		}
	});
});

// the calculator function
function calculator(button) {
	if (button.type == "operator") {
		data.operation.push(button.symbol);
		data.formula.push(button.formula);
	} else if (button.type == "number") {
		data.operation.push(button.symbol);
		data.formula.push(button.formula);
	} else if (button.type == "trigo_function") {
		data.operation.push(button.symbol + "(");
		data.formula.push(button.formula);
	} else if (button.type == "math_function") {
		let symbol, formula;

		if (button.name == "factorial") {
			symbol = "!";
			formula = button.formula;

			data.operation.push(symbol);
			data.formula.push(formula);
		} else if (button.name == "power") {
			symbol = "^(";
			formula = button.formula;

			data.operation.push(symbol);
			data.formula.push(formula);
		} else if (button.name == "square") {
			symbol = "^(";
			formula = button.formula;

			data.operation.push(symbol);
			data.formula.push(formula);

			data.operation.push(2);
			data.formula.push(2);
		} else {
			symbol = button.symbol + "(";
			formula = button.formula + "(";

			data.operation.push(symbol);
			data.formula.push(formula);
		}
	} else if (button.type == "key") {
		if (button.name == "clear") {
			data.operation = [];
			data.formula = [];

			updateOutputResult(0);
		} else if (button.name == "delete") {
			data.operation.pop();
			data.formula.pop();
		} else if (button.name == "rad") {
			RADIAN = true;
			angleToggler();
		} else if (button.name == "deg") {
			RADIAN = false;
			angleToggler();
		}
	} else if (button.type == "calculate") {
		let formulaStr = data.formula.join("");

		// solve power and factioral calculation
		let powerSearchResult = search(data.formula, POWER);
		let factorialSearchResult = search(data.formula, FACTORIAL);

		// get power bases and replace with right formula
		const bases = powerBaseGetter(data.formula, powerSearchResult);

		bases.forEach((base) => {
			let toReplace = base + POWER;
			let replacement = "Math.pow(" + base + ",";

			formulaStr = formulaStr.replace(toReplace, replacement);
		});

		// get factiorial number and replace with right formula
		const numbers = factorialNumGetter(data.formula, factorialSearchResult);
		numbers.forEach((factorial) => {
			formulaStr = formulaStr.replace(
				factorial.toReplace,
				factorial.replacement
			);
		});

		let result;
		try {
			result = eval(formulaStr);
		} catch (error) {
			if (error instanceof SyntaxError) {
				result = "Syntax Error!";
				updateOutputResult(result);
				return;
			}
		}

		// save result for later use
		ans = result;
		data.operation = [result];
		data.formula = [result];

		updateOutputResult(result);
		return;
	}

	updateOutputOperation(data.operation.join(""));
}

function search(array, keyword) {
	let searchResult = [];

	array.forEach((item, index) => {
		if (item == keyword) {
			searchResult.push(index);
		}
	});

	return searchResult;
}

// power base getter funciton
function powerBaseGetter(formula, powerSearchResult) {
	let powerBases = [];

	powerSearchResult.forEach((powerIndex) => {
		let base = []; //current base
		let parenthesesCount = 0;
		let previousIndex = powerIndex - 1;

		while (previousIndex >= 0) {
			if (formula[previousIndex] == "(") parenthesesCount--;
			if (formula[previousIndex] == ")") parenthesesCount++;

			let isOperator = false;
			OPERATIONS.forEach((operator) => {
				if (formula[previousIndex] == operator) isOperator = true;
			});

			let isPower = formula[previousIndex] == POWER;

			if ((isOperator && parenthesesCount == 0) || isPower) break;

			base.unshift(formula[previousIndex]);
			previousIndex--;
		}
		powerBases.push(base.join(""));
	});
	return powerBases;
}

// factorial number gette function
function factorialNumGetter(formula, factSearchResult) {
	let factNumbers = [];
	let factorialSequence = 0;

	factSearchResult.forEach((factIndex) => {
		let number = []; // current number
		let nextIndex = factIndex + 1;
		let nextInput = formula[nextIndex];

		if (nextInput == FACTORIAL) {
			factorialSequence++;
			return;
		}

		// if there was a factorial sequence, we need to get the index of the very first factorial function
		let firstFactorialIndex = factIndex - factorialSequence;
		// to get the number right before it
		let previousIndex = firstFactorialIndex - 1;
		let parenthesesCount = 0;
		while (previousIndex >= 0) {
			if (formula[previousIndex] == "(") parenthesesCount--;
			if (formula[previousIndex] == ")") parenthesesCount++;

			let isOperator = false;
			OPERATIONS.forEach((operator) => {
				if (formula[previousIndex] == operator) isOperator = true;
			});

			if (isOperator && parenthesesCount == 0) break;

			number.unshift(formula[previousIndex]);
			previousIndex--;
		}

		let numberStr = number.join("");
		const factorial = "factorial(";
		const closeParenthesis = ")";
		let times = factorialSequence + 1;

		let toReplace = numberStr + FACTORIAL.repeat(times);
		let replacement =
			factorial.repeat(times) + numberStr + closeParenthesis.repeat(times);

		factNumbers.push({
			toReplace: toReplace,
			replacement: replacement,
		});
		// reset factorialSequence
		factorialSequence = 0;
	});
	return factNumbers;
}

// show operation on ui in realtime
function updateOutputOperation(operation) {
	outputOperationElement.innerHTML = operation;
}
// show result on ui in realtime
function updateOutputResult(result) {
	outputResultElement.innerHTML = result;
}

// trigonometric funciton
function trigo(callback, angle) {
	if (!RADIAN) {
		angle = (angle * Math.PI) / 180;
	}
	return callback(angle);
}

// inversion trigonometric
function inv_trigo(callback, value) {
	let angle = callback(value);
	if (!RADIAN) {
		angle = (angle * 180) / Math.PI;
	}
	return angle;
}

// factorial funciton
function factorial(number) {
	if (number % 1 != 0) return gamma(number + 1);

	if (number === 0 || number === 1) return 1;
	let result = 1;
	for (let i = number; i > 0; i--) {
		result = result * i;
		if (result === Infinity) return Infinity;
	}
	return result;
}
// gamma function
function gamma(n) {
	// accurate to about 15 decimal places
	//some magic constants
	var g = 7, // g represents the precision desired, p is the values of p[i] to plug into Lanczos' formula
		p = [
			0.99999999999980993, 676.5203681218851, -1259.1392167224028,
			771.32342877765313, -176.61502916214059, 12.507343278686905,
			-0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
		];
	if (n < 0.5) {
		return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
	} else {
		n--;
		var x = p[0];
		for (var i = 1; i < g + 2; i++) {
			x += p[i] / (n + i);
		}
		var t = n + g + 0.5;
		return Math.sqrt(2 * Math.PI) * Math.pow(t, n + 0.5) * Math.exp(-t) * x;
	}
}
