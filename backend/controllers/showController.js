import Show from '../models/Show.js';

// @desc    Get shows by movie and city (simplified)
// @route   GET /api/shows
// @access  Public
export const getShows = async (req, res) => {
  try {
    const { movieId } = req.query;
    let query = {};
    if (movieId) {
      query.movieId = movieId;
    }
    const shows = await Show.find(query).populate('theaterId', 'theaterName location city').populate('movieId', 'title');
    res.json(shows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get show by ID
// @route   GET /api/shows/:id
// @access  Public
export const getShowById = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id).populate('theaterId').populate('movieId');
    if (show) {
      res.json(show);
    } else {
      res.status(404).json({ message: 'Show not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a show
// @route   POST /api/shows
// @access  Private/Admin
export const createShow = async (req, res) => {
  try {
    const show = new Show(req.body);
    const createdShow = await show.save();
    res.status(201).json(createdShow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
