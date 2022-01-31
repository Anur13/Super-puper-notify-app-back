
const authMiddleware = function(req,res,next){
  console.log(req.headers)
  next()
 }

 module.exports = authMiddleware;
