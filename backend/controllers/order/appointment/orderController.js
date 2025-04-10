const crypto = require('crypto');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');

// PhonePe configuration
const PHONEPE_CONFIG = {
  MERCHANT_ID: process.env.PHONEPE_MERCHANT_ID,
  SALT_KEY: process.env.PHONEPE_SALT_KEY,
  SALT_INDEX: process.env.PHONEPE_SALT_INDEX,
  BASE_URL: process.env.PHONEPE_BASE_URL
};

// Generate PhonePe payment request
exports.initiatePhonePePayment = async (req, res) => {
  try {
    const { userId, amount, orderId } = req.body;
    
    // Validate input
    if (!userId || !amount || !orderId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Verify order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Create payload for PhonePe
    const payload = {
      merchantId: PHONEPE_CONFIG.MERCHANT_ID,
      merchantTransactionId: order._id.toString(),
      merchantUserId: userId,
      amount: amount * 100, // PhonePe expects amount in paise
      redirectUrl: `${process.env.FRONTEND_URL}/payment-callback`,
      redirectMode: 'POST',
      callbackUrl: `${process.env.BACKEND_URL}/api/payment/webhook`,
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    };

    // Convert payload to base64
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');

    // Generate checksum
    const checksum = crypto
      .createHash('sha256')
      .update(base64Payload + '/pg/v1/pay' + PHONEPE_CONFIG.SALT_KEY)
      .digest('hex') + '###' + PHONEPE_CONFIG.SALT_INDEX;

    // Make request to PhonePe
    const response = await axios.post(
      `${PHONEPE_CONFIG.BASE_URL}/pg/v1/pay`,
      {
        request: base64Payload
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
          'accept': 'application/json'
        }
      }
    );

    // Return payment URL to frontend
    res.json({
      success: true,
      url: response.data.data.instrumentResponse.redirectInfo.url
    });

  } catch (error) {
    console.error('Payment initiation error:', error);
    res.status(500).json({ error: 'Payment initiation failed' });
  }
};

// PhonePe payment webhook
exports.paymentWebhook = async (req, res) => {
  try {
    const { response } = req.body;
    const decodedResponse = JSON.parse(Buffer.from(response, 'base64').toString('utf-8'));
    
    // Verify checksum
    const checksum = req.headers['x-verify'];
    const generatedChecksum = crypto
      .createHash('sha256')
      .update(response + '/pg/v1/status/' + decodedResponse.merchantId + '/' + decodedResponse.transactionId + PHONEPE_CONFIG.SALT_KEY)
      .digest('hex') + '###' + PHONEPE_CONFIG.SALT_INDEX;

    if (checksum !== generatedChecksum) {
      return res.status(400).json({ error: 'Checksum mismatch' });
    }

    // Update order status based on payment status
    const order = await Order.findById(decodedResponse.merchantTransactionId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (decodedResponse.code === 'PAYMENT_SUCCESS') {
      order.paymentStatus = 'completed';
      order.status = 'confirmed';
      await order.save();
      
      // Clear user's cart
      await Cart.findOneAndUpdate(
        { user: order.user },
        { $set: { items: [] } }
      );
    } else {
      order.paymentStatus = 'failed';
      await order.save();
    }

    res.status(200).json({ success: true });

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
};

// Check payment status
exports.checkPaymentStatus = async (req, res) => {
  try {
    const { merchantTransactionId } = req.params;
    
    const order = await Order.findById(merchantTransactionId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Generate checksum for status check
    const checksum = crypto
      .createHash('sha256')
      .update(`/pg/v1/status/${PHONEPE_CONFIG.MERCHANT_ID}/${merchantTransactionId}` + PHONEPE_CONFIG.SALT_KEY)
      .digest('hex') + '###' + PHONEPE_CONFIG.SALT_INDEX;

    // Make request to PhonePe
    const response = await axios.get(
      `${PHONEPE_CONFIG.BASE_URL}/pg/v1/status/${PHONEPE_CONFIG.MERCHANT_ID}/${merchantTransactionId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
          'X-MERCHANT-ID': PHONEPE_CONFIG.MERCHANT_ID,
          'accept': 'application/json'
        }
      }
    );

    res.json({
      success: true,
      status: response.data.code,
      orderStatus: order.status
    });

  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({ error: 'Status check failed' });
  }
};