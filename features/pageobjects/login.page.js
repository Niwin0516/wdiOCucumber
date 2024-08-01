const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get loginPage(){
        return $('#form')
    }
    get usernameField(){
        return $('#username')
    }
    get passwordField(){
        return $('#password')
    }
    get buttonSubbmit(){
        return $('#submit')
    }
    get errorMessage(){
        return $('#error')
    }
    get loginSuccess(){
        return $('h1.post-title')
    }


    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async verifyLoginPageShow(){
        (await this.loginPage).waitForDisplayed()
    }

    async login(username, password){
        await this.usernameField.setValue(username)
        await this.passwordField.setValue(password)
        await this.buttonSubbmit.click()
    }
    async verifyLogin(){
        await expect(this.loginSuccess).toHaveText(
            'Logged In Successfully'
        )
    }
    
    async assertErrorMessage(){
        await expect(this.errorMessage).toHaveText(
            'Your username is invalid!'
        )
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('login');
    }
}

module.exports = new LoginPage();
