const Doctor = require('../models/Doctors');
const Hospital = require('../models/Hospitals');

// Add a new doctor to a hospital
exports.addDoctor = async (req, res) => {
    try {
        const { name, specialization, hospitalId } = req.body;
        const doctor = new Doctor({ name, specialization, hospital: hospitalId });
        await doctor.save();

        // Add the doctor to the hospital's doctors list
        await Hospital.findByIdAndUpdate(hospitalId, { $push: { doctors: doctor._id } });

        res.status(201).json(doctor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// List all doctors in a hospital
exports.listDoctors = async (req, res) => {
    try {
        const { hospitalId } = req.params;
        const doctors = await Doctor.find({ hospital: hospitalId }).populate('hospital');
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a doctor from a hospital
exports.deleteDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const doctor = await Doctor.findByIdAndDelete(doctorId);

        // Remove the doctor from the hospital's doctors list
        await Hospital.findByIdAndUpdate(doctor.hospital, { $pull: { doctors: doctorId } });

        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};