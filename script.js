// Get elements by their IDs
const calculateMonthlyRepaymentButton = document.getElementById("calculate-repayment");
const clearButton = document.getElementById("clear-button");
const motgageAmount = document.getElementById("motgageAmount");

motgageAmount.addEventListener("input", function () { // Format the input value as currency
    let value = motgageAmount.value.replace(/,/g, ""); 
    if (!isNaN(value) && value !== "") {
        motgageAmount.value = parseFloat(value).toLocaleString("en-GB");
    }
});
const motgageTerm = document.getElementById("motgageTerm");
const interestRate = document.getElementById("Interest-rate");
const motgageValue = document.getElementById("monthly-repayment");

// Validating the input fields //



const mortgageTypeInputs = document.querySelectorAll('input[name="mortgage-type"]');
const mortgageAmountError = motgageAmount.nextElementSibling;
const mortgageTermError = motgageTerm.nextElementSibling;
const interestRateError = interestRate.nextElementSibling;
const mortgageTypeError = document.querySelector('.radio-group').nextElementSibling;
/*
function validateInputs() {
    let isValid = true;

    // Validate Mortgage Amount
    if (motgageAmount.value.trim() === "") {
        mortgageAmountError.classList.remove("display-none");
        isValid = false;
    } else {
        mortgageAmountError.classList.add("display-none");
    }

    // Validate Mortgage Term
    if (motgageTerm.value.trim() === "") {
        mortgageTermError.classList.remove("display-none");
        isValid = false;
    } else {
        mortgageTermError.classList.add("display-none");
    }

    // Validate Interest Rate
    if (interestRate.value.trim() === "") {
        interestRateError.classList.remove("display-none");
        isValid = false;
    } else {
        interestRateError.classList.add("display-none");
    }

    // Validate Mortgage Type
    let isTypeSelected = false;
    for (const radio of mortgageTypeInputs) {
        if (radio.checked) {
            isTypeSelected = true;
            break;
        }
    }
    if (!isTypeSelected) {
        mortgageTypeError.classList.remove("display-none");
        isValid = false;
    } else {
        mortgageTypeError.classList.add("display-none");
    }

    return isValid;
}

// You might also want to add 'input' event listeners to clear the error messages as the user types/selects
motgageAmount.addEventListener('input', () => {
    if (motgageAmount.value.trim() !== "") {
        mortgageAmountError.classList.add("display-none");
    }
});

motgageTerm.addEventListener('input', () => {
    if (motgageTerm.value.trim() !== "") {
        mortgageTermError.classList.add("display-none");
    }
});

interestRate.addEventListener('input', () => {
    if (interestRate.value.trim() !== "") {
        interestRateError.classList.add("display-none");
    }
});

mortgageTypeInputs.forEach(radio => {
    radio.addEventListener('change', () => {
        mortgageTypeError.classList.add("display-none");
    });
});

*/


// Function to calculate the monthly repayment based on the mortgage type
function calculateMonthlyRepayment() {
    if (validateInputs()) {
        
    
    const amountString = motgageAmount.value;
      // Remove thousand separators (commas) before parsing
    const amountCleaned = amountString.replace(/,/g, "");
    const amount = parseFloat(amountCleaned);
    
    const age = parseInt(motgageTerm.value);
    const rate = parseFloat(interestRate.value) / 100;
    const type = document.querySelector('input[name="mortgage-type"]:checked')?.value;

    if (isNaN(amount) || isNaN(age) || isNaN(rate) || !type) {
        alert("Please enter valid values and select a mortgage type.");
        return;
    }

    const monthlyRate = rate / 12;
    const numberOfPayments = age * 12;
    let monthlyPayment = 0;

    if (type === "Repayment") {
        monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    } else if (type === "Interest Only") {
        monthlyPayment = amount * monthlyRate;
    }

    motgageValue.textContent = `£${monthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
    else {
        alert("Please fill in all fields correctly.");
    }

}

document.getElementById('calculate-repayment').addEventListener('click', () => {
    if (validateInputs()) {
        calculateMonthlyRepayment();
        display_none(); // Optional: only if you want to show result after calculation
    }
});

function validateInputs() {    const inputs = [
        { id: 'motgageAmount', errorMessage: 'This field is required' },
        { id: 'motgageTerm', errorMessage: 'This field is required' },
        { id: 'Interest-rate', errorMessage: 'This field is required' }
    ];

    let isValid = true;

    inputs.forEach(input => {
        const inputElement = document.getElementById(input.id);
        // The error message <p> is the next sibling of the .input-wrapper,
        // which is the next sibling of the label.
        const errorElement = inputElement.parentElement.nextElementSibling;

        if (!inputElement.value.trim()) {
            errorElement.textContent = input.errorMessage;
            errorElement.classList.remove('display-none');
            isValid = false;
        } else {
            errorElement.textContent = '';
            errorElement.classList.add('display-none');
        }
    });

    const mortgageType = document.querySelector('input[name="mortgage-type"]:checked');
    // The error message <p> is the next sibling of the .radio-group div.
    const mortgageTypeError = document.getElementById('error');

    if (!mortgageType) {
        // mortgageTypeError.textContent = 'This field is required';
        mortgageTypeError.classList.remove('display-none');
        isValid = false;
    } else {
    // mortgageTypeError.textContent = '';
        mortgageTypeError.classList.add('display-none');
    }

    if (isValid) {
    
        return isValid;
    }
    
}

// Function to display the result section and hide the empty section

function display_none() {
    const resultHeader = document.getElementById("results-header");
    const resultSection = document.getElementsByClassName("result-section")[0];
    const emptySection = document.getElementById("empty-section");
    resultHeader.classList.remove("display-none");
    resultSection.classList.remove("display-none");
    emptySection.classList.add("display-none");
}
function opposite_of_display_none() {
    const resultHeader = document.getElementById("results-header");
    const resultSection = document.getElementsByClassName("result-section")[0];
    const emptySection = document.getElementById("empty-section");
    resultHeader.classList.add("display-none");
    resultSection.classList.add("display-none");
    emptySection.classList.remove("display-none");
}



clearButton.onclick = function clear_fields() {
    opposite_of_display_none();
    motgageAmount.value = "";
    motgageTerm.value = "";
    interestRate.value = "";
};

/*
function handleButtonClick() {
    calculateMonthlyRepayment();
    display_none();
  }

  calculateMonthlyRepaymentButton.classList.remove("display-none");
calculateMonthlyRepaymentButton.onclick = handleButtonClick;
*/