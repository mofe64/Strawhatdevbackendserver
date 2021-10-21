import Subscriber from '../models/Subscriber.js';
import catchAsync from "../util/catchAsync.js";
import AppError from '../util/AppError.js';



export const subscribe = catchAsync(async (req, res, next) => {
    const { email, firstname } = req.body;
    const newSub = await Subscriber.create({
        email,
        firstname
    });
    res.status(201).json({
        newSub
    })
});

export const unsubscribe = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    await Subscriber.findByIdAndDelete(id);
    res.status(204).json({});ss
})