import mongoose from 'mongoose';
import validator from 'validator';

const subscriberSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Please enter your email'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'please provide a valid email'],
        },
        firstname: {
            type: String,
            required: [true, 'Please enter your firstname']
        },
        dateSubscribed: {
            type: Date,
            default: Date.now(),
        }
    }
);

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

export default Subscriber;