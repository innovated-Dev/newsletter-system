


















































// Newsletter Subscription Functionality

//Step 0 : Select the form field
const newsletterForm = document.getElementById("newsletterForm");

/*PART A: Handle form Validation */
// Step 1 : Show a message with a type of the input field
function showMessage(input, message, type){
  //get the <small> element and set the message
  const msg = input.parentNode.querySelector("small");
  msg.innerText = message;
  msg.style.visibility = message ? "visible" : "hidden";
  msg.style.color = type ? "green" : "red";
  console.log(msg);
  //Update the class for the input
  input.className = type ? "success" : "error";
  return type;
}

//Step 2: Show the error and success outline
function showError(input, message){
  return showMessage(input, message, false);
}

function showSuccess(input){
  return showMessage(input, "", true);
}

//Step 3: Check if the field has a value
function hasValue(input, message){
  if(input.value.trim() === ""){
    return showError(input, message);
  }
  return showSuccess(input);
}

//Step 4: Validate the name field
function validateName(input, requiredMsg, invalidMsg){
  //Check if the value is not empty
  if(!hasValue(input, requiredMsg)){
    return false;
  }

  // Regular expression for name validation (letters only)
  const nameRegex =  /^[a-zA-Z\s'-]+$/;
  const name = input.value.trim();
  if(!nameRegex.test(name)){
    return showError(input, invalidMsg);
  }
  return showSuccess(input);
}

//Step 5: Validate the email field
function validateEmail(input, requiredMsg, invalidMsg){
  //Check if the value is not empty
  if(!hasValue(input, requiredMsg)){
    return false;
  }

  //Regular expression for basic email validation.
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const email = input.value.trim();
  if(!emailRegex.test(email)){
    return showError(input, invalidMsg);
  }
  return showSuccess(input);

}

// Step 6: Create  constants for the messages
const FIRST_NAME_REQUIRED = "Please enter your first name";
const FIRST_NAME_INVALID = "First name can only contain letters";
const LAST_NAME_REQUIRED = "Please enter your last name";
const LAST_NAME_INVALID = "Last name can only contain letters";
const EMAIL_REQUIRED = "Please enter your email address";
const EMAIL_INVALID = "Invalid! Please enter a valid email address";

//Step 7: Track which fields have been touched by the user
const touchedFields = {
  firstName: false,
  lastName: false,
  email: false
};


/*PART B: Handle form submission in real time */
//Step 1 : Add event listener to the form field for real time validation on input
newsletterForm.addEventListener("input", (e)=>{
  const field = e.target;
  const fieldName = field.name;

  // Step 2: Mark the field as touched
  if(fieldName in touchedFields){
    touchedFields[fieldName] = true;
  }

  //Step 3: Validate the field they just left
  switch(fieldName){
    case "firstName":
      validateName(field, FIRST_NAME_REQUIRED, FIRST_NAME_INVALID);
      break;
    case "lastName":
      validateName(field, LAST_NAME_REQUIRED, LAST_NAME_INVALID);
      break;
    case "email": 
    validateEmail(field, EMAIL_REQUIRED, EMAIL_INVALID);
    break;
  }
});

/* PART  C: Handle Backend Validation Errors */
// Step 1: Create a function to display backend validation errors
function displayBackendErrors(errors) {
  // Clear any existing error messages first
  clearAllErrors();

  // Map Backend field names to frontend field names
  const fieldMapping = {
    'firstName' : 'firstName',
    'lastName' : 'lastName',
    'email' : 'email'
  };

  //Loop through backend errors and  display them using frontend styling
  errors.forEach(error => {
    const frontendFieldName = fieldMapping[error.param || error.field];
    const field = newsletterForm[frontendFieldName];

    if(field) {
      showError(field, error.msg || error.message);
    }

  });
}

// Step 2: Create a function to clear all error messages
function clearAllErrors() {
  const allInputs = newsletterForm.querySelectorAll('input');
  allInputs.forEach(input => {
    const msg = input.parentNode.querySelector('small');

    if(msg) {
      msg.style.visibility = 'hidden';
      msg.innerText = '';
    }
    input.className = '';
  });
}

// Step 3: Create a function  to show Geneeral backend messages
function showGeneralMessage(message, isSuccess = false) {
  const msgElement = document.createElement('div');
  msgElement.style.cssText = `
    background: ${isSuccess ? '#4CAF50' : '#f44336'};
    color: white;
    padding: 15px;
    border-radius: 5px;
    margin-top: 10px;
    text-align: center;
    font-family: Arial, sans-serif;
    animation: fadeIn 0.5s ease-in;
  `;

  msgElement.textContent = message;

  // Add message after form
  newsletterForm.parentNode.insertBefore(msgElement, newsletterForm.nextSibling);

  // Remove message after 5 seconds
  setTimeout(() => {
    if(msgElement.parentNode) {
      msgElement.remove();
    }
  }, 5000);
}


//setp 4: Handle form submission to REAL BACKEND (NODE JS || MONGODB SERVER)
newsletterForm.addEventListener("submit", async (e)=>{
  //Prevent the form from submitting
  e.preventDefault();

  // step a: Mark all field as touched since user is trying to submit
  touchedFields.firstName = true;
  touchedFields.lastName = true;
  touchedFields.email = true;

  //Step b : Get the fields value from the form
  const firstNameInput = newsletterForm.firstName.value.trim();
  const lastNameInput = newsletterForm.lastName.value.trim();
  const emailInput = newsletterForm.email.value.trim();

  console.log(firstNameInput, lastNameInput, emailInput);

  //Step c : Validate all fields
  let isFirstNameValid = validateName(newsletterForm.firstName, FIRST_NAME_REQUIRED, FIRST_NAME_INVALID);
  let isLastNameValid = validateName(newsletterForm.lastName, LAST_NAME_REQUIRED, LAST_NAME_INVALID);
  let isEmailValid = validateEmail(newsletterForm.email, EMAIL_REQUIRED, EMAIL_INVALID);

  console.log("Form Validation:", {isFirstNameValid, isLastNameValid, isEmailValid});

  //Step d: If all the fields are valid, show a success message
  if(isFirstNameValid && isLastNameValid && isEmailValid){
   // Show subscribing state immediately after submitting and disabled the submit button
    const submitBtn = newsletterForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    console.log(originalText);

    submitBtn.textContent = 'Subcribing....'; //Fixed  typo
    submitBtn.disabled = true;

   try {
      //Send data to your backend
      const response = await fetch('/api/newsletter/subscribe', { //Fixed URL typo
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstNameInput, //Fixed  variable names
          lastName: lastNameInput,  //Fixed  variable names
          email: emailInput,       //Fixed  variable names
          subscribedAt: new Date()
        })
      });

      const result = await response.json();

      if(response.ok) {
      // SUCCESS:  Backend validation passed and subscription successful
      setTimeout(()=> {
      // create the success message element
      const successMsg = document.createElement('div');
      successMsg.style.cssText = `
          background: #4CAF50;                    
          color: white;
          padding: 15px;
          border-radius: 5px;
          margin-top: 10px;
          text-align: center;
          font-family: Arial, sans-serif;
          animation: fadeIn 0.5s ease-in;
        `;

      //set success message to be sent to user as feedback!
      successMsg.textContent = `Thanks for subscribing ${firstNameInput}! You'll be notified soon at ${emailInput}.`;

      // Add success message after form
      newsletterForm.parentNode.insertBefore(successMsg, newsletterForm.nextSibling);

      //Clear form and reset back to its normal position
      newsletterForm.reset();

      //Reset touched fields tracker
      touchedFields.firstName = false;
      touchedFields.lastName = false;
      touchedFields.email = false;
      
      // Clear any validation messages 
      clearAllErrors();

      // Remove success message after 5 seconds 
      setTimeout(()=>{
        if(successMsg.parentNode) {
          successMsg.remove();
        }
      }, 5000);

      }, 1000); // 1 second delay to show loading
  
      } else {
        //Handle different types of backend errors 
        if(result.errors && Array.isArray(result.errors)) {
          // VALIDATION ERRORS: Backend validation failed - display using frontend styling
          displayBackendErrors(result.errors);
        } else if(result.message) {
          // GENERAL ERROR: Show general error message like "Email already subscribed"
          showGeneralMessage(`Oops! ${result.message}`, false);
        } else {
          //GENERIC SERVER ERROR
          showGeneralMessage('An unexpected error occurred. Please try again later.', false);
        }
      }

   } catch (error) {
      //Network error
      console.error('Network Error:', error);
      
     showGeneralMessage('Connection failed. Please try again.', false);
   }
   
   //Reset Button (always reset regardless of success / error)
   submitBtn.textContent = originalText;
   submitBtn.disbaled = false; // Fixed typo : was "disabled"
} else {
  console.log('Form Validation Errors');
}
});

// Add CSS for animations and styling
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .success {
    border: 2px solid #4CAF50 !important;
    background-color: #f0fff0;
  }
  
  .error {
    border: 2px solid #f44336 !important;
    background-color: #fff0f0;
  }
  
  small {
    display: block;
    font-size: 12px;
    margin-top: 5px;
    visibility: hidden;
  }
`;
document.head.appendChild(style);





































