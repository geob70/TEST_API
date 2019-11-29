const mongoose = require("mongoose");

const senatorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    imageUrl: {type: String, required: true}
});

module.exports = mongoose.model("Senator", senatorSchema);
