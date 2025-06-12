import { pool } from "../utils/database.js";

// Get all articles
export async function getArticles() {
  const [rows] = await pool.query(
    `SELECT articles.*, journalist.name AS journalistName, category.name AS categoryName
     FROM articles
     LEFT JOIN journalist ON articles.journalistId = journalist.id
     LEFT JOIN category ON articles.categoryId = category.id`
  );
  return rows;
}

// Get one article by ID
export async function getArticleById(id) {
  const [rows] = await pool.query(
    `SELECT articles.*, journalist.name AS journalistName, category.name AS categoryName
     FROM articles
     LEFT JOIN journalist ON articles.journalistId = journalist.id
     LEFT JOIN category ON articles.categoryId = category.id
     WHERE articles.id = ?`,
    [id]
  );
  return rows[0];
}

// Create a new article
export async function createArticle(article) {
  const { title, content, journalistId, categoryId } = article;
  const [result] = await pool.query(
    "INSERT INTO articles (`title`, `content`, `journalistId`, `categoryId`) VALUES (?, ?, ?, ?)",
    [title, content, journalistId, categoryId]
  );
  return { id: result.insertId, ...article };
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
  const { title, content, journalistId, categoryId } = updatedData;
  try {
    const [result] = await pool.query(
      "UPDATE articles SET title = ?, content = ?, journalistId = ?, categoryId = ? WHERE id = ?",
      [title, content, journalistId, categoryId, id]
    );
    if (result.affectedRows === 0) {
      throw new Error("Article not found");
    }
    return { id, ...updatedData };
  } catch (error) {
    throw error;
  }
}

// Delete an article by ID
export async function deleteArticle(id) {
  try {
    const [result] = await pool.query("DELETE FROM articles WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      throw new Error("Article not found");
    }
    return { id };
  } catch (error) {
    throw error;
  }
}

// Get all articles by journalist ID
export async function getArticlesByJournalistId(journalistId) {
  const [rows] = await pool.query(
    `SELECT articles.*, journalist.name AS journalistName, category.name AS categoryName
     FROM articles
     LEFT JOIN journalist ON articles.journalistId = journalist.id
     LEFT JOIN category ON articles.categoryId = category.id
     WHERE journalist.id = ?`,
    [journalistId]
  );
  return rows;
}

// Get journalist name by article
export async function getArticleWithJournalist(id) {
  const [rows] = await pool.query(
    `SELECT articles.*, journalist.name AS journalistName, category.name AS categoryName
     FROM articles
     LEFT JOIN journalist ON articles.journalistId = journalist.id
     LEFT JOIN category ON articles.categoryId = category.id
     WHERE articles.id = ?`,
    [id]
  );
  return rows[0];
}

// get categories
export async function getCategories() {
  const [rows] = await pool.query("SELECT * FROM category");
  return rows;
}