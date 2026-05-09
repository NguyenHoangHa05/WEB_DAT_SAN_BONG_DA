import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getFields, getMatches } from "../services/api";
import { formatDateTimeVN } from "../utils/format";

function Home() {
  const [fields, setFields] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fieldData = await getFields();
        const matchData = await getMatches();
        setFields(fieldData.slice(0, 3));
        setMatches(matchData.slice(0, 3));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />

      <main className="page-section">
        <div className="container">
          <section className="hero hero-premium">
            <div className="hero-content">
              <span className="hero-badge">Nền tảng bóng đá cộng đồng</span>
              <h1>
                Đặt sân thông minh, tìm trận nhanh và kết nối đồng đội theo phong
                cách hiện đại
              </h1>
              <p>
                Một không gian dành cho người yêu bóng đá: dễ tìm sân, dễ tham gia
                trận đấu và dễ quản lý lịch hoạt động trong cùng một hệ thống trực quan.
              </p>

              <div className="hero-buttons">
                <Link to="/matches" className="btn-primary">
                  Tìm trận ngay
                </Link>

                <Link to="/fields" className="btn-outline">
                  Khám phá sân bóng
                </Link>
              </div>

              <div className="hero-mini-points">
                <span>⚡ Tìm trận nhanh</span>
                <span>🏟️ Đặt sân dễ</span>
                <span>🛡️ Có khu quản trị riêng</span>
              </div>
            </div>

            <div className="hero-card hero-card-premium">
              <div className="hero-card-top">
                <span className="hero-card-chip">Football Platform</span>
                <span className="hero-card-chip muted">Live Demo</span>
              </div>

              <h2>Điểm nổi bật của nền tảng</h2>
              <p className="hero-card-desc">
                Website tập trung vào hai trải nghiệm chính: người dùng tìm trận,
                tham gia chơi bóng; và quản trị viên theo dõi sân bóng, booking,
                người dùng và trận đấu trong cùng một hệ thống.
              </p>

              <div className="hero-stats">
                <div className="stat-box motion-delay-1">
                  <h3>{fields.length > 0 ? fields.length : "3+"}</h3>
                  <p>Sân đang hiển thị</p>
                </div>
                <div className="stat-box motion-delay-2">
                  <h3>{matches.length > 0 ? matches.length : "3+"}</h3>
                  <p>Trận đang mở</p>
                </div>
                <div className="stat-box motion-delay-3">
                  <h3>10k</h3>
                  <p>Phạt vắng mặt</p>
                </div>
                <div className="stat-box motion-delay-4">
                  <h3>24/7</h3>
                  <p>Sẵn sàng sử dụng</p>
                </div>
              </div>
            </div>
          </section>

          <div className="football-banner football-banner-premium motion-delay-2">
            <div className="football-banner-inner">
              <span className="badge-warning">
                Lưu ý: Người đăng ký nhưng không đến sẽ bị trừ 10.000 VNĐ.
              </span>
              <h2>Tập trung vào trải nghiệm tổ chức và tham gia trận đấu</h2>
              <p>
                Dự án không đi sâu vào diễn biến trong trận mà tập trung vào luồng
                thực tế hơn: tìm trận, tìm người chơi cùng, đặt sân, quản lý lịch và
                xử lý trạng thái tham gia trong một giao diện thống nhất.
              </p>
            </div>
          </div>

          <section className="home-block" style={{ paddingBottom: 0 }}>
            <div className="section-head">
              <div>
                <h2 className="section-title">Tính năng nổi bật</h2>
                <p className="section-subtitle">
                  Hướng đến một nền tảng bóng đá thực tế, trực quan và dễ sử dụng.
                </p>
              </div>
            </div>

            <div className="feature-grid home-feature-grid">
              <div className="feature-card motion-delay-1">
                <div className="feature-icon">⚽</div>
                <h3>Tìm trận phù hợp</h3>
                <p>
                  Xem các trận đang mở, địa điểm thi đấu và số lượng người còn thiếu
                  để tham gia nhanh hơn.
                </p>
              </div>

              <div className="feature-card motion-delay-2">
                <div className="feature-icon">🏟️</div>
                <h3>Đặt sân nhanh</h3>
                <p>
                  Chọn sân, chọn ngày và khung giờ phù hợp để hoàn tất booking một
                  cách rõ ràng và dễ thao tác.
                </p>
              </div>

              <div className="feature-card motion-delay-3">
                <div className="feature-icon">🛡️</div>
                <h3>Quản trị tập trung</h3>
                <p>
                  Theo dõi dữ liệu booking, người dùng, sân bóng và trận đấu với khu
                  quản trị tách riêng.
                </p>
              </div>
            </div>
          </section>

          <section className="home-block" style={{ paddingBottom: 0 }}>
            <div className="section-head">
              <div>
                <h2 className="section-title">Sân bóng nổi bật</h2>
                <p className="section-subtitle">Một số sân đang có trong hệ thống.</p>
              </div>

              <Link to="/fields" className="section-link">
                Xem tất cả
              </Link>
            </div>

            {fields.length === 0 ? (
              <div className="empty-box">Hiện chưa có sân nào để hiển thị.</div>
            ) : (
              <div className="fields-grid">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className={`field-card motion-delay-${(index % 5) + 1}`}
                  >
                    <div className="field-image">
                      <span>Sân bóng</span>
                    </div>

                    <div className="field-content">
                      <h3 className="field-title">{field.name}</h3>
                      <p className="field-info">
                        <strong>Giá:</strong>{" "}
                        {Number(field.price || 0).toLocaleString("vi-VN")} VNĐ / giờ
                      </p>
                      <p className="field-info">
                        <strong>Khu vực:</strong> {field.location || "Chưa cập nhật"}
                      </p>
                      <span className="field-status">
                        {field.status === "available" ? "Còn trống" : field.status}
                      </span>

                      <div className="field-actions">
                        <Link to={`/fields/${field.id}`}>
                          <button className="btn-detail">Xem chi tiết</button>
                        </Link>

                        <Link to={`/booking/${field.id}`}>
                          <button className="btn-book">Đặt sân</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="home-block">
            <div className="section-head">
              <div>
                <h2 className="section-title">Trận đang tuyển người</h2>
                <p className="section-subtitle">
                  Chọn trận phù hợp để tham gia cùng cộng đồng bóng đá.
                </p>
              </div>

              <Link to="/matches" className="section-link">
                Xem tất cả
              </Link>
            </div>

            {matches.length === 0 ? (
              <div className="empty-box">Hiện chưa có trận nào để hiển thị.</div>
            ) : (
              <div className="fields-grid">
                {matches.map((match, index) => (
                  <div
                    key={match.id}
                    className={`match-card motion-delay-${(index % 5) + 1}`}
                  >
                    <div className="match-top">
                      <span className="match-badge">Đang tuyển người</span>
                      <span className="match-capacity">
                        Tối đa {match.max_players} người
                      </span>
                    </div>

                    <h3 className="match-title">{match.title}</h3>

                    <p className="match-info">
                      <strong>Địa điểm:</strong> {match.location}
                    </p>
                    <p className="match-info">
                      <strong>Thời gian:</strong> {formatDateTimeVN(match.time) || match.time}
                    </p>

                    <Link to={`/matches/${match.id}`}>
                      <button className="btn-book" style={{ width: "100%" }}>
                        Xem chi tiết
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;