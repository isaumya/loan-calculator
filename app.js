const UI_loanAmount = document.getElementById('amount');
const UI_interest = document.getElementById('interest');
const UI_years = document.getElementById('years');

// Add the event listener on the form submit to calculate
document.getElementById('loan-form').addEventListener('submit', function(e) {
	// Hide Results
	document.getElementById('results').style.display = 'none';

	// Show the loading gif
	document.getElementById('loading').style.display = 'block';

	// Call the calculate Loan function after 2 sec
	setTimeout( calculateLoan, 2000 );

	// prevent default of the form
	e.preventDefault();
});

// Loan Calculation Function
function calculateLoan() {
	// UI variables to show the results
	const UI_monthlyPayment = document.getElementById('monthly-payment');
	const UI_totalPayment = document.getElementById('total-payment');
	const UI_totalInterest = document.getElementById('total-interest');

	// Check if the user has entered any finite value for the input fields
	if (
		(isFinite(convertStringToNum(UI_loanAmount.value)) && UI_loanAmount.value !== "") &&
		(isFinite(UI_interest.value) && UI_interest.value !== "") &&
		(isFinite(UI_years.value) && UI_years.value !== "")
	) {
		// Checkout the EMI Calculation Formula and logic here: https://emicalculator.net/
		const monthlyInterest = ((parseFloat(UI_interest.value) / 100) / 12);
		const months = parseFloat(UI_years.value) * 12;
		const EMI = parseFloat(convertStringToNum(UI_loanAmount.value)) *
		monthlyInterest *
		(
			Math.pow((1 + monthlyInterest), months)
			/
			(Math.pow((1 + monthlyInterest), months) - 1)
		);

		// Hide the loading gif
		document.getElementById('loading').style.display = 'none';

		// Show results section
		document.getElementById('results').style.display = 'block';

		// Show the results to the results section
		UI_monthlyPayment.value = EMI.toLocaleString('en-IN', { maximumFractionDigits: 2 });
		UI_totalPayment.value = (EMI * months).toLocaleString('en-IN', { maximumFractionDigits: 2 });
		UI_totalInterest.value = ((EMI * months) - parseFloat(convertStringToNum(UI_loanAmount.value))).toLocaleString('en-IN', { maximumFractionDigits: 2 });
		// Show the loan amount in local currency separator pattern
		UI_loanAmount.value = parseFloat(convertStringToNum(UI_loanAmount.value)).toLocaleString('en-IN', { maximumFractionDigits: 2 });
	} else {
		// Hide the loading gif
		document.getElementById('loading').style.display = 'none';

		// Show Error Message
		const errorDiv = document.createElement('div');
		errorDiv.classList.add('alert', 'alert-danger');
		errorDiv.appendChild(document.createTextNode('Please check the input details that you have provided.'));
		// Insert the error message before the form starts
		document.querySelector('.card').insertBefore(errorDiv, document.getElementById('loan-form'));
		// Auto remove the error after 3 sec i.e. 3000 ms
		setTimeout(function () {
			document.querySelector('.alert').remove();
		}, 3000);
	}
}

// convert string to number()
function convertStringToNum(str) {
	if (str.indexOf(',') === -1) {
		return str;
	} else {
		return parseFloat(str.replace(/,/g, ""));
	}
}