const { articleModel } = require("../Models/article");

exports.getAllArticle = async (req, res) => {
  try {
    const articles = await articleModel.findAll();

    res.json({
      status: "success",
      response: articles
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error
    });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const id = req.params.article_id;
    const articleById = await articleModel.findOne({
      where: { id }
    });

    if (articleById) {
      res.json({
        status: "success",
        response: articleById
      });
    } else {
      res.json({
        status: "error",
        response: "Article not found"
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      response: error
    });
  }
};

exports.getArticleByType = async (req,res) => {
  try {
    const type = req.params.type;
    const articleByType = await articleModel.findOne({
      where: { type }
    });

    if (articleByType) {
      res.json({
        status: "success",
        response: articleByType
      });
    } else {
      res.json({
        status: "error",
        response: "Article not found"
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      response: error
    });
  }
}

exports.createArticle = async (req, res) => {
  try {
    console.log(type);
    const title = req.body.title;
    const spoiler = req.body.spoiler;
    const content = req.body.content;
    const type = req.body.type === "promo" ? "promo" : "info";

    const checkTitle = await articleModel.findOne({ where: { title, type } });

    if (checkTitle) {
      return res.json({
        status: "error",
        response: "Article is exist"
      });
    }

    const image = req.file
      ? "/images/uploads/articles/" + req.file.filename
      : "/images/empty-img.jpg";

    console.log(image, "images");

    if (title === "" || title === null || title === undefined) {
      return res.json({
        status: "error",
        response: "Title cant be empty"
      });
    }

    if (spoiler === "" || spoiler === null || spoiler === undefined) {
      return res.json({
        status: "error",
        response: "Spoiler cant be empty"
      });
    }

    if (content === "" || content === null || content === undefined) {
      return res.json({
        status: "error",
        response: "Content cant be empty"
      });
    }

    const insertArticle = await articleModel.create(
      {
        title,
        image,
        spoiler,
        content,
        type
      },
      {
        fields: ["title", "image", "spoiler", "content", "type"]
      }
    );
    if (insertArticle) {
      const newArticle = await articleModel.findOne({ where: { title, type } });
      res.json({
        status: "success",
        response: newArticle
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error
    });
  }
};

exports.editArticle = async (req, res) => {
  try {
    const id = req.params.article_id;

    const title = req.body.title;
    const spoiler = req.body.spoiler;
    const content = req.body.content;
    const type = req.body.type === "promo" ? "promo" : "info";

    const checkTitle = await articleModel.findOne({ where: { title, type } });

    if (checkTitle && Number(checkTitle.id) !== Number(id)) {
      return res.json({
        status: "error",
        response: "Article is exist"
      });
    }

    const image = req.body.image
      ? req.body.image
      : req.file
      ? "/images/uploads/articles/" + req.file.filename
      : "/images/empty-img.jpg";

    console.log(image, "images");

    if (title === "" || title === null || title === undefined) {
      return res.json({
        status: "error",
        response: "Title cant be empty"
      });
    }

    if (spoiler === "" || spoiler === null || spoiler === undefined) {
      return res.json({
        status: "error",
        response: "Spoiler cant be empty"
      });
    }

    if (content === "" || content === null || content === undefined) {
      return res.json({
        status: "error",
        response: "Content cant be empty"
      });
    }

    console.log(title, image, spoiler, content, type);

    console.log(
      {
        title,
        image,
        spoiler,
        content,
        type
      },
      {
        where: { id }
      }
    );
    const updateArticle = await articleModel.update(
      {
        title,
        image,
        spoiler,
        content,
        type
      },
      {
        where: { id }
      }
    );
    if (updateArticle) {
      const article = await articleModel.findOne({ where: { id } });
      res.json({
        status: "success",
        response: { message: "Success edit article", article }
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      response: error
    });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const id = req.params.article_id;
    const article = await articleModel.findOne({ where: { id } });

    if (!article) {
      return res.json({ status: "error", response: "Article not found" });
    }

    const deleteArticle = await articleModel.destroy({ where: { id } });

    if (deleteArticle) {
      res.json({
        status: "success",
        response: { message: "Success delete article", article }
      });
    }
  } catch (error) {}
};
