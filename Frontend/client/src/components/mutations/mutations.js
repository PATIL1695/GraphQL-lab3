import { gql } from 'apollo-boost';

const login=gql`
mutation Login($email: String, $password: String){
    login(email: $email, password: $password){
        _id,
        typeOfPerson,
        email
    }
}
`
const signup=gql`
    mutation Signup($email: String, $password: String,$firstName:String,$lastName:String,$typeOfPerson:String){
        signup(email: $email, password: $password,firstName:$firstName,lastName:$lastName,typeOfPerson:$typeOfPerson){
        _id,
        typeOfPerson,
        email
        }
    }
`
const CourseAdd=gql`
    mutation CourseAdd($_id:String,$course_id: String, $course_name: String,$term:String,$course_dept:String,$course_desc:String,$course_room:String,
        $course_cap:String,$waitlist:String,$professor:String){
        CourseAdd(_id:$_id,course_id: $courss_id,term:$term, course_name: $course_name,course_dept:$course_dept,course_desc:$course_desc,
            course_room:$course_room,course_cap:$course_cap,waitlist:$waitlist,professor:$professor){
       _id
        }
    }
`
const updateProfile=gql`
    mutation ProfileUpdation($_id:String,$firstName:String,
        $lastName:String,$gender:String,$phone:String,$About:String,$hometown:String,$language:String,$citycountry:String,$school:String,$typeOfPerson:String){
        profileUpdation(_id:$_id,firstName:$firstName,lastName:$lastName,gender:$gender,phone:$phone,About:$About, 
            hometown:$hometown,language:$language,citycountry:$citycountry,school:$school){
        _id,
        typeOfPerson,
        email,
        firstName,
        lastName,
        About,
        phone,
        language,
        hometown,
        gender,
        citycountry,
        school
        }
    }
`
const dashboardCourses=gql`
mutation DashboardCourses($id: String){
    dashboardCourses(_id: $i_d){
    _id,
    course_name,
    course_id,
    term,
  course_dept,
  course_desc,
  course_room,
  course_cap,
  waitlist,
  professor,
    }
}
`

export {CourseAdd,dashboardCourses,login,signup,updateProfile};