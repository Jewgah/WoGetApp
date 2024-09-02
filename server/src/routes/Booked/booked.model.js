import mongoose from 'mongoose';

let bookedSchema = new mongoose.Schema({
    n_host: { type: Number, required: true },
    post_id: { type: String, required: true },
    customer_id: { type: String, required: true },
    createdDate:{type:Date,default:Date.now},
    from:{type:Date, required: true},
    to: { type: Date, required: true },
    rate:{type:Object,required:false},
  
  });
  
  export const Booked = mongoose.model('booked', bookedSchema);