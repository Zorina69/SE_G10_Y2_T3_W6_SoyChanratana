import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { getArticles, removeArticle } from "../services/api";

export default function ArticleListByCategoryId() {
  const { categoryId } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchArticles = useCallback(
    async (retries = 3) => {
      setIsLoading(true);
      setError("");
      try {
        const data = await getArticles();
        const filteredArticles = data.filter(
          (article) => String(article.categoryId) === String(categoryId)
        );
        setArticles(filteredArticles);
      } catch (err) {
        if (retries > 0) {
          setTimeout(() => fetchArticles(retries - 1), 1000);
        } else {
          setError("Failed to load articles. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [categoryId]
  );

  const deleteArticle = useCallback(
    async (id) => {
      if (window.confirm("Are you sure you want to delete this article?")) {
        setIsLoading(true);
        setError("");
        try {
          await removeArticle(id);
          await fetchArticles();
        } catch (err) {
          setError("Failed to delete article.");
        } finally {
          setIsLoading(false);
        }
      }
    },
    [fetchArticles]
  );

  const handleView = useCallback((id) => navigate(`/articles/${id}`), [navigate]);
  const handleEdit = useCallback((id) => navigate(`/articles/${id}/edit`), [navigate]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return (
    <>
      {isLoading && (
        <div className="spinner">
          <div className="spinner-icon"></div>Loading...
        </div>
      )}
      {error && <p className="error">{error}</p>}
      {!isLoading && !error && articles.length === 0 && (
        <p className="no-articles">
          No articles found for this category.
        </p>
      )}
      <div className="article-list">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={deleteArticle}
          />
        ))}
      </div>
    </>
  );
}

function ArticleCard({ article, onView, onEdit, onDelete }) {
  return (
    <div className="article-card">
      <div className="article-title">{article.title}</div>
      <div className="article-author">By: {article.journalistName}</div>
      <div className="article-actions">
        <button
          className="button-tertiary"
          onClick={() => onEdit(article.id)}
          aria-label={`Edit article: ${article.title}`}
        >
          Edit
        </button>
        <button
          className="button-tertiary"
          onClick={() => onDelete(article.id)}
        >
          Delete
        </button>
        <button
          className="button-secondary"
          onClick={() => onView(article.id)}
          aria-label={`View article: ${article.title}`}
        >
          View
        </button>
      </div>
    </div>
  );
}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    journalistName: PropTypes.string.isRequired,
    journalistId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};