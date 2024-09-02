import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';


let UserSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  createdDate:{type:Date,default:Date.now}
});

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, email: this.email, name: this.firstname +" "+ this.lastname  }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

export const Auth = mongoose.model('users', UserSchema);