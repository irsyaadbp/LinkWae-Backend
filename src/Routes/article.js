const express = require("express");
const articleController = require("../Controllers/article");
const Router = express.Router();
const { upload } = require("../Middleware/UploadImageArticle");

Router.get("/", articleController.getAllArticle);
Router.get("/:article_id", articleController.getArticleById);
Router.get("/type/:type", articleController.getArticleByType);
Router.post("/", upload.single("image"), articleController.createArticle);
Router.put(
  "/:article_id",
  upload.single("image"),
  articleController.editArticle
);
Router.delete("/:article_id", articleController.deleteArticle);

module.exports = Router;
