export class ActionUtil {
    static checkValidations(obj) {
        if (!obj.userName) 
            return 'userName is mandatory'
        else if (!obj.password) 
            return 'Password is mandatory'
        else if (!obj.confPassword) 
            return 'Confirm Password is mandatory'
        else if (obj.password !== obj.confPassword) 
            return 'Passowrd and Confirm Password should be same'
        else if (!obj.email) 
            return 'Email Id is required'
        else 
            return null
    }
}