const mongoose = require("mongoose");

const infoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    
});

module.exports = mongoose.model("Info", infoSchema);
