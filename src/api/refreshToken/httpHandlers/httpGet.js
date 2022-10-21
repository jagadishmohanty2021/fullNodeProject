const userModel = require("../../../models/user_model");
const { getJwtToken, passwordDecryption, jwtTokenVerify } = require("../../../utility/common")
const Validator = require('joi');
const xss = require('xss');

module.exports = async (req) => {
    const validationRule = Validator.object({
        token: Validator.string().required(),
    })
    const filterXSS = {
        token: req.headers.authorization || '',
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
        let payload = await jwtTokenVerify(req.token, process.env.USERSECRET, { ignoreExpiration: true });
        delete payload.exp;
        delete payload.iat;
        const token = await getJwtToken(payload, process.env.USERSECRET);
        
        return { "status": 200, message: "Refresh token generate successfully", refreshToken: token }

    } catch (err) {
        return { "status": 500, message: err.message, data: [] }
    }

}


