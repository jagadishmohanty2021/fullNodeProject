const {signup,signin,refreshToken,reset}=require("../utility/config")
const userAuth=require("../utility/userAuth")
module.exports=(Router)=>{
Router.post('/signup',signup)
Router.post('/signin',signin)
Router.get('/reset',reset)
Router.get('/refreshtoken',refreshToken)
Router.get('/reset/:id',(req,res)=>{
    res.sendFile("E:\\jagadish\\learning-api\\src\\view\\resetpassword\\index.html")
})
Router.put('/reset/:id',reset)
}