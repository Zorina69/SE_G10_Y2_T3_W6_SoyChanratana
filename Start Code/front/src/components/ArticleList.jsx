import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getArticles, removeArticle } from "../services/api";

const categories = [
  { id: 1, name: "FUTURE" },
  { id: 2, name: "AI" },
  { id: 3, name: "TECH" },
];

//
// ArticleList component
//
export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles(); // Fetch all articles when component mounts
  }, []);

  const fetchArticles = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getArticles();
      setArticles(data);
    } catch (err) {
      setError("Failed to load articles. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteArticle = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      await removeArticle(id);
      await fetchArticles(); // refresh the list
    } catch (err) {
      setError("Failed to delete article.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (id) => navigate(`/articles/articles/${id}`);

  const handleEdit = (id) => navigate(`/articles/${id}/edit`);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

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

function ArticleCard({ article, onView }) {
  return (
    <div className="article-card">
      <div className="article-title">{article.title}</div>
      <div className="article-author">
        By:{" "}
        <Link to={`/articles/journalist/${article.journalistId}/articles`}>
          {article.journalistName}
        </Link>
      </div>
      <div className="article-actions">
        {categories.map((cat) => (
          <button
            key={cat.id}
            disabled
            style={{
              marginRight: "8px",
              padding: "4px 12px",
              borderRadius: "12px",
              border: "1px solid #007bff",
              background: cat.id === article.categoryId ? "#007bff" : "#fff",
              color: cat.id === article.categoryId ? "#fff" : "#007bff",
              fontWeight: "bold",
              cursor: "default",
              opacity: cat.id === article.categoryId ? 1 : 0.6,
            }}
          >
            {cat.name}
          </button>
        ))}
        <button className="button-secondary" onClick={() => onView(article.id)}>
          View
        </button>
      </div>
    </div>
  );
}
