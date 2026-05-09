import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getFieldById } from "../services/api";

function FieldDetail() {
  const { id } = useParams();
  const [field, setField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchField = async () => {
      try {
        const data = await getFieldById(id);
        setField(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchField();
  }, [id]);

  const fieldStatusText =
    field?.status === "available" ? "Còn trống" : field?.status || "Chưa cập nhật";

  const fieldPriceText = `${Number(field?.price || 0).toLocaleString("vi-VN")} VNĐ / giờ`;

  return (
    <div>
      <Navbar />

      <div className="container page-section">
        {loading && <p>Đang tải chi tiết sân...</p>}
        {error && <p className="error-text">{error}</p>}

        {field && (
          <>
            <div className="detail-hero">
              <div className="detail-hero-left">
                <span className="hero-badge">Chi tiết sân bóng</span>
                <h1>{field.name}</h1>
                <p>
                  Xem thông tin sân, mức giá và chọn khung giờ phù hợp để đặt sân nhanh chóng.
                </p>

                <div className="detail-tags">
                  <span className="field-status">{fieldStatusText}</span>
                  <span className="detail-tag">Sân cộng đồng</span>
                </div>
              </div>

              <div className="detail-hero-right">
                <div className="detail-info-box">
                  <h3>Thông tin nhanh</h3>
                  <p><strong>Tên sân:</strong> {field.name}</p>
                  <p><strong>Giá thuê:</strong> {fieldPriceText}</p>
                  <p><strong>Khu vực:</strong> {field.location || "Chưa cập nhật"}</p>
                  <p>
                    <strong>Trạng thái:</strong> {fieldStatusText}
                  </p>
                </div>
              </div>
            </div>

            <div className="detail-layout">
              <div className="simple-card">
                <h2 style={{ marginBottom: "14px" }}>Giới thiệu sân</h2>
                <p className="section-subtitle" style={{ marginBottom: "14px" }}>
                  Sân bóng phù hợp cho các trận giao lưu, đá phong trào và đặt lịch theo giờ.
                </p>

                <div style={{ display: "grid", gap: "14px" }}>
                  <p className="field-info">
                    <strong>Tên sân:</strong> {field.name}
                  </p>
                  <p className="field-info">
                    <strong>Giá thuê:</strong> {fieldPriceText}
                  </p>
                  <p className="field-info">
                    <strong>Khu vực:</strong> {field.location || "Chưa cập nhật"}
                  </p>
                  <p className="field-info">
                    <strong>Trạng thái hiện tại:</strong> {fieldStatusText}
                  </p>
                </div>
              </div>

              <div className="simple-card">
                <h2 style={{ marginBottom: "14px" }}>Hành động nhanh</h2>
                <p className="section-subtitle" style={{ marginBottom: "18px" }}>
                  Bạn có thể quay lại để xem thêm sân khác hoặc đặt sân ngay.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <Link to="/fields" className="btn-outline">
                    Quay lại danh sách sân
                  </Link>

                  <Link to={`/booking/${field.id}`} className="btn-primary">
                    Đặt sân ngay
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default FieldDetail;