'use strict';
const mission = 1000000;
const income = 'freelance';
const money = +prompt('Ваш месячный доход', 50000);
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?');

const expenses1 = prompt('Введите обязательную статью расходов');
const amount1 = +prompt('Во сколько это обойдется?', 10000);
const expenses2 = prompt('Введите обязательную статью расходов');
const amount2 = +prompt('Во сколько это обойдется?', 7000);

const showTypeOf = (data) => console.log(data + ': ' + typeof data);
const getExpensesMonth = (amount1, amount2) => amount1 + amount2;
const getAccumulateMonth = (income, consts) => income - consts;
const getTargetMonth = (accumulatedMonth, mission) => Math.ceil(mission / accumulatedMonth);

const accumulatedMonth = getAccumulateMonth(money, getExpensesMonth(amount1, amount2));
const budgetDay = Math.floor(accumulatedMonth / 30);

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

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('Расходы: ', getExpensesMonth(amount1, amount2));
console.log('Возможные расходы: ', addExpenses);
console.log('Период: ', getTargetMonth(accumulatedMonth, mission), 'месяцев');
console.log('Бюджен на день: ', budgetDay);

console.log('Статус: ', getSatusIncome(budgetDay));