const Pharmacy = require("../../models/MedicalStore");

exports.addMedicineStore = async (req, res) => {
  try {
    const {
      name,
      ownerName,
      LicenseNumber,
      address,
      contact,
      email,
      medicines,
      deliveryAvailable,
      establishedYear,
      status,
      aboutPharmacy,
      acheivements,
      openHour
    } = req.body;

   
    if (!name || !ownerName || !LicenseNumber || !address || !contact || !email) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    
    const existingPharmacy = await Pharmacy.findOne({ email });

    if (existingPharmacy) {
      return res.status(400).json({
        success: false,
        message: "Pharmacy already exists",
      });
    }


    const newPharmacy = new Pharmacy({
      name,
      ownerName,
      LicenseNumber,
      address,
      contact,
      email,
      medicines: medicines || [],
      deliveryAvailable: deliveryAvailable || false, 
      establishedYear: establishedYear || null, 
      status: status || "open", 
      aboutPharmacy: aboutPharmacy || "", 
      acheivements: acheivements || [], 
      openHour: openHour || "9:00 AM - 10:00 PM", 
    });

    await newPharmacy.save();

    return res.status(200).json({
      success: true,
      message: "Pharmacy added successfully",
      data: newPharmacy,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in adding pharmacy",
      error: err.message,
    });
  }
};



exports.removeMedicineStore = async (req, res) => {
    try {
        const {id} = req.body;
        const existMedicineStore = await Pharmacy.findById(id);

        if (!existMedicineStore) {
            return res.status(404).json({
                success: false,
                message: "No Medical Store found with this ID"
            });
        }
        await Pharmacy.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Pharmacy removed successfully"
        });

    } catch (err) {
        console.error("Error in removing pharmacy:", err);
        return res.status(500).json({
            success: false,
            message: "Error in removing pharmacy"
        });
    }
};




exports.listAllMedicineStores=async(req,res)=>{
    try{

        const pharmaciesList=await Pharmacy.find({});
        if(!pharmaciesList){
            return res.status(400).json({
                success:false,
                message:"No pharmacies found",
            })
        }

        return res.status(200).json({
            success:true,
            message:"Pharmacies list",
            pharmaciesList,
        })
    }
    catch(err){
        return res.status({
            success:false,
            message:"Error in listing pharmacies",
        })
    }
}