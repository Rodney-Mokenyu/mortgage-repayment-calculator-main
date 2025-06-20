// Get elements by their IDs and selectors
const calculateMonthlyRepaymentButton = document.getElementById("calculate-repayment");
const clearButton = document.getElementById("clear-button");
const mortgageAmountInput = document.getElementById("motgageAmount"); // kept original ID to avoid breaking, but variable renamed
const mortgageTermInput = document.getElementById("motgageTerm");
const interestRateInput = document.getElementById("Interest-rate");
const monthlyRepaymentDisplay = document.getElementById("monthly-repayment");
const mortgageTypeInputs = document.querySelectorAll('input[name="mortgage-type"]');
const mortgageAmountError = mortgageAmountInput.parentElement.nextElementSibling;
const mortgageTermError = mortgageTermInput.parentElement.nextElementSibling;
const interestRateError = interestRateInput.parentElement.nextElementSibling;
const mortgageTypeError = document.getElementById('error');

// Format mortgage amount input as currency while typing
mortgageAmountInput.addEventListener("input", function () {
    let value = mortgageAmountInput.value.replace(/,/g, "");
    if (!isNaN(value) && value !== "") {
        mortgageAmountInput.value = parseFloat(value).toLocaleString("en-GB");
    }
});

// Validate input fields, show/hide error messages
function validateInputs() {
    let isValid = true;

    const inputsToValidate = [
        { element: mortgageAmountInput, errorElement: mortgageAmountError },
        { element: mortgageTermInput, errorElement: mortgageTermError },
        { element: interestRateInput, errorElement: interestRateError }
    ];

    inputsToValidate.forEach(({ element, errorElement }) => {
        if (!element.value.trim()) {
            errorElement.textContent = 'This field is required';
            errorElement.classList.remove('display-none');
            isValid = false;
        } else {
            errorElement.textContent = '';
            errorElement.classList.add('display-none');
        }
    });

    // Validate mortgage type radio buttons
    const selectedMortgageType = document.querySelector('input[name="mortgage-type"]:checked');
    if (!selectedMortgageType) {
        mortgageTypeError.classList.remove('display-none');
        isValid = false;
    } else {
        mortgageTypeError.classList.add('display-none');
    }

    return isValid;
}

// Clear error messages on input/change
mortgageAmountInput.addEventListener('input', () => {
    if (mortgageAmountInput.value.trim() !== "") {
        mortgageAmountError.classList.add("display-none");
    }
});
mortgageTermInput.addEventListener('input', () => {
    if (mortgageTermInput.value.trim() !== "") {
        mortgageTermError.classList.add("display-none");
    }
});
interestRateInput.addEventListener('input', () => {
    if (interestRateInput.value.trim() !== "") {
        interestRateError.classList.add("display-none");
    }
});
mortgageTypeInputs.forEach(radio => {
    radio.addEventListener('change', () => {
        mortgageTypeError.classList.add("display-none");
    });
});

// Calculate monthly repayment based on mortgage type
function calculateMonthlyRepayment() {
    if (!validateInputs()) {
        alert("Please fill in all fields correctly.");
        return;
    }

    const amountString = mortgageAmountInput.value.replace(/,/g, "");
    const amount = parseFloat(amountString);
    const termYears = parseInt(mortgageTermInput.value);
    const annualRate = parseFloat(interestRateInput.value) / 100;
    const type = document.querySelector('input[name="mortgage-type"]:checked').value;

    if (isNaN(amount) || isNaN(termYears) || isNaN(annualRate) || !type) {
        alert("Please enter valid values and select a mortgage type.");
        return;
    }

    const monthlyRate = annualRate / 12;
    const numberOfPayments = termYears * 12;
    let monthlyPayment = 0;

    if (type === "Repayment") {
        if (monthlyRate === 0) {
            // Handle zero interest rate (simple division)
            monthlyPayment = amount / numberOfPayments;
        } else {
            monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
        }
    } else if (type === "Interest Only") {
        monthlyPayment = amount * monthlyRate;
    }

    monthlyRepaymentDisplay.textContent = `£${monthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

// Show result section and hide empty placeholder
function showResultsSection() {
    const resultHeader = document.getElementById("results-header");
    const resultSection = document.getElementsByClassName("result-section")[0];
    const emptySection = document.getElementById("empty-section");

    resultHeader.classList.remove("display-none");
    resultSection.classList.remove("display-none");
    emptySection.classList.add("display-none");
}

// Hide results and show empty placeholder
function resetToEmptyState() {
    const resultHeader = document.getElementById("results-header");
    const resultSection = document.getElementsByClassName("result-section")[0];
    const emptySection = document.getElementById("empty-section");

    resultHeader.classList.add("display-none");
    resultSection.classList.add("display-none");
    emptySection.classList.remove("display-none");
}

// Event listener for Calculate button
calculateMonthlyRepaymentButton.addEventListener('click', () => {
    if (validateInputs()) {
        calculateMonthlyRepayment();
        showResultsSection();
    }
});

// Clear all inputs and reset UI state
clearButton.onclick = function clearFields() {
    mortgageAmountInput.value = "";
    mortgageTermInput.value = "";
    interestRateInput.value = "";
    mortgageTypeInputs.forEach(input => input.checked = false);

    // Clear error messages
    document.querySelectorAll(".text-danger").forEach(error => {
        error.classList.add("display-none");
        error.textContent = '';
    });

    resetToEmptyState();
};
