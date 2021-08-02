const mission = 1000000;
const income = 'freelance';
const money = prompt('Ваш месячный доход');
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?');

const expenses1 = prompt('Введите обязательную статью расходов');
const amount1 = prompt('Во сколько это обойдется?');
const expenses2 = prompt('Введите обязательную статью расходов');
const amount2 = prompt('Во сколько это обойдется?');

const budgetMonth = money - amount1 - amount2;
const budgetDay = Math.floor(budgetMonth / 30);
const period = Math.ceil(mission / budgetMonth);

console.log('money: ', typeof money);
console.log('income: ', typeof income);
console.log('deposit: ', typeof deposit);

console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses);
console.log(addExpenses.toLowerCase().split(', '));

console.log('budgetMonth: ', budgetMonth);
console.log('budgetDay: ', budgetDay);

if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
}
else if (budgetDay >= 600) {
    console.log('У вас средний уровень дохода');
}
else if (budgetDay > 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
}
else {
    console.log('Что-то пошло не так');
}