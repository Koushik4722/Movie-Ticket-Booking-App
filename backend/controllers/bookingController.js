import Booking from '../models/Booking.js';
import Show from '../models/Show.js';

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
export const addBookingItems = async (req, res) => {
  try {
    const { movieId, theaterId, showId, seats, totalAmount } = req.body;

    if (seats && seats.length === 0) {
      res.status(400).json({ message: 'No seats selected' });
      return;
    }

    const booking = new Booking({
      userId: req.user._id,
      movieId,
      theaterId,
      showId,
      seats,
      totalAmount
    });

    const createdBooking = await booking.save();

    // Update show booked seats
    const show = await Show.findById(showId);
    if (show) {
      show.bookedSeats.push(...seats);
      show.availableSeats -= seats.length;
      await show.save();
    }

    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('movieId', 'title poster')
      .populate('theaterId', 'theaterName location')
      .populate('showId', 'showTime');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel a booking
// @route   DELETE /api/bookings/:id
// @access  Private
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Verify user owns the booking
    if (booking.userId.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(401).json({ message: 'Not authorized to cancel this booking' });
    }

    const show = await Show.findById(booking.showId);

    if (show) {
      // Remove seats from bookedSeats
      show.bookedSeats = show.bookedSeats.filter(seat => !booking.seats.includes(seat));
      show.availableSeats += booking.seats.length;
      await show.save();
    }

    // Calculate refund (e.g., 20% cancellation charge)
    const cancellationCharge = booking.totalAmount * 0.20;
    const refundAmount = booking.totalAmount - cancellationCharge;

    await booking.deleteOne();

    res.json({ 
      message: 'Booking cancelled successfully',
      cancellationCharge,
      refundAmount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
