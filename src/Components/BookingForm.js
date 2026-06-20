import "../styles/BookingForm.css";

const getLocalDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

function BookingForm({ trip, setTrip }) {
  const currentLocalDateTime = getLocalDateTime();

  const handleStartDateTimeChange = (newStart) => {
    if (newStart < currentLocalDateTime) {
      setTrip({ ...trip, startDateTime: currentLocalDateTime });
      return;
    }
    let updatedTrip = { ...trip, startDateTime: newStart };
    if (trip?.endDateTime && newStart >= trip.endDateTime) {
      updatedTrip.endDateTime = ""; 
    }
    setTrip(updatedTrip);
  };

  const handleEndDateTimeChange = (newEnd) => {
    const minAllowedEnd = trip?.startDateTime ? trip.startDateTime : currentLocalDateTime;
    if (newEnd < minAllowedEnd) {
      setTrip({ ...trip, endDateTime: minAllowedEnd });
      return;
    }
    setTrip({ ...trip, endDateTime: newEnd });
  };

  return (
    <div className="booking-form-container">
      <div className="booking-form-row">
        
        {/* Pickup Location */}
        <div className="input-group">
          <label>Pickup Location</label>
          <div className="input-with-icon">
            <span className="inline-icon pickup-dot"></span>
            <input
              type="text"
              placeholder="Enter pickup location"
              value={trip.pickup || ""}
              onChange={(e) => setTrip({ ...trip, pickup: e.target.value })}
            />
          </div>
        </div>

        {/* Destination Location */}
        <div className="input-group">
          <label>Destination Location</label>
          <div className="input-with-icon">
            <span className="inline-icon drop-pin"></span>
            <input
              type="text"
              placeholder="Enter destination location"
              value={trip.destination || ""}
              onChange={(e) => setTrip({ ...trip, destination: e.target.value })}
            />
          </div>
        </div>
        
        
        {/* Trip Start */}
        <div className="input-group">
          <label>Trip Start</label>
          <input
            type="datetime-local"
            value={trip.startDateTime || ""}
            min={currentLocalDateTime} 
            onChange={(e) => handleStartDateTimeChange(e.target.value)}
          />
        </div>

        {/* Trip End */}
        <div className="input-group">
          <label>Trip End</label>
          <input
            type="datetime-local"
            value={trip.endDateTime || ""}
            min={trip.startDateTime ? trip.startDateTime : currentLocalDateTime}
            onChange={(e) => handleEndDateTimeChange(e.target.value)}
          />
        </div>

      </div>
    </div>
  );
}

export default BookingForm;