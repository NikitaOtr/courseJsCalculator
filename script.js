let money = 60000;
const income = 'freelance';
let addExpenses = 'Taxi, Internet, Communal apartment';
let deposit = true;
let mission = 1000000;
const period = '12';

console.log('money: ', typeof money);
console.log('income: ', typeof income);
console.log('deposit: ', typeof deposit);

console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));

const budgetDay = money / 30;
console.log('budgetDay: ', budgetDay);


