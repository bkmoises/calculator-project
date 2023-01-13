function startCalc() {
  return {
    display: document.querySelector('.display'),
    operators: document.querySelectorAll('.x-btn'),
    // keep track of whether the dot button has been pressed or not
    oprStatus: false,
    dotStatus: true,

    // main function to start the calculator 
    start() {
      /* call functions to handle button clicks, check for empty display,
      listen for keyboard inputs, and clear display on error */
      this.btn_click();
      this.btn_check();
      this.listen_btn();
      this.submit_btn();
      this.clearDisplay_Err();
    },
    // function to handle button clicks 
    btn_click() {
      // listen for clicks on the document
      document.addEventListener('click', event => {
        // get the clicked element
        const elem = event.target;

        // check for specific classes on the clicked element and call corresponding functions
        if (elem.classList.contains('btn-num')) this.putNumber(elem.innerHTML);
        if (elem.classList.contains('x-btn')) this.putOperator(elem.innerHTML);
        if (elem.classList.contains('btn-clear')) this.clearDisplay();
        if (elem.classList.contains('btn-erase')) this.eraseNumber();
        if (elem.classList.contains('btn-equal')) this.submit();
        if (elem.classList.contains('btn-dot')) this.disableDot();

      });
    },

    // function to check if the display is empty and disable operator buttons if true 
    btn_check() {
      if (!this.display.value) {
        for (elem of this.operators) { elem.disabled = true };
      };
    },

    // function to handle keyboard inputs 
    listen_btn() {
      // listen for keydown events on the document
      document.addEventListener('keydown', keyPress => {
        // get the pressed key as a number
        const keyNumber = Number(keyPress.key);

        // check if the pressed key is a number and call the putNumber function
        if (keyNumber || keyNumber === 0) this.putNumber(keyNumber);
        // check for specific keys and call the corresponding operator
        if (keyPress.key === '.' && this.dotStatus) this.putOperator('.');
        if (keyPress.key === '+') this.putOperator('+');
        if (keyPress.key === '-') this.putOperator('-');
        if (keyPress.key === '*') this.putOperator('*');
        if (keyPress.key === '/') this.putOperator('/');
        if (keyPress.key === '%') this.putOperator('%');

        // check for the escape key and call the clearDisplay function
        if (keyPress.keyCode === 27) this.clearDisplay();
        // check for the backspace key and call the erase number/operator function
        if (keyPress.keyCode === 8) this.eraseNumber();
      });
    },

    submit_btn() {
      //add event listener for when enter key is pressed
      document.addEventListener('keydown', keyPress => {
        //if enter key is pressed, blur the input and submit the expression
        if (keyPress.keyCode === 13) {
          keyPress.target.blur();
          this.submit();
        };
      });
    },

    clearDisplay_Err() {
      //add event listener for when any key other than a number
      document.addEventListener('keyup', keyPress => {
        //if press a key and the display is showing "Invalid!" clear the display
        if (keyPress && this.display.value === 'Invalid!') this.display.value = '';
      });
    },

    //append the value to the current value of the display
    putNumber(value) {
      this.display.value += value;
      //enable the operator buttons
      this.enableBtn();
    },

    //clear the display and reset the operator status and dot status
    clearDisplay() {
      this.display.value = '';
      this.btn_check();
      this.oprStatus = false;
      this.dotStatus = true;
    },

    //remove the last character from the display
    eraseNumber() {
      this.display.value = this.display.value.slice(0, -1);
    },

    submit() {
      //store the current value of the display in a variable
      let expression = this.display.value;

      try {
        //evaluate the expression
        expression = eval(expression);
        //if the expression is not valid show "Invalid!" on the display
        if (!expression) {
          this.display.value = 'Invalid!';
          return;
        };
        //display the result of the expression
        this.display.value = String(expression);
      } catch (err) {
        //if there is an error show "Invalid!" on the display
        this.display.value = 'Invalid!';
        return;
      };
    },

    putOperator(value) {
      //store the operator value in a variable
      let newValue = value;

      // Changes the pressed value by a valid operator
      if (this.oprStatus) {
        console.log(this.dotStatus)
        // Control not to allow inserting a point followed by another.
        if (value === '.' && !this.dotStatus) return;
        if (value === '.') this.disableDot();
        if (value === '×') newValue = "*";
        if (value === '÷') newValue = "/";
        //if the operator is "%" divide the current value by 100 and add "*"
        if (value === '%') {
          this.submit();
          newValue = this.display.value / 100
          this.display.value = newValue + "*";
        } else {
          //if the operator is not "." enable dot status
          if (value !== '.') this.enableDot();
          this.display.value += newValue;
        };
        //disable the operator buttons
        this.disableBtn();
      };
    },
    //Set operator status to false and disable all operator buttons
    disableBtn() {
      this.oprStatus = false;
      for (elem of this.operators) { elem.disabled = true };
    },
    //Set operator status to true and enable all operator buttons
    enableBtn() {
      this.oprStatus = true;
      for (elem of this.operators) { elem.disabled = false };
    },
    //Enables the dot button
    enableDot() {
      this.dotStatus = true;
    },
    //Disables the dot button
    disableDot() {
      this.dotStatus = false;
    },
  };
};
//Create an instance of the calculator and starts the calculator
const calculator = startCalc();
calculator.start();
