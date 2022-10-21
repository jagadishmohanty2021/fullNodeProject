const signup=require("../api/signUp/index")
const signin=require("../api/signin/index")
const reset=require("../api/reset/index")
const refreshToken = require("../api/refreshToken")
module.exports={
    signup:signup,
    signin:signin,
    reset:reset,
    refreshToken:refreshToken
}