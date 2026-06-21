import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // 👈 Import Router utilities
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import BookingForm from "./Components/BookingForm";
import DestinationCards from "./Components/DestinationCards";
import DriverLoading from "./Components/DriverLoading"; // 👈 Import your new page component

function App() {
  const [tripData, setTripData] = useState({
    pickup: "",
    destination: "",
    startDateTime: "",
    endDateTime: "",
  });

  return (
    <Router>
      <Navbar />
      
      <Routes>
        {/* 1. Main Home Layout containing your entire booking flow */}
        <Route 
          path="/" 
          element={
            <>
              <Hero />
              <BookingForm trip={tripData} setTrip={setTripData} />
              <DestinationCards />
            </>
          } 
        />

        {/* 2. Isolated Search/Driver view */}
        <Route path="/find-driver" element={<DriverLoading />} />
      </Routes>
    </Router>
  );
}

export default App;