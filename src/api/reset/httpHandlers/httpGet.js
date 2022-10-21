const userModel = require("../../../models/user_model")
module.exports = async (req = '') => {
    // const data = new userModel({name:"Jagadish",email:"jagadish@gmail.com",password:"jagadish1234"})
    // data.save()
    if (req.body.email) {
        let emailId = await userModel.findOne({ email: req.body.email }).select("id");
        if (emailId._doc._id) {
            return { "status": 200, body: { message: "successfull ", passwordResetLink: `http://localhost:3000/api/reset/${emailId._doc._id}` } };
        } else {
            return { "status": 404, body: { message: "Email id not found", data: [] } };
        }
    } else {
        return { "status": 422, body: { message: "Email id is required", data: [] } };
    }
}
