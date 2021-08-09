'use strict';

const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n);

const getUserNumber = function(message) {
    let value = prompt(message).trim();
    while(!isNumber(value)) {
        value = prompt(message);
    }
    return +value;
};

const isString = str => !!str.match(/\D/);

const getUserString = function (message) {
    let value = prompt(message).trim();
    while(!isString(value)) {
        value = prompt(message);
    }
    return value;
};

let appData = {
    budget: 0,
    income: {},
    budgetDay: 0,
    budgetMonth: 0,
    addIncome: [],
    
    expenses: {},
    expensesMonth: 0,
    addExpenses: [],
    
    deposit: false,
    depositPercent: 0,
    depositMoney: 0,

    mission: 500000,
    period: 12,

    asking () {
        this.budget = getUserNumber('Введите ваш ежемесячный доход');

        if (confirm('Есть ли у вас дополнительный заработок?')) {
            let itemIncome = getUserString('Какой у вас есть дополнительный заработок?');
            let cashIncome = getUserNumber('Сколько в месяц зарабатываёте на этом?');
            this.income[itemIncome] = cashIncome;

        }

        const addExpenses = getUserString('Перечислите возможные расходы за рассчитываемый период через запятую');
        this.addExpenses = addExpenses.trim().toLowerCase().split(',');
        this.addExpenses = this.addExpenses.map(item => item.trim());

        this.deposit = confirm('Есть ли у вас депозит в банке?');
        this.getInfoDeposit();

        for (let i = 0; i < 2; i++) {
            const name = getUserString('Введите обязательную статью расходов');
            this.expenses[name.trim()] = getUserNumber('Во сколько это обойдется?');
        }
    },

    getInfoDeposit() {
        if (this.deposit) {
            this.depositPercent = getUserNumber('Какой годовой процент ?');
            this.depositMoney = getUserNumber('Какая сумма заложена ?');
        }
    },

    getExpensesMonth () {
        for(let expens in this.expenses) {
            this.expensesMonth += this.expenses[expens];
        }
    },

    getBudget () {
        this.budgetMonth = Math.floor(this.budget - this.expensesMonth);
        this.budgetDay = Math.floor(this.budgetMonth / 30);  
    },

    getTargetMonth () {
        this.period = Math.ceil(this.mission / this.budgetMonth);
    },

    calcSaveeMoney () {
        return this.budgetMonth * this.period; 
    },

    getSatusIncome () {
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
// ToDo
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();

console.log('Расходы: ', appData.expensesMonth);
console.log('Период: ', appData.period);
console.log('Уровень дохода: ', appData.getSatusIncome());

console.log('income: ', appData.income);
console.log('deposit: ', appData.deposit);
console.log('depositPercent: ', appData.depositPercent);
console.log('depositMoney: ', appData.depositMoney);

console.log(appData.addExpenses.map(item => item[0].toUpperCase() + item.slice(1).toLowerCase()).join(', '));