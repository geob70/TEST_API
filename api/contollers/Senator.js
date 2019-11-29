const Senator = require("../models/senator");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "geo-b7o",
    api_key: "555755959336282",
    api_secret: "zJWxGIY4JsPNrssQ-gko6JbMLkI"
});

exports.add_senator = (req, res, next) => {
    const senator = new Senator({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        imageUrl: req.body.imageurl
    });
    console.log(senator);
    senator.save()
        .then(result => {
            return res.status(201).json({
                message: "Senator created successfully"
            });
        }).catch(err => {
            return res.status(500).json({
                error: err
            });
        })
}

exports.upload_image = (req, res, next) => {
    const imageFile = req.files.files;
    console.log(imageFile);
    cloudinary.uploader.upload(imageFile.tempFilePath, function(err, result) {
        if (err || !result) {
            cloudinary.uploader.upload(imageFile.tempFilePath, function(err, result) {
                if (err || !result) {
                    console.log(err, result);
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    res.send({
                        success: true,
                        message: "uploaded successfully",
                        url: result.url
                    })
                }
            });
        } else {
            res.send({
                success: true,
                message: "uploaded successfully",
                url: result.url
            })
        }
    });
}

exports.get_all_senator = (req, res, next) => {
    Senator.find()
        .exec()
        .then(result => {
            res.status(200).json({
                data: result
            })
        })
        .catch(err => {
            res.status(500).json({
              error: err
            });
        });
}

exports.delete_senator = (req, res, next) => {
    console.log(req.body);
    const id = req.body.s_id;
    Senator.remove({ _id: id })
        .exec()
        .then(result => {
        res.status(200).json({
            message: "Senator deleted",
        });
        })
        .catch(err => {
        res.status(500).json({
            error: err
        });
    });    
}

exports.update_senator_name = (req, res, next) => {
    console.log(req.body);
    Senator.updateOne({_id: req.body.id}, {$set: {name: req.body.name}})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "update success"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
        });
}

exports.update_senator_image = (req, res, next) => {
    Senator.updateOne({_id: req.body.id}, {$set: {imageUrl: req.body.imageUrl}})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "update success"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
        });
}
