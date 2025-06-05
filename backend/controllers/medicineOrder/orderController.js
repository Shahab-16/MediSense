require('dotenv').config();
const Order = require("../../models/MedicineOrder");
const Medicine = require("../../models/Medicines");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const frontend_url = process.env.FRONTEND_URL;

exports.placeMedicineOrder = async (req, res) => {
  try {
    const { patientId, items, deliveryAddress } = req.body;
    // Validate input
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one medicine item is required",
      });
    }

    if (!patientId || !deliveryAddress) {
      return res.status(400).json({
        success: false,
        message: "Patient ID and delivery address are required",
      });
    }

    const orderItems = [];
    let totalAmount = 0;
    const line_items = [];

    for (const item of items) {
      if (!item.medicineId || !item.quantity) {
        return res.status(400).json({
          success: false,
          message: "Each item must contain medicineId and quantity",
        });
      }

      const medicine = await Medicine.findById(item.medicineId);
      
      if (!medicine) {
        return res.status(404).json({
          success: false,
          message: `Medicine not found with ID: ${item.medicineId}`,
        });
      }
      
      console.log("In line number 47 and the medicine is",medicine);

      if (medicine.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${medicine.name}. Available: ${medicine.stock}`
        });
      }


      // Include medicalStoreId from the medicine document
      orderItems.push({
        medicine: item.medicineId,
        quantity: item.quantity,
        priceAtOrder: medicine.price,
        medicalStoreId: medicine.medicalStoreId.toString()  // Added this line
      });

      line_items.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: medicine.name,
            metadata: {
              medicineId: medicine._id.toString(),
            },
          },
          unit_amount: Math.round(medicine.price * 100),
        },
        quantity: item.quantity,
      });

      totalAmount += medicine.price * item.quantity;
    }

    const deliveryCharge = 20;
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });
    totalAmount += deliveryCharge;

    const order = new Order({
      patientId,
      items: orderItems,
      deliveryAddress,
      totalAmount,
      paymentStatus: "pending",
      deliveryStatus: "pending",
    });

    await order.save();


    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/dashboard/medicines/verify-order?success=true&orderId=${order._id}`,
      cancel_url: `${frontend_url}/dashboard/medicines/verify-order?success=false&orderId=${order._id}`,
      metadata: {
        orderId: order._id.toString(),
      },
      customer_email: req.user?.email,
    });

    return res.status(200).json({
      success: true,
      message: "Order created successfully",
      orderId: order._id,
      paymentUrl: session.url,
    });

  } catch (err) {
    console.error("Error placing order:", err);
    
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: err.message,
      });
    }
    
    return res.status(500).json({
      success: false,
      message: "Internal server error while placing order",
      error: err.message,
    });
  }
};

exports.verifyMedicineOrder = async(req,res)=>{
  const {success,orderId} = req.body;
  console.log("Inside verifyMedicineOrder in orderController");
  try{
    if (success === "true" || success === true) {
            const updateResult = await Order.findByIdAndUpdate(orderId, { paymentStatus: "paid" }, { new: true });
            console.log("Update result:", updateResult);
            if (!updateResult) {
                throw new Error("Order not found or update failed");
            }
            return res.json({
                success: true,
                message: "Payment successful"
            });
        } else {
            const deleteResult = await Order.findByIdAndDelete(orderId);
            console.log("Delete result:", deleteResult);
            if (!deleteResult) {
                throw new Error("Order not found or delete failed");
            }
            return res.json({ success: false, message: "Payment failed" });
        }
  }
  catch(err){
    return res.status(500).json({
      success: false,
      message: "Internal server error while verifying order",
      error: err.message,
    })
  }
}

exports.getOrderedMedicinesOfUsers=async(req,res)=>{
  try{
    const patientId=req.body.patientId;
    console.log("Inside getOrderedMedicinesOfUsers in orderController");
    const orders=await Order.find({patientId:patientId});
    console.log("Printing the order medicines",orders);
    console.log("Printing the patientId",patientId);
    if(!orders || orders.length===0){
      return res.status(404).json({
        success:false,
        message:"No orders found"
      })
    }
    return res.status(200).json({
      success:true,
      data:orders
    })
  }
  catch(err){
    return res.status(500).json({
      success: false,
      message: "Internal server error while getting orders",
      error: err.message,
    })
  }
}