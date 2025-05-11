const user=require("../../models/User");    
const medicine=require("../../models/Medicines");


exports.addToCart = async (req, res) => {
    try {
      const { medicineId,userId } = req.body;
  
      const userData = await user.findById(userId);
      if (!userData) {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }
  
      const medicineData = await medicine.findById(medicineId);

      if (!medicineData || medicineData.stock<1) {
        return res.status(400).json({
          success: false,
          message: "Medicine not found or quantity not in stock",
        });
      }
  
      // Ensure medicineCart is an object
      let medicineCart = userData.medicineCart || {};
  
      // Add or update the medicine quantity
      if (!medicineCart[medicineId]) {
        medicineCart[medicineId] = 1;
      } else {
        medicineCart[medicineId] += 1;
      }
  
      // Assign back and mark as modified
      userData.medicineCart = medicineCart;
      userData.markModified("medicineCart");
      await userData.save();
  
      return res.status(200).json({
        success: true,
        message: "Medicine added to cart",
      });
    } catch (err) {
      console.error(err);
      return res.status(400).json({
        success: false,
        message: "Error in adding to cart",
      });
    }
  };
  

exports.removeFromCart=async(req,res)=>{
    try{
        const {medicineId,userId}=req.body;
        let userData=await user.findById(userId);
        let medicineCart=userData.medicineCart; 
  
        if(!medicineCart[medicineId]){
            return res.status(400).json({
                success:false,
                message:"Medicine not found in cart",
            })
        }
        medicineCart[medicineId]-=1;

        if(medicineCart[medicineId]==0){
            delete medicineCart[medicineId];
        }

        userData.medicineCart=medicineCart;
        userData.markModified("medicineCart");
        await userData.save();

        return res.status(200).json({
            success:true,
            message:"Medicine removed from cart",
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Error in removing from cart",
        })
    }
}


exports.getAllMedicinesInCart = async (req, res) => {
  try {
    const { userId } = req.query.id; 
    
    const userData = await user.findById(userId);
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const medicineCart = userData.medicineCart || {};
    const medicineIds = Object.keys(medicineCart);

    // Get all medicine details at once
    const medicines = await medicine.find({
      _id: { $in: medicineIds }
    });

    // Combine cart quantities with medicine details
    const cartItems = medicines.map(med => ({
      ...med.toObject(), // Convert mongoose document to plain object
      quantity: medicineCart[med._id.toString()] || 0
    }));

    return res.status(200).json({
      success: true,
      data: cartItems,
    });
  } catch (err) {
    console.error("Error in getAllMedicinesInCart:", err);
    return res.status(400).json({
      success: false,
      message: "Error in getting all medicines in cart",
    });
  }
};