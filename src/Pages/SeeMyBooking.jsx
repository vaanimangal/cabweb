import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SeeMyBooking.css";

function SeeMyBooking() {
  const navigate = useNavigate();

  // Temporary data (later comes from MongoDB)
  const [bookings] = useState([
    {
      id: 1,
      vehicle: "Sedan",
      pickup: "Delhi Airport",
      destination: "Connaught Place",
      tripType: "One Way",
      date: "28 Jun 2026",
      time: "10:30 AM",
      fare: "₹540",
      status: "Driver Assigned",
      fuel: "Petrol",
      language: "English",
      special: "None"
    },
    {
      id: 2,
      vehicle: "SUV",
      pickup: "Noida",
      destination: "Gurugram",
      tripType: "Round Trip",
      date: "24 Jun 2026",
      time: "9:15 AM",
      fare: "₹860",
      status: "Completed",
      fuel: "Diesel",
      language: "Hindi",
      special: "Pet Friendly"
    }
  ]);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredBookings = bookings.filter((booking) => {

    const matchSearch =
      booking.pickup.toLowerCase().includes(search.toLowerCase()) ||
      booking.destination.toLowerCase().includes(search.toLowerCase()) ||
      booking.vehicle.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "All" || booking.status === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div className="booking-page">

      <div className="booking-header">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h2>My Bookings</h2>

      </div>

      <div className="booking-controls">

        <input
          type="text"
          placeholder="Search bookings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Driver Assigned</option>
          <option>Searching Driver</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>

      </div>

      {filteredBookings.length === 0 ? (

        <div className="empty-state">

          <h2>🚕</h2>

          <h3>No bookings found</h3>

          <p>Book your first ride with GEO RIDES.</p>

          <button onClick={() => navigate("/")}>
            Book Ride
          </button>

        </div>

      ) : (

        filteredBookings.map((booking) => (

          <div
            className="booking-card"
            key={booking.id}
          >

            <div className="booking-top">

              <div>

                <h3>{booking.vehicle}</h3>

                <p>
                  {booking.pickup}
                </p>

                <span>↓</span>

                <p>
                  {booking.destination}
                </p>

              </div>

              <span
                className={`status ${booking.status.replace(/\s/g, "")}`}
              >
                {booking.status}
              </span>

            </div>

            <div className="booking-bottom">

              <div>

                <p>{booking.tripType}</p>

                <p>{booking.date}</p>

                <p>{booking.time}</p>

              </div>

              <div>

                <h3>{booking.fare}</h3>

                <button
                  onClick={() =>
                    setSelectedBooking(booking)
                  }
                >
                  View Details
                </button>

              </div>

            </div>

          </div>

        ))

      )}

      {selectedBooking && (

        <div className="modal-overlay">

          <div className="details-modal">

            <h2>Ride Details</h2>

            <p><b>Vehicle:</b> {selectedBooking.vehicle}</p>

            <p><b>Pickup:</b> {selectedBooking.pickup}</p>

            <p><b>Destination:</b> {selectedBooking.destination}</p>

            <p><b>Fuel:</b> {selectedBooking.fuel}</p>

            <p><b>Language:</b> {selectedBooking.language}</p>

            <p><b>Special:</b> {selectedBooking.special}</p>

            <p><b>Status:</b> {selectedBooking.status}</p>

            <p><b>Fare:</b> {selectedBooking.fare}</p>

            <button
              onClick={() => setSelectedBooking(null)}
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default SeeMyBooking;