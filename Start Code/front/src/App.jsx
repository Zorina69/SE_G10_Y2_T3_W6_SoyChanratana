import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  NavLink,
} from "react-router-dom";
import { useState } from "react";

import ArticleList from "./components/ArticleList";
import ArticleForm from "./components/ArticleForm";
import ArticlePage from "./components/ArticlePage";
import ArticleDetailPage from "./components/ArticleDetailPage";
import ArticleListByCategoryId from "./components/ArticleListByCategoryId";

function App() {
  const [showDropdown, setShowDropdown] = useState(false);
  const category = [
    { id: 1, name: "FUTURE" },
    { id: 2, name: "AI" },
    { id: 3, name: "TECH" },
  ];

  return (
    <BrowserRouter>
      <header>
        <h1>Article App</h1>
      </header>

      <nav>
        <NavLink to="/articles" end className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}> View Articles</NavLink>
        <NavLink to="/articles/add" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}> + Create Article</NavLink>
        <div
          className="nav-item dropdown"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
          style={{ display: "inline-block", position: "relative" }}
        >
          <span style={{ cursor: "pointer" }}>Category ▼</span>
          {showDropdown && (
            <div
              className="dropdown-menu"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                background: "#fff",
                border: "1px solid #ccc",
                zIndex: 1000,
                minWidth: "160px",
                padding: "8px 0",
              }}
            >
              {category.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => window.location.href = `/articles/categoryId/${cat.id}`}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "8px 16px",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    color: "#333"
                  }}
                  className="dropdown-item"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/articles" />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/add" element={<ArticleForm isEdit={false} />} />
        <Route path="/articles/articles/:id" element={<ArticlePage />} />
        <Route path="/articles/journalist/:journalistId/articles" element={<ArticleDetailPage />} />
        <Route path="/articles/categoryId/:categoryId" element={<ArticleListByCategoryId />} />
        <Route
          path="/articles/:id/edit"
          element={<ArticleForm isEdit={true} />}
        />
        <Route path="/articles/:id" element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
