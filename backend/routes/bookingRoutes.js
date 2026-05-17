import express from 'express';
import { addBookingItems, getMyBookings, cancelBooking } from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(protect, addBookingItems);

router.route('/mybookings')
  .get(protect, getMyBookings);

router.route('/:id')
  .delete(protect, cancelBooking);

export default router;
