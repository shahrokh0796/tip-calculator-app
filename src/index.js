import './index.html';
import '../styles/styles.scss';


document.addEventListener('DOMContentLoaded', function() {
    const totalBill = document.querySelector('#total');
    const numPeopleInput = document.querySelector('#persons');
    const percentageOptions = document.querySelectorAll('.percentage-option');
    const customPercentageInput = document.querySelector('#customPercentage');
    const tipPerHeadEl = document.querySelector('.billSectionTipPerPerson');
    const tipTotalEl = document.querySelector('.billSectionTotalTip'); 
    const reset = document.getElementById("button");
    const errorEl = document.querySelector('.error');

    function calculateTip() {
        const bill = parseFloat(totalBill.value);
        const numPeople = parseInt(numPeopleInput.value);
        let percentage;

        if(customPercentageInput.value !== '') {
            percentage = parseFloat(customPercentageInput.value);
        }
        else {
                percentageOptions.forEach((option) => {
                if (option.classList.contains('selected')) {
                    percentage = parseFloat(option.dataset.percentage);
                    }
                });
            
        }
        reset.removeAttribute('disabled');
        reset.classList.add("strongCyan");
        const tipPerHead = (bill * percentage / 100)/ numPeople; 
        const tipTotal = (bill * percentage / 100);
        tipPerHeadEl.textContent = tipPerHead.toFixed(2);
        tipTotalEl.textContent = tipTotal.toFixed(2);
    }

        percentageOptions.forEach(function(option) {
            option.addEventListener('click', function() { 
                if (numPeopleInput.value === '' || numPeopleInput.value === 0) {
                    errorEl.textContent = 'Can\'t be zero';
                    numPeopleInput.style.border= "1px solid red";
                } else {
                    numPeopleInput.style.border= "";
                    errorEl.textContent ='';
                }
                percentageOptions.forEach(opt => {
                opt.classList.remove('selected'); 
                console.log(opt);
                opt.classList.add('darkcyan');
            });
            // option.style.backgroundColor= "hsl(172, 67%, 45%)";
            option.classList.add('selected');
            calculateTip();
        });
    });

    reset.addEventListener('click', () => {
        tipTotalEl.textContent = "$0.00"; 
        tipPerHeadEl.textContent = "$0.00";
        totalBill.value = '';
        numPeopleInput.value= '';
    });
});