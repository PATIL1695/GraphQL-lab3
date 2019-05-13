import { gql } from 'apollo-boost';


const CoursesQuery=gql`
query Courses($id: String){
      Courses(id: $id){
    _id,
    course_name,
    course_id,
    Term,
    course_dept,
    course_name,
    course_desc,
    course_room,
    course_cap,
    waitlist,
    professor
  
    }
}
`
const loginQuery=gql`
query Login($email: String, $password: String){
    login(email: $email, password: $password){
        _id,
        typeOfPerson,
        email
    }
}
`

export { CoursesQuery,loginQuery };