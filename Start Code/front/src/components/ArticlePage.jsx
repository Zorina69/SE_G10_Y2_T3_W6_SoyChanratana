import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleById } from "../services/api";

export default function ArticlePage() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const found = await getArticleById(id);
        if (found) {
          setArticle(found);
          setError("");
        } else {
          setArticle(null);
          setError("Article not found.");
        }
      } catch (err) {
        setError("Failed to fetch article.");
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) return <div>Loading article...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!article) return <div>No article found.</div>;

  return (
    <div className="article-page">
      <h1>Article Details</h1>
      <div><strong>Title: </strong> {article.title}</div>
      <div><strong>Content: </strong> {article.content}</div>
    </div>
  );
}
