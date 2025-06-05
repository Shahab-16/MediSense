const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const frontend_url = process.env.FRONTEND_URL;
const Appointment = require("../../models/Appointment");
const Doctor = require("../../models/Doctors");
const User = require("../../models/User");


exports.bookAppointment = async (req, res) => {
  try {
    const { 
      doctorId,
      docName,
      specialization,
      fees,
      profileImage,
      dateTime,
      time
    } = req.body.doctor;
    
    const userId = req.body.userId;
    
    // Validate input
    if (!doctorId || !docName || !dateTime || !time || !fees || !profileImage || !specialization) {
      return res.status(400).json({
        success: false,
        message: "All required fields are missing"
      });
    }
    
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found"
      });
    }

    const date = new Date(dateTime);
    const dayKey = date.toISOString().split("T")[0];

    // Check if slot is already booked
    if (doctor.slot_booked?.[dayKey]?.includes(time)) {
      return res.status(400).json({
        success: false,
        message: "Time slot already booked"
      });
    }

    // Create line item for Stripe
    const line_items = [{
      price_data: {
        currency: "inr",
        product_data: {
          name: `Appointment with Dr. ${docName}`,
          description: `${specialization} - ${dayKey} at ${time}`,
          images: [profileImage],
          metadata: {
            doctorId: doctorId,
            appointmentDate: dayKey,
            appointmentTime: time
          }
        },
        unit_amount: Math.round(fees * 100),
      },
      quantity: 1
    }];

    // Create appointment record
    const appointmentData = {
      userId,
      doctorId,
      date: dayKey,
      time,
      doctorName: docName,
      specialization,
      fees,
      profileImage,
      paymentStatus: "pending",
      status: "pending"
    };

    const appointment = new Appointment(appointmentData);
    await appointment.save();


    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/dashboard/doctors/verify-appointment?success=true&appointmentId=${appointment._id}`,
      cancel_url: `${frontend_url}/dashboard/doctors/verify-appointment?success=false&appointmentId=${appointment._id}`,
      metadata: {
        appointmentId: appointment._id.toString(),
        doctorId: doctorId,
        userId: userId,
      },
      customer_email: req.user?.email,
    });

    return res.status(200).json({
      success: true,
      message: "Proceed to payment",
      paymentUrl: session.url,
      appointmentId: appointment._id
    });

  } catch (error) {
    console.error("Error in appointment controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while booking appointment",
      error: error.message
    });
  }
};

exports.verifyAppointment = async (req, res) => {
  try {
    const { success, appointmentId } = req.query;
    console.log("Inside verifyAppointment with success:", success, "appointmentId:", appointmentId);

    const appointment = await Appointment.findById(appointmentId);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found"
      });
    }

    if (success === "true" || success === true) {
      // Update doctor's booked slots
      const doctor = await Doctor.findById(appointment.doctorId);

      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: "Doctor not found"
        });
      }

      // Initialize if not exists
      if (!doctor.slot_booked) doctor.slot_booked = {};
      if (!doctor.slot_booked[appointment.date]) {
        doctor.slot_booked[appointment.date] = [];
      }

      // Add time slot if not already booked
      if (!doctor.slot_booked[appointment.date].includes(appointment.time)) {
        doctor.slot_booked[appointment.date].push(appointment.time);
        await doctor.save();
      }

      // Update appointment status
      appointment.paymentStatus = "completed";
      appointment.status = "confirmed";
      await appointment.save();

      return res.json({
        success: true,
        message: "Appointment payment successful"
      });

    } else {
      const deleteResult = await Appointment.findByIdAndDelete(appointmentId);
      console.log("Appointment deleted due to failed payment:", deleteResult);

      return res.json({
        success: false,
        message: "Appointment payment failed and appointment deleted"
      });
    }
  } catch (error) {
    console.error("Error in verifyAppointment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during appointment verification",
      error: error.message
    });
  }
};



exports.getAppointments=async(req,res)=>{
  try{
    const {userId}=req.query;
    console.log("Inside getAppointments in hospitalController and the userId is ",userId);
    const appointments=await Appointment.find({userId});
    console.log("Printing the appointments",appointments);
    if(appointments.length===0){
      return res.status(404).json({
        success:false,
        message:"No appointments found"
      })
    }
    return res.status(200).json({
      success:true,
      data:appointments
    })
  }
  catch(err){
    return res.status(500).json({
      success:false,
      message:"Internal server error while fetching appointments"
    })
  }
}