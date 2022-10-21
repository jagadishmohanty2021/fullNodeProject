const userModel = require("../../../models/user_model");
const { getJwtToken, passwordEncryption } = require("../../../utility/common")
const Validator = require('joi');
const xss = require('xss');

module.exports = async (req) => {
    const validationRule = Validator.object({
        name: Validator.string().required(),
        email: Validator.string().email().required(),
        role: Validator.string().allow('admin', 'teacher', 'student', 'superadmin').required(),
        password: Validator.string().required()
    })
    const filterXSS = {
        name: req.body.name||'',
        email: req.body.email||'',
        role: (req.body.role||'').toLowerCase(),
        password: req.body.password||''
    }

    const { value, error } = await validationRule.validate(filterXSS);
    if (error == null) {
        return await action(value);
    }else{
        const {details}=error;
        const message = details.map((i)=>i.message).join(",")
        return { "status": 422, message: message, data: [] }
    }
}

const action = async (req) => {
    try {

        let password = await passwordEncryption(req.password, 10);
        const userData = new userModel({
            name: req.name,
            email: req.email,
            role: (req.role).toLowerCase(),
            password: password
        })
        userData.save();
        return { "status": 200, message: "SignUp Successfully", accessToken: token }

    } catch (err) {
        return { "status": 500, message: err.message, data: [] }

    }

}


