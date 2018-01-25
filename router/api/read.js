const DbManager = require("../../data/db/database_manager");
const express = require("express");
const Router = express.Router();

// 읽기
Router.get("/:target_column/:user_query", (req, res) => {
    DbManager.getData(req.params.target_column, req.params.user_query, 1000, function (result, error) {
        if (error) {
            return res.status(404).json({error: "매개변수를 확인해 주세요."});
        } else {
            return res.json(result);
        }
    });
});

module.exports = Router;