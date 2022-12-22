function startCalc() {
  return {
    display: document.querySelector('.display'),
    operators: document.querySelectorAll('.x-btn'),
    oprStatus: false,
    dotStatus: true,

    start() {
      this.btn_click();
      this.btn_check();
      this.listen_btn();
      this.submit_btn();
      this.clearDisplay_Err();
    },

    btn_click() {
      document.addEventListener('click', event => {
        const elem = event.target;

        if (elem.classList.contains('btn-num')) this.putNumber(elem.innerHTML);
        if (elem.classList.contains('x-btn')) this.putOperator(elem.innerHTML);
        if (elem.classList.contains('btn-clear')) this.clearDisplay();
        if (elem.classList.contains('btn-erase')) this.eraseNumber();
        if (elem.classList.contains('btn-equal')) this.submit();
        if (elem.classList.contains('btn-dot')) this.disableDot();

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

        if (keyPress.key === '.' && this.dotStatus) this.putOperator('.');
        if (keyPress.key === '+') this.putOperator('+');
        if (keyPress.key === '-') this.putOperator('-');
        if (keyPress.key === '*') this.putOperator('*');
        if (keyPress.key === '/') this.putOperator('/');
        if (keyPress.key === '%') this.putOperator('%');

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

    clearDisplay_Err() {
      document.addEventListener('keyup', keyPress => {
        if (keyPress && this.display.value === 'Invalid!') this.display.value = '';
      });
    },

    putNumber(value) {
      this.display.value += value;
      this.enableBtn();
    },

    clearDisplay() {
      this.display.value = '';
      this.btn_check();
      this.oprStatus = false;
      this.dotStatus = true;
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
      } catch (err) {
        this.display.value = 'Invalid!';
        return;
      };
    },

    putOperator(value) {
      let newValue = value;

      if (this.oprStatus) {
        console.log(this.dotStatus)
        if (value === '.' && !this.dotStatus) return;
        if (value === '.') this.disableDot();
        if (value === '×') newValue = "*";
        if (value === '÷') newValue = "/";
        if (value === '%') {
          this.submit();
          newValue = this.display.value / 100
          this.display.value = newValue + "*";
        } else {
          if (value !== '.') this.enableDot();
          this.display.value += newValue;
        };
        this.disableBtn();
      };
    },

    disableBtn() {
      this.oprStatus = false;
      for (elem of this.operators) { elem.disabled = true };
    },

    enableBtn() {
      this.oprStatus = true;
      for (elem of this.operators) { elem.disabled = false };
    },

    enableDot() {
      this.dotStatus = true;
    },

    disableDot() {
      this.dotStatus = false;
    },
  };
};

const calculator = startCalc();
calculator.start();
