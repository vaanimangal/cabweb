import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // 👈 Import Router utilities
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import BookingForm from "./Components/BookingForm";
import DestinationCards from "./Components/DestinationCards";
import DriverLoading from "./Components/DriverLoading"; // 👈 Import your new page component
import UserProfile from "./Pages/UserProfile";

function App() {
  // 1. Track if the user is authenticated (set to false by default)
  const [user, setUser] = useState(null);

useEffect(() => {
  const savedUser = localStorage.getItem("user");

  if (savedUser) {
    setUser(JSON.parse(savedUser));
  }
}, []);
  const [tripData, setTripData] = useState({
  tripType: "oneway",

  pickup: "",
  destination: "",

  startDateTime: "",
  endDateTime: "",

  vehicle: "",
  fuel: "",
  language: "",
  special: "",
});
  return (
    <Router>
      {/* 👈 Added login props to Navbar so it can update its login/logout buttons */}
      <Navbar user={user} setUser={setUser} />
      
      <Routes>
        {/* 1. Main Home Layout containing your entire booking flow */}
        <Route 
          path="/" 
          element={
            <>
              <Hero trip={tripData} setTrip={setTripData} />
              <BookingForm trip={tripData} setTrip={setTripData} />
              {/* 👈 Added login props here to link it with the compulsory check on button click */}
              <DestinationCards
                  trip={tripData}
                  setTrip={setTripData}
                  isLoggedIn={!!user}
                  user={user}
              />
            </>
          } 
        />

        {/* 2. Isolated Search/Driver view */}
        <Route path="/find-driver" element={<DriverLoading />} />
        <Route
  path="/profile"
  element={
    <UserProfile
      user={user}
      setUser={setUser}
    />
  }
/>
      </Routes>
    </Router>
  );
}

export default App;