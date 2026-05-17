import Theater from '../models/Theater.js';

// @desc    Get all theaters
// @route   GET /api/theaters
// @access  Public
export const getTheaters = async (req, res) => {
  try {
    const theaters = await Theater.find({});
    res.json(theaters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a theater
// @route   POST /api/theaters
// @access  Private/Admin
export const createTheater = async (req, res) => {
  try {
    const theater = new Theater(req.body);
    const createdTheater = await theater.save();
    res.status(201).json(createdTheater);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
