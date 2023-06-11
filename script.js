const errorMessages = {
    required: "Name and password are required",
    invalidNameLength: "Name must be at least 3 symbols long",
    invalidPwdLength: "Password must be at least 8 symbols long",
    somethingWrong: "Something is wrong, pls retry",
    passwordShouldContain: "Password should contain lowercase, uppercase, and numbers"
}

/* Function that creates error message if field doesn't pass validation */
const getNameError = (name) => {
    // Sanity check
    if (typeof(name) !== "string") {
        return errorMessages.somethingWrong;
    }
    // Empty field validation
    if (!name.length) {
        return errorMessages.required;
    }
    // Validate name length according to business logic
    if (name.length < 3) {
        return errorMessages.invalidNameLength;
    }
    // If there are no errors, return empty string
    return "";
}

const getCountries = async () => {
    const apiUrl = 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries';
    const apiKey = document.RapidApiKey;
    const params = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    }

    try {
        const response = await fetch(apiUrl, params);
        const data = await response.json();
        console.log("List of countries =>", data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function createCountiesOptions(){
    const countries = await getCountries();
    const selectElement = document.getElementById("countries");
    
    for (const country of countries.data) {
        const option = document.createElement('option');
        option.setAttribute("id", country.code);
        const cName = document.createTextNode(country.name);
        option.appendChild(cName);
        selectElement.appendChild(option);
    }
    console.log('Dropdown with countries built...')
}

(async function() {
    await createCountiesOptions();
    console.log('Now we can collect user input....')

    const name = document.getElementById('name');
    const password = document.getElementById('password');
    const country = document.getElementById('countries');
    const submitButton = document.getElementById('submit');
    const nameErrorDisplay = document.getElementById("nameErrorDisplay");
    const passwordErrorDisplay = document.getElementById("passwordErrorDisplay");
    const clearButton = document.getElementById("clear_Form");

    let nameTxt = "";
    let passwordTxt = "";
    let countryTxt = country.value;

    // This shows how you can access event.target.value
    name.oninput = function(e) {
        nameTxt = e.target.value;
        nameErrorDisplay.textContent = "";
        console.log('Name: event.target.value=', e.target.value)
    }
    password.oninput = function(e) { 
        passwordTxt = e.target.value;
        passwordErrorDisplay.textContent = "";
        console.log('Password: event.target.value=', e.target.value)
    }
    country.onchange = function(e) {
        countryTxt = e.target.value;
        console.log('Selected country: event.target.value=', e.target.value)
    }

    clearButton.onclick = function(e) {
        nameErrorDisplay.textContent = "";
        passwordErrorDisplay.textContent = "";
    }

    // Here we assign a function to "onclick" method of Submit button
    submitButton.onclick = function(e) {
        e.preventDefault();
        console.log("Submit button is clicked....")
        console.log('Submitted data=', nameTxt, passwordTxt, countryTxt)

        const nameErrorMessage = getNameError(nameTxt)
        const passwordErrorMessage = getNameError(passwordTxt)

        if (nameErrorMessage) {
            nameErrorDisplay.textContent = nameErrorMessage;
        }
        if (passwordErrorMessage) {
            passwordErrorDisplay.textContent = passwordErrorMessage;
        }
    }
})()