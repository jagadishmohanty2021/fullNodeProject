const httpGet = require("./httpHandlers/httpGet")

test('Adding two numbers', async () => {
    const result=await httpGet()
    expect(result).toStrictEqual({"status":200,body:{message:"successfull ",data:"Jagadish"}})
})