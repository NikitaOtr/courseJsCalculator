'use strict';
const showTypeOf = (data) => console.log(data + ': ' + typeof data);
const getAccumulateMonth = (income, expenses) => income - expenses;
const getTargetMonth = (accumulatedMonth, mission) => Math.ceil(mission / accumulatedMonth);
const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n);

//ToDo while
const start = function(message) {
    let money;
    do {
        money = prompt(message);
    }
    while(!isNumber(money));
    return +money;
}

const expenses = [];
const getExpensesMonth = function () {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        expenses.push(prompt('Введите обязательную статью расходов'));
        sum += start('Во сколько это обойдется?');
    }
    return sum;
};

const getSatusIncome = function(budgetDay) {
    if (budgetDay > 1200) {
        return 'У вас высокий уровень дохода';
    }
    if (budgetDay > 600) {
        return 'У вас средний уровень дохода';
    }
    if (budgetDay > 0) {
        return 'К сожалению у вас уровень дохода ниже среднего';
    }
    return 'Что-то пошло не так';
};

const money = start('Введите ваш ежемесячный доход');
const mission = 1000000;
const income = 'freelance';
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?');

const expensesAmount = getExpensesMonth();
const accumulatedMonth = getAccumulateMonth(money, expensesAmount);
const budgetDay = Math.floor(accumulatedMonth / 30);
const period = getTargetMonth(accumulatedMonth, mission);

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('Расходы: ', expensesAmount);
console.log('Возможные расходы: ', addExpenses);

if (period > 0) {
    console.log('Цель будет достигнута: ', period, 'месяцев');
}
else {
    console.log('Цель не будет достигнута');
}

console.log('Бюджен на день: ', budgetDay);
console.log('Статус: ', getSatusIncome(budgetDay));