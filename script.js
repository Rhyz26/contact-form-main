document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    clearErrors();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const queryType = document.querySelector('input[name="queryType"]:checked');
    const consent = document.getElementById('consent').checked;

    let valid = true;

    if (firstName === '') {
        showError('firstName', 'This field is required');
        valid = false;
    }

    if (lastName === '') {
        showError('lastName', 'This field is required');
        valid = false;
    }

    if (email === '') {
        showError('email', 'This field is required');
        valid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        valid = false;
    }

    if (queryType === null) {
        showError('queryType', 'Please select a query type');
        valid = false;
    }

    if (message === '') {
        showError('message', 'This field is required');
        valid = false;
    }

    if (!consent) {
        showError('consent', 'To submit this form, please consent to being contacted');
        valid = false;
    }

    if (valid) {
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';
        document.getElementById('contactForm').reset();
    }
});

function showError(fieldId, errorMessage) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    const inputElement = document.getElementById(fieldId) || document.querySelector(`input[name="${fieldId}"]`) || document.querySelector(`textarea[name="${fieldId}"]`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add('error');
}

function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => {
        error.textContent = '';
    });
    const errorInputs = document.querySelectorAll('input.error, textarea.error');
    errorInputs.forEach(input => {
        input.classList.remove('error');
    });
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'none';
}

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
