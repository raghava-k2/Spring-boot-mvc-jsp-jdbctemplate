export default class URL {
    static contextPath = 'http://localhost:8080'
    static createUserUrl = `${URL.contextPath}/user/createuser`
    static loginUser = `${URL.contextPath}/login`
}