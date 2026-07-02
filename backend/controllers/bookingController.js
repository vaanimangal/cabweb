const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  console.log("Booking API HIT");
  console.log(req.body);

  try {
    const {
       userId,
       tripType,
       pickup,
       destination,
       startDateTime,
       endDateTime,
       vehicle,
       fuel,
       language,
       special,
    } = req.body;

    const booking = await Booking.create({
      userId,
     tripType,
     pickup,
     destination,
     startDateTime,
     endDateTime,
     vehicle,
     fuel,
     language,
     special,
     });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createBooking,
};