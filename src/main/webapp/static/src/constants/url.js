export default class URL {
    static contextPath = 'http://localhost:8080'
    //static contextPath = '.'
    static createUserUrl = `${URL.contextPath}/user/createuser`
    static loginUser = `${URL.contextPath}/login`
    static searchJob = `${URL.contextPath}/jobdetails`
    static updateJob = `${URL.contextPath}/updatejob`
    static createJob = `${URL.contextPath}/createjob`
    static deleteJob = `${URL.contextPath}/deletejob`
}