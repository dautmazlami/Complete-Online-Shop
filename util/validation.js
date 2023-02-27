function isEmpty(value) {
  return !value || value.trim() === "";
}

function credentialsAreValid(email, password) {
   return  email &&
   email.includes("@") &&
   password &&
   password.trim().length >= 6
}

function userCredentialsAreValid(email, password, name, street, postal, city) {
  return (
    credentialsAreValid(email, password) &&
    !isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(postal) &&
    !isEmpty(city)
  );
}

function emailIsConfirmed(email, confirmEmail) {
    return email === confirmEmail;
}

module.exports = {
    userCredentialsAreValid: userCredentialsAreValid,
    emailIsConfirmed: emailIsConfirmed
}
