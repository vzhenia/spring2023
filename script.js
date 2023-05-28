const errorMessages = {
    required: "Name and password are required",
    invalidNameLength: "Name must be at least 3 symbols long",
    invalidPwdLength: "Password must be at least 8 symbols long",
    somethingWrong: "Something is wrong, pls retry",
    passwordShouldContain: "Password should contain lowercase, uppercase, and numbers"
}

/* Function that creates error message if field doesn't pass validation */
const getNameError = (name) => {
    if (typeof(name) !== "string") {
        return errorMessages.somethingWrong;
    }
    if (!name.length) {
        return errorMessages.required;
    }
    if (name.length < 3) {
        return errorMessages.invalidNameLength;
    }
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
    const selectElement = document.getElementById("countries")
    
    for (const country of countries.data) {
        const option = document.createElement('option')
        option.setAttribute("id", country.code)
        const cName = document.createTextNode(country.name)
        option.appendChild(cName)
        selectElement.appendChild(option)
    }
    console.log('Dropdown with countries built...')
}

(async function() {
    await createCountiesOptions();
    console.log('Now we continue....')
    const name = document.getElementById('name');
    const password = document.getElementById('password');
    const submitButton = document.getElementById('submit');
    
    let nameTxt = "";
    let passwordTxt = "";

    // This shows how you can access event.target.value
    name.oninput = function(e) {
        nameTxt = e.target.value;
        console.log('Name: event.target.value=', e.target.value)
    }
    password.oninput = function(e) { 
        passwordTxt = e.target.value;
        console.log('Password: event.target.value=', e.target.value)
    }

    // Here we assign a function to "onclick" method of Submit button
    submitButton.onclick = function validator(e) {
        e.preventDefault();
        console.log("Submit button is clicked....")
        console.log('Submitted Name=', nameTxt)

        const nameErrorMessage = getNameError(nameTxt)

        if (nameErrorMessage) {
            const nameErrorDisplay = document.getElementById('nameErrorDisplay');
            nameErrorDisplay.textContent = nameErrorMessage;
        }
    }
})()