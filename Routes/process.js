const processor = require("../Methods/processor");

module.exports = async(req, res) => {
    let processedInput = await processor(req.body.data);
    res.json(processedInput)
};
