const router = require("express").Router();

//our favourites model
const favourites = require("../models/favourites");

//Add favourites mới
router.post("/save", async (req, res) => {
    const newFavourites = favourites({
        name: req.body.name,
        imageURL: req.body.imageURL,
        songURL: req.body.songURL,
        album: req.body.album,
        artist: req.body.artist,
        language: req.body.language,
        category: req.body.category,
    });

    try {
        const savedFavourites = await newFavourites.save();
        return res.status(200).send({ success: true, favourites: savedFavourites })
    } catch (error) {
        return res.status(400).send({ success: false, msg: error });
    }
});

//lấy 1 id của favourites
router.get("/getOne/:id", async (req,res) => {
    const filter = { _id : req.params.id };

    const data = await favourites.findOne(filter)

    if (data) {
        return res.status(200).send({ success: true, favourites: data })
    } else {
        return res.status(400).send({ success: false, msg: "Data not found" });
    }
});

//lấy tất cả favourites kiểu như lấy danh sách
router.get("/getAll", async (req, res) => {
    const options = {
        sort: {
            createdAt : 1,
        }
    }

    const data = await favourites.find(options);
    if (data) {
        return res.status(200).send({ success: true, favourites: data })
    } else {
        return res.status(400).send({ success: false, msg: "Data not found" });
    }
})

//update favourites
router.put("/update/:id", async (req, res) => {

    const filter = {_id : req.params.id};

    const options = {
        upsert : true,
        new : true
    };

    try {
        const result = await favourites.findOneAndUpdate(
            filter, 
            {
                name: req.body.name,
                imageURL: req.body.imageURL,
                songURL: req.body.songURL,
                album: req.body.album,
                artist: req.body.artist,
                language: req.body.language,
                category: req.body.category,
            },
            options
        );
        return res.status(200).send({success : true, data : result})
    } catch (error) {
        return res.status(400).send({ success : false, msg : error})
    }
})

//delete favourites
router.delete("/delete/:id", async (req, res) => {
    const filter = { _id: req.params.id }

    const result = await favourites.deleteOne(filter);
    if (result) {
        return res.status(200).send({ success: true, msg: "Data Deleted successfully", data: result })
    } else {
        return res.status(400).send({ success: false, msg: "Data not found" });
    }
});

module.exports = router;