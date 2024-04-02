'use strict';

const account1 = {
  owner: 'Shivam Chaudhary',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2022-09-05T08:30:15.300Z',
    '2022-10-12T15:15:30.400Z',
    '2023-01-18T12:58:45.500Z',
    '2023-02-26T20:40:00.600Z',
    '2023-04-11T04:20:15.700Z',
    '2023-05-26T12:03:30.800Z',
    '2024-02-10T18:30:45.900Z',
    '2024-03-21T09:45:00.000Z',
  ],
  currency: 'INR',
  locale: 'en-US',
};

const account2 = {
  owner: 'Udit Singh',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2022-09-10T08:00:15.300Z',
    '2022-10-25T15:45:30.400Z',
    '2022-12-11T12:28:45.500Z',
    '2023-01-26T20:10:00.600Z',
    '2023-03-13T04:50:15.700Z',
    '2023-04-27T12:33:30.800Z',
    '2024-01-15T18:00:45.900Z',
    '2024-03-02T09:15:00.000Z',
  ],
  currency: 'INR',
  locale: 'en-US',
};
const account3 = {
  owner: 'Tushar Rathi',
  movements: [540, 4000, -11.5, -2790, -3210, -910, 8500, -301],
  interestRate: 4,
  pin: 3333,

  movementsDates: [
    '2022-07-05T10:15:30.200Z',
    '2022-10-19T18:00:15.300Z',
    '2023-02-04T14:33:40.400Z',
    '2023-04-14T11:12:25.500Z',
    '2023-07-27T19:44:10.600Z',
    '2023-10-10T08:29:55.700Z',
    '2024-01-24T22:49:40.800Z',
    '2024-03-31T04:25:35.900Z',
  ],
  currency: 'INR',
  locale: 'en-US',
};
const account4 = {
  owner: 'Mradul Tripathi',
  movements: [3500, 646.7, -1890, -239.6, -11.1, -4100, 8400, 6950],
  interestRate: 3.1,
  pin: 4444,

  movementsDates: [
    '2022-06-15T14:30:45.100Z',
    '2022-08-29T22:12:30.200Z',
    '2023-01-15T18:45:15.300Z',
    '2023-03-28T15:23:50.400Z',
    '2023-07-10T23:55:35.500Z',
    '2023-09-24T12:40:20.600Z',
    '2023-12-01T04:00:05.700Z',
    '2024-03-12T13:38:40.800Z',
  ],
  currency: 'INR',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
const formatCur = function (value, currency, locale) {
  const option = {
    style: 'currency',
    currency: currency,
  };
  return new Intl.NumberFormat(locale, option).format(value);
};
///////////////////////////////////////////////////
const options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  // hour: 'numeric',
  // minute: 'numeric',
};

const formattedDate = function (date, locale) {
  const now = new Date(date);
  // console.log(now.getTime());

  const day = now.getTime();
  const day1 = new Date().getTime();

  const days = Math.round((day1 - day) / (1000 * 60 * 60 * 24));

  // const month = `${now.getMonth() + 1}`.padStart(2, 0);
  // const year = now.getFullYear();
  // const hour = `${now.getHours()}`.padStart(2, 0);
  // const min = `${now.getMinutes()}`.padStart(2, 0);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days > 1 && days <= 7) return `${days} days ago`;
  // else return `${day}/${month}/${year}`;
  else return new Intl.DateTimeFormat(locale, options).format(now);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // const option = {
    //   style: 'currency',
    //   currency: acc.currency,
    // };
    // const displayCurr = new Intl.NumberFormat(acc.locale, option).format(mov);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${formattedDate(date, acc.locale)}</div>
        <div class="movements__value">${formatCur(
          mov,
          acc.currency,
          acc.locale
        )}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  // const option = {
  //   style: 'currency',
  //   currency: acc.currency,
  // };
  // labelBalance.textContent = new Intl.NumberFormat(acc.locale, option).format(
  //   acc.balance
  // );
  labelBalance.textContent = `${formatCur(
    acc.balance,
    acc.currency,
    acc.locale
  )}`;
  // labelBalance.textContent = `${acc.balance.toFixed(2)}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${formatCur(incomes, acc.currency, acc.locale)}`;
  // labelSumIn.textContent = `${incomes.toFixed(2)}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${formatCur(
    Math.abs(out),
    acc.currency,
    acc.locale
  )}`;
  // labelSumOut.textContent = `${Math.abs(out).toFixed(2)}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${formatCur(
    interest,
    acc.currency,
    acc.locale
  )}`;
  // labelSumInterest.textContent = `${interest.toFixed(2)}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};
////////////////////////////////////////
const startLogOutTimer = function () {
  const tick = function () {
    const min = time / 60;
    const sec = time % 60;
    labelTimer.textContent = `${Math.trunc(min)
      .toString()
      .padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
    time--;
  };

  let time = 300;

  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

/////////////////////////////////// Display without Login/////////////////////////
// currentAccount = account1;
// containerApp.style.opacity = 100;
// updateUI(currentAccount);
//////////////////////////////////////////////////////////////////////////////////

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // const now = new Date();
    const options1 = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options1
    ).format();

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //Start Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    setTimeout(() => {
      currentAccount.movements.push(amount);

      currentAccount.movementsDates.push(new Date().toISOString());
      // receiverAcc.movementsDates.push(new Date());

      // Update UI

      updateUI(currentAccount);
    }, 5000);
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
