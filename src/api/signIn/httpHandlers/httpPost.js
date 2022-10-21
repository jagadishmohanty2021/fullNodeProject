const userModel = require("../../../models/user_model");
const { getJwtToken, passwordDecryption } = require("../../../utility/common")
const Validator = require('joi');
const xss = require('xss');

module.exports = async (req) => {
    const validationRule = Validator.object({
        email: Validator.string().email().required(),
        password: Validator.string().required(),
    })
    const filterXSS = {
        email: req.body.email||'',
        password: req.body.password||'',
    }

    const { value, error } = await validationRule.validate(filterXSS);
    if (error == null) {
        return await action(value);
    } else {
        const { details } = error;
        const message = details.map((i) => i.message).join(",")
        return { "status": 422, message: message, data: [] }
    }
}

const action = async (req) => {
    try {

        const validateData = await userModel.findOne({ email: req.email });
        if (validateData && validateData._doc) {
            let password = await passwordDecryption(req.password, validateData._doc.password);
            if (password) {
                const token = await getJwtToken({ role: req.role, name: req.name, email: req.email }, process.env.USERSECRET);
                return { "status": 200, message: "SignIn Successfully", accessToken: token }
            } else {
                return { "status": 404, message: "Invalid Password", data: [] }
            }

        } else {
            return { "status": 404, message: "Invalid Username", data: [] }
        }

    } catch (err) {
        return { "status": 500, message: err.message, data: [] }
    }

}


