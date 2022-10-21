const jwt = require("jsonwebtoken")
const bcrypt=require("bcrypt")
module.exports = {
    getJwtToken: async (payload, secret,expireTime='1hr') => {
        return await jwt.sign(payload, secret,{ expiresIn:expireTime })
    },
    jwtTokenVerify:async(token,secret,option={})=>{
        return await jwt.verify(token,secret,option);
    },
    passwordEncryption:async(password,saltRounds=10)=>{
       return await bcrypt.hash(password, saltRounds)
    },
    passwordDecryption:async(password,hash)=>{
       return await bcrypt.compare(password, hash)
    }
}