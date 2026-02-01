let display = document.getElementById('display');
let historyList = document.getElementById('history-list');
let currentInput = '';
let operator = '';
let previousInput = '';

function appendToDisplay(value) {
    if (['+', '-', '*', '/'].includes(value)) {
        if (currentInput !== '') {
            if (previousInput !== '' && operator !== '') {
                calculate();
            }
            operator = value;
            previousInput = currentInput;
            currentInput = '';
        }
    } else {
        if (value === '.' && currentInput.includes('.')) return;
        currentInput += value;
    }
    updateDisplay();
}

function calculate() {
    if (previousInput !== '' && currentInput !== '' && operator !== '') {
        let result;
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);
        switch (operator) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '/':
                if (curr === 0) {
                    alert("Cannot divide by zero");
                    clearDisplay();
                    return;
                }
                result = prev / curr;
                break;
        }
        const calculation = `${previousInput} ${operator} ${currentInput} = ${result}`;
        addToHistory(calculation);
        currentInput = result.toString();
        previousInput = '';
        operator = '';
        updateDisplay();
    }
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay();
}

function backspace() {
    if (currentInput !== '') {
        currentInput = currentInput.slice(0, -1);
    } else if (operator !== '') {
        operator = '';
        currentInput = previousInput;
        previousInput = '';
    } else if (previousInput !== '') {
        previousInput = previousInput.slice(0, -1);
    }
    updateDisplay();
}

function updateDisplay() {
    if (previousInput !== '' && operator !== '') {
        display.value = previousInput + operator + currentInput;
    } else {
        display.value = currentInput || previousInput || '0';
    }
}

function addToHistory(calculation) {
    const li = document.createElement('li');
    
    const textSpan = document.createElement('span');
    textSpan.textContent = calculation;
    textSpan.style.cursor = 'pointer';
    textSpan.onclick = () => {
        const result = calculation.split('=')[1].trim();
        currentInput = result;
        previousInput = '';
        operator = '';
        updateDisplay();
    };
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.className = 'delete-history-item';
    deleteBtn.onclick = (e) => {
        e.stopPropagation();
        li.remove();
    };
    
    li.appendChild(textSpan);
    li.appendChild(deleteBtn);
    historyList.appendChild(li);
}

function clearHistory() {
    historyList.innerHTML = '';
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'Backspace') {
        backspace();
    }
});
