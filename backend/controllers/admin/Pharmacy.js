const Pharmacy = require("../../models/MedicalStore");



exports.addMedicineStore=async(req,res)=>{
    try{
        const {name,address,phone,email,medicines,deliveryAvailable}=req.body;

        if(!name||!address||!phone||!email||!medicines||!deliveryAvailable){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }

        const existingPharmacy=await Pharmacy.findOne({email});

        if(existingPharmacy){
            return res.status(400).json({
                success:false,
                message:"Pharmacy already exists",
            })
        }

        const newPharmacy=new Pharmacy({
            name,
            address,
            phone,
            email,
            medicines,
            deliveryAvailable,
        });

        await newPharmacy.save();
        res.status(200).json({
            success:true,
            message:"Pharmacy added successfully",
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Error in adding pharmacy",
        })
    }
}



exports.removeMedicineStore=async(req,res)=>{
    try{
        const existMedicineStore=await Pharmacy.findOne({email});

        if(!existMedicineStore){
            return res.status(400).json({
                success:false,
                message:"No MedicineStores was found in the list"
            })
        }

        await existMedicineStore.remove();

        return res.status(200).json({
            success:true,
            message:"Pharmacy removed successfully"
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Error in removing pharmacy"
        })
    }
}




exports.listAllPharmacies=async(req,res)=>{
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