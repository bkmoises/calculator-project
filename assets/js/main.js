function startCalc() {
  return {
    display: document.querySelector('.display'),
    operators: document.querySelectorAll('.x-btn'),

    start() {
      this.btn_click();
      this.btn_check();
      this.listen_btn();
      this.submit_btn();
    },

    btn_click() {
      document.addEventListener('click', event => {
        const elem = event.target;

        if (elem.classList.contains('btn-num')) this.putNumber(elem.innerHTML);
        if (elem.classList.contains('x-btn')) this.disableBtn(elem.innerHTML);
        if (elem.classList.contains('btn-clear')) this.clearDisplay();
        if (elem.classList.contains('btn-erase')) this.eraseNumber();
        if (elem.classList.contains('btn-equal')) this.submit();

      });
    },

    btn_check() {
      if (!this.display.value) {
        for (elem of this.operators) { elem.disabled = true };
      };
    },

    listen_btn() {
      document.addEventListener('keydown', keyPress => {
        const keyNumber = Number(keyPress.key);

        if (keyNumber || keyNumber === 0) this.putNumber(keyNumber);

        if (keyPress.key === '.') this.disableBtn('.');
        if (keyPress.key === '+') this.disableBtn('+');
        if (keyPress.key === '-') this.disableBtn('-');
        if (keyPress.key === '*') this.disableBtn('*');
        if (keyPress.key === '/') this.disableBtn('/');
        if (keyPress.key === '%') this.disableBtn('%');

        if (keyPress.keyCode === 27) this.clearDisplay();
        if (keyPress.keyCode === 8) this.eraseNumber();
      });
    },

    submit_btn() {
      document.addEventListener('keydown', keyPress => {
        if (keyPress.keyCode === 13) {
          keyPress.target.blur();
          this.submit();
        };
      });
    },

    putNumber(value) {
      this.display.value += value;
      this.enableBtn();
    },

    clearDisplay() {
      this.display.value = '';
      this.btn_check();
    },

    eraseNumber() {
      this.display.value = this.display.value.slice(0, -1);
    },

    submit() {
      let expression = this.display.value;
      
      try {
        expression = eval(expression);

        if (!expression) {
          this.display.value = 'Invalid!';
          return;
        };

        this.display.value = String(expression);
      } catch(err) {
        this.display.value = 'Invalid!';
        return;
      };
    },

    disableBtn(value) {
      let newValue = value;

      if (value === '×') newValue = "*";
      if (value === '÷') newValue = "/";
      if (value === '%') {
        newValue = this.display.value / 100
        this.display.value = newValue + "*";
      } else {
        this.display.value += newValue;
      }

      for (elem of this.operators) {elem.disabled = true};
    },

    enableBtn() {
      for (elem of this.operators) { elem.disabled = false};
    },

  };
};

const calculator = startCalc();
calculator.start();
