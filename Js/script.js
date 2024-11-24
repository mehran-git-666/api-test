const $ = document
const firstNameInput = $.querySelector('.firstname_input')
const lastNameInput = $.querySelector('.lastname_input')
const userNameInput = $.querySelector('.username_input')
const phoneNumberInput = $.querySelector('.phone_number_input')
const emailInput = $.querySelector('.email_input')
const passwordInput = $.querySelector('.password_input')
const signUpBtn = $.querySelector('.signup_btn')
const loginBtn = $.querySelector('.login_btn')
const dashboardFirstNameInput = $.querySelector('.dashboard_firstname_input')
const dashboardLastNameInput = $.querySelector('.dashboard_lastname_input')
const dashboardUserNameInput = $.querySelector('.dashboard_username_input')
const dashboardPhoneNumberInput = $.querySelector('.dashboard_phone_number_input')
const dashboardEmailInput = $.querySelector('.dashboard_email_input')
const dashboardPasswordInput = $.querySelector('.dashboard_password_input')

HTMLElement.prototype.click = function (callback) {
    this.addEventListener('click', callback)
}

if (signUpBtn) {
    signUpBtn.click((e) => {
        e.preventDefault()
        if (firstNameInput.value && lastNameInput.value && userNameInput.value && phoneNumberInput.value && emailInput.value && passwordInput.value) {

            const newUser = {
                id: null,
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                userName: userNameInput.value,
                phoneNumber: phoneNumberInput.value,
                email: emailInput.value,
                password: passwordInput.value
            }

            fetch('https://api-test-9bdce-default-rtdb.firebaseio.com/users.json')
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        const objectLength = Object.keys(data).length;
                        newUser.id = objectLength + 1
                    } else {
                        newUser.id = 1
                    }
                })
                .then(() => {
                    fetch('https://api-test-9bdce-default-rtdb.firebaseio.com/users.json', {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(newUser)
                        })
                        .then(() => {
                            $.querySelectorAll('.inputs').forEach(input => {
                                input.value = ''
                            })
                        })
                        .then(() => {
                            window.location.href = './login.html'
                        })
                })
        }
    })
}

if (loginBtn) {
    loginBtn.click((e) => {
        e.preventDefault()
        if (emailInput.value && passwordInput.value) {
            fetch('https://api-test-9bdce-default-rtdb.firebaseio.com/users.json')
                .then(response => response.json())
                .then(data => {
                    let userFound = false
                    let emailExists = false
                    let passwordMatches = false

                    Object.values(data).forEach(user => {
                        if (user.email === emailInput.value) {
                            emailExists = true
                            if (user.password === passwordInput.value) {
                                userFound = true
                                passwordMatches = true
                            }
                        }

                        localStorage.setItem('user', JSON.stringify(user))
                    })

                    if (userFound) {
                        console.log(`Successfully Loged In`)
                        window.location.href = './dashboard.html'
                    } else if (emailExists) {
                        console.log(`Email Or Password is Wrong`)
                    } else {
                        console.log('User Not Found')
                    }
                })
        }
    })
}

if (window.location.href.includes('dashboard')) {
    const userLocalStorageData = JSON.parse(localStorage.getItem('user'))

    if (userLocalStorageData) {
        const userFirstName = userLocalStorageData.firstName
        const userLastName = userLocalStorageData.lastName
        const userUserName = userLocalStorageData.userName
        const userPhoneNumber = userLocalStorageData.phoneNumber
        const userEmail = userLocalStorageData.email
        const userPassword = userLocalStorageData.password

        dashboardFirstNameInput.value = userFirstName
        dashboardLastNameInput.value = userLastName
        dashboardUserNameInput.value = userUserName
        dashboardPhoneNumberInput.value = userPhoneNumber
        dashboardEmailInput.value = userEmail
        dashboardPasswordInput.value = userPassword
    }
}