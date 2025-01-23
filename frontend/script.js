console.log("Course-Selling-App!")

//Function--IMplementes
//1.userSignup -> Working
//2.userSignIn -> Working
//3.adminSignUp 
//4.adminSignin

async function userSignup() {
    console.log("Hello calling backend!")
    const firstName = document.getElementById('firstName-signup-user').value;
    const lastName = document.getElementById('lastName-signup-user').value;
    const email = document.getElementById('email-signup-user').value;
    const password = document.getElementById('password-signup-user').value;

    console.log(`Got the details of the user -> ${firstName} the last Name is : ${lastName} the emial of user is ${email} the password of the user is : ${password}`);

    try {
        const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password
        });

        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}

async function userSignIn() {
    const email = document.getElementById('email-signin-user').value;
    const password = document.getElementById('password-signin-user').value;

    try {
        const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
            email:email,
            password:password
        })
    
        console.log(response.data);
        console.log(response.data.token);

        const token = response.data.token;
        localStorage.setItem("userToken", token);
        
    } catch (error) {
        console.log(error)
    }
}

async function adminSignUp() {
    const firstName = document.getElementById('firstName-signup-admin').value;
    const lastName = document.getElementById('firstName-signup-admin').value;
    const email = document.getElementById('email-signup-admin').value;
    const password = document.getElementById('password-signup-admin').value;


    try {
        const response = await axios.post("http://localhost:3000/api/v1/admin/signup", {
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password,
        })

        console.log(response.data);


        
    } catch (error) {
        console.log(error);
    }
    
}

async function adminSignin() {
    const email = document.getElementById('email-signin-admin').value;
    const password = document.getElementById('password-signin-admin').value;

    try {
        const response = await axios.post("http://localhost:3000/api/v1/admin/signin", {
            email:email,
            password:password
        })

        console.log(`This is the signup message of the adminSingIN ${response.data}`);
        const token = response.data.token;
        console.log(token);
        localStorage.setItem("adminToken", token);
    

       


    } catch (error) {
        console.log(error);
        
    }
}

