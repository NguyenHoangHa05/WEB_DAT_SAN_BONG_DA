import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getBookings, getMatches, getMatchPlayers } from "../services/api";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: "",
    name: "",
    role: "",
    joinedMatches: 0,
    bookings: 0,
    noShowCount: 1,
    penaltyTotal: 10000,
    status: "Hoạt động",
    player_id: null,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token || !savedUser) {
      navigate("/login");
      return;
    }

    let parsedUser = null;

    try {
      parsedUser = JSON.parse(savedUser);
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
      return;
    }

    const fetchProfileData = async () => {
      try {
        const bookingData = await getBookings();
        const myBookings = bookingData.filter(
          (booking) => Number(booking.user_id) === Number(parsedUser.id)
        );

        const matchData = await getMatches();
        let joinedCount = 0;

        for (const match of matchData) {
          try {
            const players = await getMatchPlayers(match.id);
            const joined = players.some(
              (player) => Number(player.id) === Number(parsedUser.player_id)
            );

            if (joined) {
              joinedCount += 1;
            }
          } catch (error) {
            console.error("Lỗi lấy danh sách người chơi:", error);
          }
        }

        setUser({
          id: parsedUser.id,
          name: parsedUser.username,
          role: parsedUser.role === "admin" ? "Quản trị viên" : "Người dùng",
          joinedMatches: joinedCount,
          bookings: myBookings.length,
          noShowCount: 1,
          penaltyTotal: 10000,
          status: "Hoạt động",
          player_id: parsedUser.player_id,
        });
      } catch (error) {
        console.error("Lỗi tải dữ liệu hồ sơ:", error);
      }
    };

    fetchProfileData();
  }, [navigate]);

  return (
    <div>
      <Navbar />

      <div className="container page-section">
        <div className="match-page-head">
          <div>
            <span className="hero-badge">Thông tin cá nhân</span>
            <h1 className="section-title">Hồ sơ của tôi</h1>
            <p className="section-subtitle">
              Theo dõi hồ sơ người dùng, lịch sử tham gia và trạng thái hoạt động.
            </p>
          </div>
        </div>

        <div className="profile-layout">
          <div className="profile-card-main">
            <div className="profile-header">
              <div className="profile-avatar">⚽</div>
              <div>
                <h2>{user.name}</h2>
                <p>ID người dùng: {user.id}</p>
                <span className="profile-role">{user.role}</span>
              </div>
            </div>

            <div className="profile-info-grid">
              <div className="profile-info-item">
                <span>Trạng thái</span>
                <strong>{user.status}</strong>
              </div>
              <div className="profile-info-item">
                <span>Số trận đã tham gia</span>
                <strong>{user.joinedMatches}</strong>
              </div>
              <div className="profile-info-item">
                <span>Số booking</span>
                <strong>{user.bookings}</strong>
              </div>
              <div className="profile-info-item">
                <span>Số lần vắng mặt</span>
                <strong>{user.noShowCount}</strong>
              </div>
            </div>
          </div>

          <div className="profile-side-card">
            <h3>Uy tín tham gia</h3>
            <p>
              Người dùng cần tham gia đúng lịch đã đăng ký để tránh bị giảm uy tín
              và bị trừ phí vi phạm.
            </p>

            <div className="profile-penalty-box">
              <span>Tổng tiền bị phạt</span>
              <strong>{user.penaltyTotal.toLocaleString("vi-VN")} VNĐ</strong>
            </div>

            <div className="notice-box" style={{ marginTop: "18px" }}>
              Nếu đã đăng ký nhưng không đến, bạn sẽ bị trừ 10.000 VNĐ.
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;