import mongoose from 'mongoose';

const showSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  theaterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theater',
    required: true
  },
  showTime: {
    type: Date,
    required: true
  },
  availableSeats: {
    type: Number,
    required: true
  },
  bookedSeats: [{
    type: String // e.g., "A1", "A2", "B5"
  }],
  price: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Show = mongoose.model('Show', showSchema);

export default Show;
