
(function() {

  let SkillsBar = function(bars) {
    this.bars = document.querySelectorAll(bars);
    if(this.bars.length > 0) {
      this.init();
    }
  };

  SkillsBar.prototype = {
    init: function() {
      let self = this;
      self.index = -1;
      self.timer = setTimeout(function() {
        self.action();
      }, 500);


    },
    select: function(n) {
      let self = this,
        bar = self.bars[n];

        if(bar) {
          let width = bar.parentNode.dataset.percent;

          bar.style.width = width;
          bar.parentNode.classList.add( 'complete' );
        }
    },
    action: function() {
      let self = this;
      self.index++;
      if(self.index == self.bars.length) {
        clearTimeout(self.timer);
      } else {
        self.select(self.index);
      }

      setTimeout(function() {
        self.action();
      }, 500);
    }
  };

  window.SkillsBar = SkillsBar;

})();

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    let skills = new SkillsBar('.skillbar-bar');
  });
})();

//adds email and telephone real-time form validation

(function () {
  let form = document.querySelector('#contact-form');
  let emailInput = document.querySelector('#contact-email');
  let teleInput = document.querySelector('#tel');

  function validateEmail() {
    let value = emailInput.value;

    if(!value){
      showErrorMEssage(emailInput, 'Email is a required field');
      return false;
    }
    if(value.indexOf('@') === -1) {
      showErrorMEssage(emailInput, 'You must enter a valid email address');
      return false;
    }

    showErrorMEssage(emailInput, null);
    return true;
  }

  function validateTelephone() {
      let value = teleInput.value;
      let phonenu = /^\d{10}$/;


    if(!value){
      showErrorMEssage(teleInput, 'Telephone number is a required field');
      return false;
    }

    if (!teleInput.value.match(phonenu)) {
      showErrorMEssage(teleInput, 'Phone number should be atleast 10 digit e.g.123 456 7890');
      return false;
    }
    showErrorMEssage(teleInput, null);
    return true;
  }

  function showErrorMEssage (input, message) {
    let container = input.parentElement;
    let error = container.querySelector('.error-message');
    if (error) {
      container.removeChild(error);
    }

    if (message) {
      let error = document.createElement('div');
      error.classList.add('error-message');
      error.innerText = message;
      container.appendChild(error);
    }
  }

  function validateForm() {

    let isValidEmail = validateEmail();
    let isValidTelephone = validateTelephone();
    return isValidEmail && isValidTelephone;
  }

  emailInput.addEventListener('input', validateEmail);
  teleInput.addEventListener('input', validateTelephone);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Success!');
    }
  })
})();
