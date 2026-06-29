
import "../styles/Hero.css";

function Hero({ trip, setTrip }) {

  return (
    <section className="hero">

      <div className="hero-content">

        <div className="hero-text">
          <h1>Book Reliable Cabs for Every Journey</h1>

          <p>
            Safe, comfortable and affordable rides with verified drivers.
            Travel across cities with ease and confidence.
          </p>

          <div className="trip-type">
            <button
              className={
                trip.tripType === "oneway"
                  ? "trip-btn active"
                  : "trip-btn"
              }
              onClick={() =>
  setTrip({
    ...trip,
    tripType: "oneway",
  })
}
            >
              One Way
            </button>

            <button
              className={
                trip.tripType === "roundtrip"
                  ? "trip-btn active"
                  : "trip-btn"
              }
              onClick={() =>
  setTrip({
    ...trip,
    tripType: "roundtrip",
  })
}
            >
              Round Trip
            </button>
          </div>

          <div className="hero-stats">
            <div>
              <h3>50K+</h3>
              <span>Rides</span>
            </div>

            <div>
              <h3>4.8★</h3>
              <span>Rating</span>
            </div>

            <div>
              <h3>100+</h3>
              <span>Cities</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://img.magnific.com/premium-psd/isolated-realistic-shiny-metalic-red-luxury-city-taxi-cab-car-from-right-front-angle-view_16145-9755.jpg"
            alt="Cab"
          />
        </div>

      </div>

    </section>
  );
}

export default Hero;