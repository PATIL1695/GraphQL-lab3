var bcrypt=require('bcryptjs');

exports.hashPass=(password,cb)=>{
  console.log("Hash password called",password)
  bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        console.log("Error while generating salt",err)
        return cb(err);
      }
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) {
          console.log("Error while generating hash",err)
          return cb(err);
        }
        return cb(null,hash);
      });
  });
}



//Below we are comapring the password if the owner/traveller tries to login again
exports.comparePass=(password,dbPassword,cb)=>{
  console.log("Compare password called",password)
  bcrypt.compare(password,dbPassword,(err,result)=>{
    if(err){
        return cb(err)
    }
    console.log("Does the traveller password match ?",result)
    if(result==true){
      return cb(null,"SUCCESS");
    }
  })
}