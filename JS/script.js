'use strict';

function onliNumber() {
    this.value = this.value.replace(/[\D]/, '');
    
}
function onliRussianLeter() {
    this.value = this.value.replace(/[^а-яА-Я\s,]/,'');
}

const salaryAmount = document.querySelector('.salary-amount');
salaryAmount.oninput = onliNumber;

const [addIncomeTitle, addIncomeValue] = document.querySelectorAll('.income-items input');
addIncomeTitle.oninput = onliRussianLeter;
addIncomeValue.oninput = onliNumber;
let incomeItems = document.querySelectorAll('.income-items');
const buttonPlusIncome = document.querySelector('.income_add');

const [possibleIncomeTitle1, possibleIncomeTitle2] = document.querySelectorAll('.additional_income input');
possibleIncomeTitle1.oninput = onliRussianLeter;
possibleIncomeTitle2.oninput = onliRussianLeter;

const [expensesTitle, expensesValue] = document.querySelectorAll('.expenses-items input');
expensesTitle.oninput = onliRussianLeter;
expensesValue.oninput = onliNumber;
let expensesItems = document.querySelectorAll('.expenses-items');
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


let appData = {
    budget: 0,
    budgetMonth: 0,
    budgetDay: 0,

    income: {},
    incomeMonth: 0,
    possibleIncome: [],
    
    expenses: {},
    expensesMonth: 0,
    possibleExpenses: [],
    
    deposit: false,
    depositPercent: 0,
    depositMoney: 0,

    start() {
        appData.budget = +salaryAmount.value; 
        appData.getIncome();
        appData.getExpenses();

        appData.getPossibleIncome();
        appData.getPossibleExpenses();

        appData.getBudget();

        appData.showResult();
    },

//ToDo    
    addExpensesBlock() {
        expensesItems = document.querySelectorAll('.expenses-items');
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        cloneExpensesItem.querySelector('.expenses-title').oninput = onliRussianLeter;
        cloneExpensesItem.querySelector('.expenses-amount').oninput = onliNumber;
        buttonPlusExpenses.before(cloneExpensesItem);
        if (expensesItems.length >= 2) {
            buttonPlusExpenses.style.display ='none';
        }
    },

    addIncomeBlock() {
        incomeItems = document.querySelectorAll('.income-items');
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        cloneIncomeItem.querySelector('.income-title').oninput = onliRussianLeter;
        cloneIncomeItem.querySelector('.income-amount').oninput = onliNumber;
        buttonPlusIncome.before(cloneIncomeItem);
        if ( incomeItems.length >= 2) {
            buttonPlusIncome.style.display = 'none';
        }
    },

    getExpenses() {
        expensesItems = document.querySelectorAll('.expenses-items');
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            }
         });
         for(let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },

    getIncome() {
        incomeItems = document.querySelectorAll('.income-items');
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = +cashIncome;
            }
        });
        for (let key in appData.income){
            appData.incomeMonth += appData.income[key];
        }
    },

    getPossibleIncome() {
        const possibleInc1 = possibleIncomeTitle1.value.trim();
        const possibleInc2 = possibleIncomeTitle2.value.trim();
        if (possibleInc1 !== '') {
            appData.possibleIncome.push(possibleInc1);
        }
        if (possibleInc2 !== '') {
            appData.possibleIncome.push(possibleInc2);
        }
    },

    getPossibleExpenses() {
        let possibleExp = possibleExpenses.value.split(',');
        possibleExp.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                appData.possibleExpenses.push(item);
            }
        });  
    },

    getBudget() {
        appData.budgetMonth = Math.floor(appData.budget + appData.incomeMonth - appData.expensesMonth);
        appData.budgetDay = Math.floor(this.budgetMonth / 30);  
    },

    calcSaveeMoney() {
        return appData.budgetMonth * dateTarget.value;
    },

    getTargetMonth() {
        return Math.ceil(target.value / appData.budgetMonth);
    },

    showResult() {
        resBudgetMonth.value = appData.budgetMonth;
        resBudgetDay.value = appData.budgetDay;
        resExpensesMonth.value = appData.expensesMonth;
        resPossibleExpenses.value = appData.possibleExpenses.join(', ');
        resPossibleIncome.value = appData.possibleIncome.join(', ');
        resAccumulated.value = appData.calcSaveeMoney();
        resDataTarget.value = appData.getTargetMonth();
    },


    getSatusIncome() {
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
    },
};


buttonStart.addEventListener('click', appData.start);
buttonPlusExpenses.addEventListener('click', appData.addExpensesBlock);
buttonPlusIncome.addEventListener('click', appData.addIncomeBlock);

//ToDo
dateTarget.addEventListener('input', function() {
    document.querySelector('.period-amount').textContent = dateTarget.value;
    appData.calcSaveeMoney();
    appData.showResult();
});

buttonStart.disabled = true;
salaryAmount.addEventListener('input', function() {
    if (salaryAmount.value === ''){
        buttonStart.disabled = true;
    } else {
        buttonStart.disabled = false;
    }
});