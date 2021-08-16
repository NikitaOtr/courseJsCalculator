'use strict';
function onliNumber() {
    this.value = this.value.replace(/\D/, '');
    
}
function onliRussianLeter() {
    this.value = this.value.replace(/[^а-яА-Я\s,]/,'');
}
const salaryAmount = document.querySelector('.salary-amount');
salaryAmount.oninput = onliNumber;

const [IncomeTitle, IncomeValue] = document.querySelectorAll('.income-items input');
IncomeTitle.oninput = onliRussianLeter;
IncomeValue.oninput = onliNumber;
let incomeItems = document.getElementsByClassName('income-items');
const buttonPlusIncome = document.querySelector('.income_add');

const [possibleIncomeTitle1, possibleIncomeTitle2] = document.querySelectorAll('.additional_income input');
possibleIncomeTitle1.oninput = onliRussianLeter;
possibleIncomeTitle2.oninput = onliRussianLeter;

const [expensesTitle, expensesValue] = document.querySelectorAll('.expenses-items input');
expensesTitle.oninput = onliRussianLeter;
expensesValue.oninput = onliNumber;
let expensesItems = document.getElementsByClassName('expenses-items');
const buttonPlusExpenses = document.querySelector('.expenses_add');

const possibleExpenses = document.querySelector('.additional_expenses-item'); 
possibleExpenses.oninput = onliRussianLeter;

const hasDeposit = document.querySelector('#deposit-check');

const target = document.querySelector('.target-amount');
target.oninput = onliNumber;

const dateTarget = document.querySelector('.period-select');


const resBudgetMonth = document.querySelector('.budget_month-value');

const resBudgetDay = document.querySelector('.budget_day-value');

const resExpensesMonth = document.querySelector('.expenses_month-value');

const resPossibleIncome = document.querySelector('.additional_income-value');

const resPossibleExpenses = document.querySelector('.additional_expenses-value');

const resAccumulated = document.querySelector('.income_period-value');

const resDataTarget = document.querySelector('.target_month-value');

const buttonStart = document.querySelector('#start');
const buttonCancel = document.querySelector('#cancel');


function AppData() {
    this.budget = 0;
    this.budgetMonth = 0;
    this.budgetDay = 0;

    this.income = {};
    this.incomeMonth = 0;
    this.possibleIncome = [];
    
    this.expenses = {};
    this.expensesMonth = 0;
    this.possibleExpenses = [];
    
    this.deposit = false;
    this.depositPercent = 0;
    this.depositMoney = 0;
}

AppData.prototype.start = function() {
    this.budget = +salaryAmount.value; 
    this.getIncome();
    this.getExpenses();

    this.getPossibleIncome();
    this.getPossibleExpenses();

    this.getBudget();

    this.showResult();

    salaryAmount.disabled = true;

    incomeItems.forEach(function(item) {
        item.querySelector('.income-title').disabled = true;
        item.querySelector('.income-amount').disabled = true;
    });

    possibleIncomeTitle1.disabled = true;
    possibleIncomeTitle2.disabled = true;

    expensesItems.forEach(function(item) {
        item.querySelector('.expenses-title').disabled = true;
        item.querySelector('.expenses-amount').disabled = true;
    });

    possibleExpenses.disabled = true;

    target.disabled = true;

    buttonCancel.style.display = 'block';
    buttonStart.style.display = 'none';
};

AppData.prototype.addIncomeBlock = function() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    cloneIncomeItem.querySelector('.income-title').oninput = onliRussianLeter;
    cloneIncomeItem.querySelector('.income-amount').oninput = onliNumber;
    buttonPlusIncome.before(cloneIncomeItem);
    if ( incomeItems.length >= 3) {
        buttonPlusIncome.style.display = 'none';
    }
};

AppData.prototype.addExpensesBlock = function() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    cloneExpensesItem.querySelector('.expenses-title').oninput = onliRussianLeter;
    cloneExpensesItem.querySelector('.expenses-amount').oninput = onliNumber;
    buttonPlusExpenses.before(cloneExpensesItem);
    if (expensesItems.length >= 3) {
        buttonPlusExpenses.style.display ='none';
    }
};

AppData.prototype.getIncome = function() {
    const _this = this;
    incomeItems = document.querySelectorAll('.income-items');
    incomeItems.forEach(function(item) {
        let titleIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (titleIncome !== '' && cashIncome !== '') {
            _this.income[titleIncome] = +cashIncome;
        }
    });
    for (let key in this.income){
        this.incomeMonth += this.income[key];
    }
};

AppData.prototype.getExpenses = function() {
    const _this = this;
    expensesItems = document.querySelectorAll('.expenses-items');
    expensesItems.forEach(function(item) {
        let titleExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (titleExpenses !== '' && cashExpenses !== '') {
            _this.expenses[titleExpenses] = +cashExpenses;
        }
     });
     for(let key in this.expenses) {
        this.expensesMonth += this.expenses[key];
    }
};

