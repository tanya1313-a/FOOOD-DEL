
import  mongoose from "mongoose"


const paymentSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    amount:{
        type: Number,
    },
    order_id:{
        type: String,
    },
    razorpay_payment_id:{
        type: String,
        default:null,
    },
    razorpay_order_id:{
        type: String,
        default:null,
    },
    razorpay_signature:{
        type: String,
        default:null,
    }
    


},{
    timestamps:true
})

const paymentModel = mongoose.model('paymentModel', paymentSchema)

export default paymentModel