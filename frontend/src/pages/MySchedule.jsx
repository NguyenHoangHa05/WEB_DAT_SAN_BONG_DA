import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getBookings, getMatches, getMatchPlayers } from "../services/api";
import { formatDateVN, formatTimeVN, formatDateTimeVN } from "../utils/format";

function MySchedule() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [myMatches, setMyMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

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
      setCurrentUser(parsedUser);
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const bookingData = await getBookings();
        const matchData = await getMatches();

        setBookings(bookingData);

        const joinedMatches = [];
        for (const match of matchData) {
          try {
            const players = await getMatchPlayers(match.id);
            const joined = players.some(
              (player) => Number(player.id) === Number(parsedUser.player_id)
            );

            if (joined) {
              joinedMatches.push({
                ...match,
                playersCount: players.length,
              });
            }
          } catch (error) {
            console.error("Lỗi lấy danh sách người chơi:", error);
          }
        }

        setMyMatches(joinedMatches);
      } catch (error) {
        console.error("Lỗi tải dữ liệu lịch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const myBookings = useMemo(() => {
    if (!currentUser) return [];

    return bookings.filter(
      (booking) => Number(booking.user_id) === Number(currentUser.id)
    );
  }, [bookings, currentUser]);

  return (
    <div>
      <Navbar />

      <div className="container page-section">
        <div className="match-page-head">
          <div>
            <span className="hero-badge">Lịch cá nhân</span>
            <h1 className="section-title">Lịch của tôi</h1>
            <p className="section-subtitle">
              Theo dõi các sân đã đặt và các trận bóng bạn đã đăng ký tham gia.
            </p>
          </div>
        </div>

        {loading && <p>Đang tải dữ liệu lịch...</p>}

        {!loading && (
          <>
            <section className="page-section" style={{ paddingTop: 0, paddingBottom: 24 }}>
              <div className="section-head">
                <div>
                  <h2 className="section-title">Sân đã đặt</h2>
                  <p className="section-subtitle">
                    Danh sách các lịch đặt sân gắn với tài khoản của bạn.
                  </p>
                </div>
              </div>

              {myBookings.length === 0 ? (
                <div className="empty-box">Bạn chưa có booking nào.</div>
              ) : (
                <div className="schedule-grid">
                  {myBookings.map((booking, index) => (
                    <div
                      key={booking.id}
                      className={`schedule-card motion-delay-${(index % 5) + 1}`}
                    >
                      <div className="schedule-card-top">
                        <span className="schedule-badge">Đặt sân</span>
                        <span className="schedule-status">
                          {booking.status || "pending"}
                        </span>
                      </div>

                      <h3>{booking.field_name || `Sân #${booking.field_id}`}</h3>

                      <p>
                        <strong>Ngày:</strong>{" "}
                        {formatDateVN(booking.booking_date) || "-"}
                      </p>

                      <p>
                        <strong>Khung giờ:</strong>{" "}
                        {formatTimeVN(booking.start_time)} - {formatTimeVN(booking.end_time)}
                      </p>

                      <p>
                        <strong>Mã booking:</strong> {booking.id}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="page-section" style={{ paddingTop: 0 }}>
              <div className="section-head">
                <div>
                  <h2 className="section-title">Trận đã tham gia</h2>
                  <p className="section-subtitle">
                    Những trận đấu mà bạn đã đăng ký tham gia.
                  </p>
                </div>
              </div>

              {myMatches.length === 0 ? (
                <div className="empty-box">Bạn chưa tham gia trận nào.</div>
              ) : (
                <div className="schedule-grid">
                  {myMatches.map((match, index) => (
                    <div
                      key={match.id}
                      className={`schedule-card schedule-card-dark motion-delay-${(index % 5) + 1}`}
                    >
                      <div className="schedule-card-top">
                        <span className="schedule-badge schedule-badge-green">
                          Trận bóng
                        </span>
                        <span className="schedule-status schedule-status-light">
                          Đã đăng ký
                        </span>
                      </div>

                      <h3>{match.title}</h3>

                      <p>
                        <strong>Địa điểm:</strong> {match.location}
                      </p>

                      <p>
                        <strong>Thời gian:</strong> {formatDateTimeVN(match.time) || match.time}
                      </p>

                      <p>
                        <strong>Số người hiện có:</strong> {match.playersCount}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default MySchedule;