const emailValidation = (email,password)=>{
const testEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
const testPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
if(testEmail===false){
    return "enter correct email"
}
 if(testPassword===false){
    return "please enter correct password"
}

    return null
    
}
export default emailValidation