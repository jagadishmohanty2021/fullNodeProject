const {httpPost} = require("./httpHandlers")
const { logger } = require("../../utility/logger")
module.exports = async (req, res) => {
    let responseObj = {};
    switch (req.method) {
        case "POST":
            try {
                responseObj = await httpPost(req);
                logger.info(JSON.stringify(responseObj))
            } catch (err) {
                logger.error(JSON.stringify(err))
                res.send(err)
            }
            break;
    }
    return res.send(responseObj);
}