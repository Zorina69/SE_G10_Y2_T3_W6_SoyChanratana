import { Router } from "express";
import { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle, getArticleWithJournalist, getArticlesByJournalistId, getAllcategory } from "../controllers/articleController.js";

const articleRouter = Router();
articleRouter.get("/", getAllArticles);
articleRouter.get("/:id", getArticleById);
articleRouter.post("/", createArticle);
articleRouter.put("/:id", updateArticle);
articleRouter.delete("/:id", deleteArticle);
articleRouter.get("/articles/:id", getArticleWithJournalist);
articleRouter.get("/journalist/:journalistId/articles", getArticlesByJournalistId);
articleRouter.get("/:categoryId", getAllcategory); 

export default articleRouter;
