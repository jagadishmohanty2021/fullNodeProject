const handler = require("./httpHandlers")
const {logger} = require("../../utility/logger")
module.exports = async (req, res) => {
    let responseObj = {};
    switch (req.method) {
        case "GET":
            try {
                responseObj = await handler.httpGet(req);
            } catch (err) {
                logger.error(JSON.stringify(err))
                res.send(err)
            }
            break;
            case "PUT":
                try {
                    responseObj = await handler.httpPut(req);
                    logger.info(JSON.stringify(responseObj))
                } catch (err) {
                    logger.error(JSON.stringify(err))
                    res.send(err)
                }
                break;
    }
    return res.send(responseObj);

}