AppData.prototype.getPossibleIncome = function() {
    const possibleInc1 = possibleIncomeTitle1.value.trim();
    const possibleInc2 = possibleIncomeTitle2.value.trim();
    if (possibleInc1 !== '') {
        this.possibleIncome.push(possibleInc1);
    }
    if (possibleInc2 !== '') {
        this.possibleIncome.push(possibleInc2);
    }
};

AppData.prototype.getPossibleExpenses = function() {
    const _this = this;
    let possibleExp = possibleExpenses.value.split(',');
    possibleExp.forEach(function(item) {
        item = item.trim();
        if (item !== '') {
            _this.possibleExpenses.push(item);
        }
    });  
};

AppData.prototype.getBudget = function() {
    this.budgetMonth = Math.floor(this.budget + this.incomeMonth - this.expensesMonth);
    this.budgetDay = Math.floor(this.budgetMonth / 30);  
};

AppData.prototype.calcSaveeMoney = function() {
    return this.budgetMonth * dateTarget.value;
};

AppData.prototype.getTargetMonth = function() {
    return Math.ceil(target.value / this.budgetMonth);
};

AppData.prototype.showResult = function() {
    resBudgetMonth.value = this.budgetMonth;
    resBudgetDay.value = this.budgetDay;
    resExpensesMonth.value = this.expensesMonth;
    resPossibleExpenses.value = this.possibleExpenses.join(', ');
    resPossibleIncome.value = this.possibleIncome.join(', ');
    resAccumulated.value = this.calcSaveeMoney();
    resDataTarget.value = this.getTargetMonth();
};

AppData.prototype.getSatusIncome = function() {
    if (this.budgetDay > 1200) {
         return 'У вас высокий уровень дохода';
    }
    if (this.budgetDay > 600) {
        return 'У вас средний уровень дохода';
    }
    if (this.budgetDay > 0) {
       return 'К сожалению у вас уровень дохода ниже среднего';
    }
    return 'Что-то пошло не так';
};

AppData.prototype.reset = function() {
    this.budget = 0;
    this.budgetMonth = 0;
    this.budgetDay = 0;

    this.income = {};
    this.incomeMonth = 0;
    this.possibleIncome = [];
    
    this.expenses = {};
    this.expensesMonth = 0;
    this.possibleExpenses = [];
    
    this.deposit = false;
    this.depositPercent = 0;
    this.depositMoney = 0;


    salaryAmount.disabled = false;
    salaryAmount.value = '';

    for (let i = 1; i < incomeItems.length; i++) {
        incomeItems[i].remove();
    }
    incomeItems = document.getElementsByClassName('income-items');
    incomeItems[0].querySelector('.income-title').disabled = false;
    incomeItems[0].querySelector('.income-amount').disabled = false;
    incomeItems[0].querySelector('.income-title').value = '';
    incomeItems[0].querySelector('.income-amount').value = '';
    buttonPlusIncome.style.display = 'block';

    possibleIncomeTitle1.disabled = false;
    possibleIncomeTitle2.disabled = false;
    possibleIncomeTitle1.value = '';
    possibleIncomeTitle2.value = '';

    for (let i = 1; i < expensesItems.length; i++) {
        expensesItems[i].remove();
    }
    expensesItems = document.getElementsByClassName('expenses-items');
    expensesItems[0].querySelector('.expenses-title').disabled = false;
    expensesItems[0].querySelector('.expenses-amount').disabled = false;
    expensesItems[0].querySelector('.expenses-title').value = '';
    expensesItems[0].querySelector('.expenses-amount').value = '';
    buttonPlusExpenses.style.display = 'block';

    possibleExpenses.disabled = false;
    possibleExpenses.value = '';

    target.disabled = false;
    target.value = '';

    dateTarget.value = 1;
    document.querySelector('.period-amount').textContent = 1;


    resBudgetMonth.value = '';
    resBudgetDay.value = '';
    resExpensesMonth.value = '';
    resPossibleIncome.value = '';
    resPossibleExpenses.value = '';
    resAccumulated.value = '';
    resDataTarget.value = '';

    buttonCancel.style.display = 'none';
    buttonStart.style.display = 'block';
};

AppData.prototype.eventListeners = function() {
    const _this = this;
    buttonStart.addEventListener('click', this.start.bind(this));
    buttonCancel.addEventListener('click',this.reset.bind(this));

    buttonPlusExpenses.addEventListener('click', this.addExpensesBlock);
    buttonPlusIncome.addEventListener('click', this.addIncomeBlock);

    //ToDo
    dateTarget.addEventListener('input', function() {
        document.querySelector('.period-amount').textContent = dateTarget.value;
        _this.calcSaveeMoney();
        _this.showResult();
    });

    buttonStart.disabled = true;
    salaryAmount.addEventListener('input', function() {
        if (salaryAmount.value === ''){
            buttonStart.disabled = true;
        } else {
            buttonStart.disabled = false;
        }
    });
};


const appData = new AppData();
appData.eventListeners();