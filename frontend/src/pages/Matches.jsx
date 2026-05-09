import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getMatches } from "../services/api";
import { formatDateTimeVN } from "../utils/format";

function Matches() {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getMatches();
        setMatches(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMatches();
  }, []);

  const filteredMatches = useMemo(() => {
    return matches.filter(
      (match) =>
        match.title?.toLowerCase().includes(search.toLowerCase()) ||
        match.location?.toLowerCase().includes(search.toLowerCase())
    );
  }, [matches, search]);

  return (
    <div>
      <Navbar />

      <div className="container page-section">
        <div className="match-page-head">
          <div>
            <span className="hero-badge">Khám phá trận đấu</span>
            <h1 className="section-title">Tìm trận phù hợp để tham gia</h1>
            <p className="section-subtitle">
              Xem các trận đang mở đăng ký, chọn địa điểm phù hợp và tham gia cùng cộng đồng bóng đá.
            </p>
          </div>
        </div>

        <div className="match-toolbar">
          <div className="match-search-box">
            <input
              type="text"
              placeholder="Tìm theo tên trận hoặc địa điểm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="btn-primary">Tìm kiếm</button>
        </div>

        <div className="match-filter-row">
          <span className="match-filter-pill active">Đang mở đăng ký</span>
          <span className="match-filter-pill">5 vs 5</span>
          <span className="match-filter-pill">Phong trào</span>
          <span className="match-filter-pill">Buổi tối</span>
        </div>

        {error && <p className="error-text">{error}</p>}

        {!error && filteredMatches.length === 0 && (
          <div className="empty-box">Hiện chưa có trận phù hợp với bộ lọc hiện tại.</div>
        )}

        <div className="match-card-grid">
          {filteredMatches.map((match, index) => (
            <div
              key={match.id}
              className={`modern-match-card motion-delay-${(index % 5) + 1}`}
            >
              <div className="modern-match-image">
                <span className="modern-match-badge">OPEN MATCH</span>
                <span className="modern-match-level">Phong trào</span>
              </div>

              <div className="modern-match-content">
                <h3>{match.title}</h3>

                <p className="modern-match-location">📍 {match.location}</p>

                <div className="modern-match-meta">
                  <div>
                    <span>THỜI GIAN</span>
                    <strong>{formatDateTimeVN(match.time) || match.time}</strong>
                  </div>

                  <div>
                    <span>SỨC CHỨA</span>
                    <strong>{match.max_players} người</strong>
                  </div>
                </div>

                <div className="modern-match-footer">
                  <div className="modern-match-status">
                    <span className="status-dot"></span>
                    Đang tuyển người
                  </div>

                  <Link to={`/matches/${match.id}`}>
                    <button className="modern-match-btn">Xem chi tiết</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Matches;