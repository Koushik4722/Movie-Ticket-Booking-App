import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  runtime: {
    type: Number, // in minutes
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  genre: [{
    type: String
  }],
  language: [{
    type: String
  }],
  poster: {
    type: String,
    required: true
  },
  trailer: {
    type: String
  },
  totalShows: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
