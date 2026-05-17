import mongoose from 'mongoose';

const theaterSchema = new mongoose.Schema({
  theaterName: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  screens: {
    type: Number,
    required: true,
    default: 1
  },
  moviesRunning: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  }]
}, {
  timestamps: true
});

const Theater = mongoose.model('Theater', theaterSchema);

export default Theater;
