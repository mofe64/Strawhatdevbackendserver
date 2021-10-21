import express from 'express';
import { subscribe, unsubscribe} from '../controllers/SubscriptionController.js';

const subscriptionRouter = express();

subscriptionRouter
    .route('/sub')
    .post(subscribe)


subscriptionRouter
    .route('/unsub/:id')
    .get(unsubscribe)


export default subscriptionRouter;