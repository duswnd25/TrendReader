const dbManager = require("../../data/db/database_manager");
const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    dbManager.getData('blog', 'all', 20, function (result, error) {
        if (error) {
            console.log(error);
        } else {
            res.render('index', {data: result});
        }
    });
});

module.exports = router;