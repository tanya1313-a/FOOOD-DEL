import paymentModel from '../models/paymentModel.js';

import Razorpay from 'razorpay';
import crypto from 'crypto'


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const checkout = async (req, res) => {
    const { name, amount } = req.body

    const order = await razorpay.orders.create(
        {
            amount: Number(amount * 100),
            currency: "INR"
        }
    )

    await paymentModel.create({
        order_id: order.id,
        name: name,
        amount: amount,
    })


    console.log({ order })
    res.json({ order })

}


const verifyPayment = async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const body_data = razorpay_order_id + ' ' + razorpay_payment_id;

    const expect = crypto.createHmac('sha256', 'l946KF9kpEW2deQS0q625rIP').update(body_data).digest('hex');

    const isValid = expect === razorpay_signature;

    try {
        const updatedDocument = await paymentModel.findOneAndUpdate(
            { order_id: razorpay_order_id },
            {
                razorpay_payment_id: razorpay_payment_id,
                razorpay_order_id: razorpay_order_id,
                razorpay_signature: razorpay_signature,
            },
            { new: true }
        );

        console.log('Updated Document:', updatedDocument);
        res.redirect('http://localhost:5173/success?razorpay_payment_id=' + razorpay_payment_id);
    } catch (error) {
        console.error('Error updating document:', error);
        res.redirect('http://localhost:5173/failed');
    }
}

export { checkout, verifyPayment };