const userModel = require("../../../models/user_model");

module.exports = async (req = '') => {
    if (req.params.id) {
        await userModel.findOneAndUpdate({ _id: req.params.id }, { $set: { password: req.body.password } });
        return { "status": 200, body: { message: "Password successfully changed", data: [] } };
    } else {
        return { "status": 422, body: { message: "Invalid Id", data: [] } };
    }
}
