const graphql=require('graphql');
const _ =require('lodash') ;
const User=require('../models/user')
const Announcements=require('../models/announcements')
const Courses=require('../models/courses')
const Enroll=require('../models/enroll')
const AssignmentsCreate=require('../models/assignments-create')


const encrypt=require('./encrypt.js') 
var mongoose=require('mongoose');
const graphQLDate=require('graphql-iso-date')

const {
    GraphQLDate
    } =graphQLDate;

const{GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
    } = graphql;

const UserType=new GraphQLObjectType({
    name    :  'User',
    fields  : ()=>({
            _id          :   {type   : GraphQLID},
            firstName   :   {type   : GraphQLString},
            lastName    :   {type   : GraphQLString},
            email       :   {type   : GraphQLString},
            password    :   {type   : GraphQLString},
            typeOfPerson:   {type   : GraphQLString},
            About       :   {type   : GraphQLString},
            citycountry :   {type   : GraphQLString},
            Student_id  :   {type   : GraphQLString},
            typeOfPerson:   {type   : GraphQLString},
            school      :   {type   : GraphQLString},
            hometown    :   {type   : GraphQLString},
            language    :   {type   : GraphQLString},
            gender      :   {type   : GraphQLString},
            phone       :   {type   : GraphQLString}
    })
});

const courseType = new GraphQLObjectType({
    name: 'course',
    fields: () => ({
        _id: { type: GraphQLID },
        course_id: { type: GraphQLInt },
        term: { type: GraphQLString },
        course_dept: { type: GraphQLString },
        course_name: { type: GraphQLString },
        course_desc: { type: GraphQLString },
        course_room: { type: GraphQLString },
        course_cap: { type: GraphQLString },
        waitlist: { type: GraphQLString },
        professor: { type: GraphQLString }
    })
});

const enrollType = new GraphQLObjectType({
    name: 'enroll',
    fields: () => ({
        _id: { type: GraphQLID },
        course_id: { type: GraphQLInt },
        Student_id: { type: GraphQLString },
        course_name: { type: GraphQLString },
        email     : { type: GraphQLString },
        grade   : { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args, context) {
                let result = User.find({ email: args.email });
                try {
                    let { req, res } = context;
                    let { email, password } = args;
                    let data = null;
                    // console.log(args);
                    if (!result) {
                        data = {
                            loginSuccess: 0,
                            message: "Email or Password Incorrect"
                        };
                    } else {
                        const match = await bcrypt.compare(password, result.password, function(err,sucess){
                            if(err){
                                console.log('error while checking for password ');
                                throw err;
                            }
                            if(!sucess){
                                console.log('incorrect password..pls try again');
                            }
                            if(sucess){
                                console.log('password is matching...proceed further with token genration'); 
                                const payload = {
                                    email: result.email,
                                    firstName: result.firstName
                                }
                                var token = jwt.sign(payload, 'secret_my',{expiresIn: 10080});
                                console.log('++++++token',token)
                                returndata = {
                                    token: token,
                                    result: result

                                }
    
                                return returndata
    
    
                            }
    
                        });
                        
                        
                    }
                }catch (error) {
                    console.log(error);
                }
            }

        },
        dashboard: {
            type: new GraphQLList(courseType),
            args: {
                id: { type: GraphQLString },
            },
            resolve(parent, args) {
                console.log(args.id);
                let obj = Courses.find({ id: args.id },function(err,result){

                    if(err){
                        throw err;
                    }else{
                        console.log("displaying all courses")
                        return result
                    }
                });
            }
        },
    }
})

const Mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields:{
    Signup:{
            type:UserType,
            args:{
                firstName:{type:new GraphQLNonNull(GraphQLString)},
                lastName:{type:new GraphQLNonNull(GraphQLString)},
                email:{type:new GraphQLNonNull(GraphQLString)},
                password:{type:new GraphQLNonNull(GraphQLString)},
                typeOfPerson:{type:new GraphQLNonNull(GraphQLString)}
            },
             resolve(parent,args){
                encrypt.hashPass(args.password,(err,pass)=>{
                    if(err){
                        console.log("Something went wrong while hashing the password")
                    }else{
                        console.log("Saving the user......",pass)
                        let user=new User({
                            firstName:args.firstName,
                            lastName:args.lastName,
                            email:args.email,
                            password:args.password,
                            typeOfPerson:args.typeOfPerson
                        })
                        return user.save()
                    }
                })
            } 
        },
        profileUpdation: {
            type: UserType,
            args: {
                _id: { type: GraphQLString },
                lastName: { type: GraphQLString },
                firstName: { type: GraphQLString },
                About: { type: GraphQLString },
                email: { type: GraphQLString },
                citycountry: { type: GraphQLString },
                Student_id: { type: GraphQLString },
                school: { type: GraphQLString },
                hometown: { type: GraphQLString },
                language: { type: GraphQLString },
                gender: { type: GraphQLString },
                phone: { type: GraphQLString },
                typeOfPerson: { type: GraphQLString }

            },
            async resolve(parent, args) {
                let { uid, firstName, lastName, phoneNumber, aboutMe, city, country, school, hometown, languages, gender } = args;
                try {
                    var post = { firstName, lastName, phone, About, citycountry, school, hometown, language, gender, Student_id, typeOfPerson };
                   
                    let result = await User.findOneAndUpdate({ _id: _id }, { $set: { ...post } });
                    console.log("In Profile Update Route");
                    console.log("Details");
                    console.log(post);
                    return result;
                } catch (error) {
                    console.log(error);
                }

            }
        },
        CourseAdd: {
            type: courseType,
            args: {
                _id: { type: GraphQLString },
                course_id: { type: GraphQLString },
                course_name: { type: GraphQLString },
                course_dept: { type: GraphQLString },
                course_desc: { type: GraphQLString },
                course_room: { type: GraphQLString },
                course_cap: { type: GraphQLString },
                waitlist: { type: GraphQLString },
                term    : { type: GraphQLString },
                professor: { type: GraphQLString },


            },
            async resolve(parent, args) {

                try {
                    let { course_id, course_name, course_dept, course_desc, course_room, course_cap, waitlist, term, _id } = args;
                    let result = await Courses.findOne({ courseId: courseId });
                    if (result) {
                        return false;
                    } else {
                        let newcourse = new courseModel({
                            course_id, course_name, course_dept, course_desc, course_room, course_cap, waitlist, term, _id,
                            
                        });
                        let result2 = await newcourse.save();                        
                        console.log("In add Courses Route");
                        console.log("Details");
                        console.log(newcourse);
                        return result2;
                    }
                } catch (error) {
                    console.log(error);
                }


            }
        }

    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});