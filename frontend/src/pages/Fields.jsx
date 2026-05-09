import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getFields } from "../services/api";

function Fields() {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const data = await getFields();
        setFields(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFields();
  }, []);

  const filteredFields = useMemo(() => {
    return fields.filter(
      (field) =>
        field.name?.toLowerCase().includes(search.toLowerCase()) ||
        (field.location || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [fields, search]);

  return (
    <div>
      <Navbar />

      <div className="container page-section">
        <div className="match-page-head">
          <div>
            <span className="hero-badge">Khám phá sân bóng</span>
            <h1 className="section-title">Chọn sân phù hợp để đặt lịch thi đấu</h1>
            <p className="section-subtitle">
              Tìm sân theo khu vực, xem mức giá và đặt sân nhanh chóng với giao diện trực quan.
            </p>
          </div>
        </div>

        <div className="match-toolbar">
          <div className="match-search-box">
            <input
              type="text"
              placeholder="Tìm theo tên sân hoặc khu vực..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="btn-primary">Tìm kiếm</button>
        </div>

        <div className="match-filter-row">
          <span className="match-filter-pill active">Còn trống</span>
          <span className="match-filter-pill">5 vs 5</span>
          <span className="match-filter-pill">Sân phong trào</span>
          <span className="match-filter-pill">Buổi tối</span>
        </div>

        {loading && <p>Đang tải dữ liệu...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && filteredFields.length === 0 && (
          <div className="empty-box">Không tìm thấy sân phù hợp với từ khóa hiện tại.</div>
        )}

        <div className="match-card-grid">
          {filteredFields.map((field, index) => (
            <div
              key={field.id}
              className={`modern-field-card motion-delay-${(index % 5) + 1}`}
            >
              <div className="modern-field-image">
                <span className="modern-field-badge">
                  {field.status === "available" ? "Còn trống" : "Đang nhận đặt sân"}
                </span>
                <span className="modern-field-type">Sân bóng</span>
              </div>

              <div className="modern-field-content">
                <h3>{field.name}</h3>

                <p className="modern-field-location">
                  📍 {field.location || "Chưa cập nhật khu vực"}
                </p>

                <div className="modern-field-tags">
                  <span>5v5</span>
                  <span>Đặt theo giờ</span>
                  <span>Phong trào</span>
                </div>

                <div className="modern-field-footer">
                  <div className="modern-field-price">
                    <strong>
                      {Number(field.price || 0).toLocaleString("vi-VN")}
                    </strong>
                    <span>VNĐ / giờ</span>
                  </div>

                  <div className="modern-field-actions">
                    <Link to={`/fields/${field.id}`}>
                      <button className="btn-detail">Chi tiết</button>
                    </Link>

                    <Link to={`/booking/${field.id}`}>
                      <button className="modern-match-btn">Đặt sân</button>
                    </Link>
                  </div>
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

export default Fields;