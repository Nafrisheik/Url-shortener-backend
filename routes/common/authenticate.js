const jwt =require("jsonwebtoken");
var authenticate = function(req,res,next){
    // console.log(req.headers)
    if(req.headers.authorization){
        jwt.verify(req.headers.authorization,"kskskxxx",function(err,decoded){
            console.log(decoded)
            if(decoded){
                next();
            }else{
                res.json({
                    message:"Token not valid"
                });
            }
        })
        
    }else {
    res.json({
        message:"Not Authorized"
    });
}
};
module.exports = {authenticate};