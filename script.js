'use strict';
const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n);

const getUserNum = function(message) {
    let money = prompt(message);
    while(!isNumber(money)) {
        money = prompt(message);
    }
    return +money;
};

let appData = {
    income: {},
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    addIncome: [],
    
    expenses: {},
    expensesMonth: 0,
    addExpenses: [],
    
    deposit: false,
    mission: 500000,
    period: 12,

    asking () {
        this.budget = getUserNum('Введите ваш ежемесячный доход');

        const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        this.addExpenses = addExpenses.trim().toLowerCase().split(',');
        this.addExpenses = this.addExpenses.map(item => item.trim());

        this.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            const name = prompt('Введите обязательную статью расходов');
            this.expenses[name.trim()] = getUserNum('Во сколько это обойдется?');
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

console.log('');
console.log('Наша программа велючает в себя данные:');
for(let item in appData) {
    console.log(item, appData[item]);
}