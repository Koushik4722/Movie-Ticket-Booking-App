import bcrypt from 'bcryptjs';

const password = bcrypt.hashSync('123456', 10);

export const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: password,
    isAdmin: true
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: password,
    isAdmin: false
  }
];

export const movies = [
  {
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    runtime: 148,
    releaseDate: new Date('2010-07-16'),
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    language: ['English', 'Hindi'],
    poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    trailer: 'https://www.youtube.com/watch?v=YoHD9XEInc0'
  },
  {
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    runtime: 169,
    releaseDate: new Date('2014-11-07'),
    genre: ['Adventure', 'Drama', 'Sci-Fi'],
    language: ['English'],
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QlsUUHXjNpeVD0V0b0sT3gB.jpg',
    trailer: 'https://www.youtube.com/watch?v=zSWdZVtXT7E'
  },
  {
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    runtime: 152,
    releaseDate: new Date('2008-07-18'),
    genre: ['Action', 'Crime', 'Drama'],
    language: ['English', 'Hindi'],
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    trailer: 'https://www.youtube.com/watch?v=EXeTwQWrcwY'
  }
];

export const theaters = [
  {
    theaterName: 'PVR Cinemas',
    city: 'Mumbai',
    location: 'Andheri West',
    screens: 3
  },
  {
    theaterName: 'INOX',
    city: 'Mumbai',
    location: 'Nariman Point',
    screens: 2
  },
  {
    theaterName: 'Cinepolis',
    city: 'Delhi',
    location: 'Connaught Place',
    screens: 4
  }
];
