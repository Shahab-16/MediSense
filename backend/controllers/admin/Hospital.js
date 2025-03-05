const Hospital=require("../../models/Hospitals");



exports.addHospital=async(req,res)=>{
    try{
        const {name,address,phone,email,doctors,facilities}=req.body;

        if(!name||!address||!phone||!email||!doctors||!facilities){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }

        const existingHospital=await Hospital.findOne({email});

        if(existingHospital){
            return res.status(400).json({
                success:false,
                message:"Hospital already exists",
            })
        }

        const newHospital=new Hospital({
            name,
            address,
            phone,
            email,
            doctors,
            facilities,
        });

        await newHospital.save();

        return res.status(200).json({
            success:true,
            message:"Hospital added successfully",
        })

    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Error in adding hospital",
        })
    }
}


exports.listAllHospitals=async(req,res)=>{
    try{

        const hospitalsList=await Hospital.find({});
        if(!hospitalsList){
            return res.status(400).json({
                success:false,
                message:"No hospitals found",
            })
        }

        return res.status(200).json({
            success:true,
            message:"Hospitals list",
            hospitalsList,
        })
    }
    catch(err){
        return res.status({
            success:false,
            message:"Error in listing hospitals",
        })
    }
}


exports.removeHospital=async(req,res)=>{
    try{
        const {hospitalId}=req.body;

        const removedHospital=await Hospital.findByIdAndDelete(hospitalId);

        return res.status(200).json({
            success:true,
            message:"Hospital removed successfully",
            removedHospital,
        })
    }
    catch(err){
        return res.status({
            success:false,
            message:"Error in removing hospital",
        })
    }
}