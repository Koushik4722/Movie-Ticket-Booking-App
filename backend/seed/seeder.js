import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { users, theaters } from '../data/mockData.js';
import User from '../models/User.js';
import Movie from '../models/Movie.js';
import Theater from '../models/Theater.js';
import Show from '../models/Show.js';
import Booking from '../models/Booking.js';
import connectDB from '../config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Booking.deleteMany();
    await Show.deleteMany();
    await Movie.deleteMany();
    await Theater.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    
    const realMovies = [
      { title: 'Inception', genre: ['Sci-Fi','Thriller'], language: ['English'], runtime: 148, releaseDate: new Date('2010-07-16'), description: 'A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea.', poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg' },
      { title: 'The Dark Knight', genre: ['Action','Drama'], language: ['English'], runtime: 152, releaseDate: new Date('2008-07-18'), description: 'Batman raises the stakes in his war on crime as the Joker wreaks havoc on Gotham City.', poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },
      { title: 'Interstellar', genre: ['Sci-Fi','Drama'], language: ['English'], runtime: 169, releaseDate: new Date('2014-11-07'), description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg' },
      { title: 'Avengers: Endgame', genre: ['Action','Sci-Fi'], language: ['English'], runtime: 181, releaseDate: new Date('2019-04-26'), description: 'The Avengers assemble once more to reverse Thanos\'s actions and restore balance to the universe.', poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg' },
      { title: 'The Matrix', genre: ['Action','Sci-Fi'], language: ['English'], runtime: 136, releaseDate: new Date('1999-03-31'), description: 'A computer hacker discovers the true nature of reality and joins a rebellion against its machine controllers.', poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg' },
      { title: 'Pulp Fiction', genre: ['Crime','Drama'], language: ['English'], runtime: 154, releaseDate: new Date('1994-10-14'), description: 'The lives of two mob hitmen, a boxer, and a pair of bandits intertwine in four tales of violence and redemption.', poster: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg' },
      { title: 'The Shawshank Redemption', genre: ['Drama'], language: ['English'], runtime: 142, releaseDate: new Date('1994-09-23'), description: 'Two imprisoned men bond over years, finding solace and eventual redemption through acts of common decency.', poster: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg' },
      { title: 'Parasite', genre: ['Thriller','Drama'], language: ['Korean'], runtime: 132, releaseDate: new Date('2019-05-30'), description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Parks and the Kims.', poster: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg' },
      { title: 'Spider-Man: No Way Home', genre: ['Action','Sci-Fi'], language: ['English'], runtime: 148, releaseDate: new Date('2021-12-17'), description: 'Spider-Man seeks help from Doctor Strange when his secret identity is revealed, unleashing multiverse chaos.', poster: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg' },
      { title: 'Joker', genre: ['Drama','Thriller'], language: ['English'], runtime: 122, releaseDate: new Date('2019-10-04'), description: 'A failed comedian descends into madness and becomes the iconic villain the Joker in 1980s Gotham City.', poster: 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg' },
      { title: 'Dangal', genre: ['Drama','Sports'], language: ['Hindi'], runtime: 161, releaseDate: new Date('2016-12-23'), description: 'A former wrestler trains his daughters to become world-class wrestlers to fulfill his dreams.', poster: 'https://image.tmdb.org/t/p/w500/jkGS1J3MkSBMUCK2LE0g42jnFRm.jpg' },
      { title: 'RRR', genre: ['Action','Drama'], language: ['Hindi','Telugu'], runtime: 182, releaseDate: new Date('2022-03-25'), description: 'A fictitious story about two legendary revolutionaries and their journey away from home before they began fighting for their country.', poster: 'https://image.tmdb.org/t/p/w500/nEufeZlyAOLqO2brrs0yeF1lgXO.jpg' },
      { title: '3 Idiots', genre: ['Comedy','Drama'], language: ['Hindi'], runtime: 170, releaseDate: new Date('2009-12-25'), description: 'Two friends search for their long-lost companion while recounting the tales of their fun-filled college days.', poster: 'https://image.tmdb.org/t/p/w500/66A9MqXZyHKnIT26QvQh3q1f9JH.jpg' },
      { title: 'Bahubali: The Beginning', genre: ['Action','Drama'], language: ['Hindi','Telugu'], runtime: 159, releaseDate: new Date('2015-07-10'), description: 'In ancient India, an adventurous and daring man sets out to discover his true identity.', poster: 'https://image.tmdb.org/t/p/w500/vufeFn1bCxKG5RMxMbKEFdnY8Y4.jpg' },
      { title: 'KGF Chapter 2', genre: ['Action','Thriller'], language: ['Hindi','Kannada'], runtime: 168, releaseDate: new Date('2022-04-14'), description: 'Rocky consolidates power in the Kolar Gold Fields while threats emerge from the government and a new enemy.', poster: 'https://image.tmdb.org/t/p/w500/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg' },
      { title: 'Dilwale Dulhania Le Jayenge', genre: ['Romance','Drama'], language: ['Hindi'], runtime: 189, releaseDate: new Date('1995-10-20'), description: 'A young man follows his love interest to her homeland and tries to win her father\'s approval.', poster: 'https://image.tmdb.org/t/p/w500/lfRkUr7DYdHldAqi3PwdQGBRBPM.jpg' },
      { title: 'PK', genre: ['Comedy','Drama'], language: ['Hindi'], runtime: 153, releaseDate: new Date('2014-12-19'), description: 'An alien on Earth loses his way home and learns about human religion, faith and spirituality.', poster: 'https://image.tmdb.org/t/p/w500/dy5ulDjW6GBwqKFXtpJnKB75B1h.jpg' },
      { title: 'Oppenheimer', genre: ['Drama','History'], language: ['English'], runtime: 180, releaseDate: new Date('2023-07-21'), description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.', poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg' },
      { title: 'Barbie', genre: ['Comedy','Fantasy'], language: ['English'], runtime: 114, releaseDate: new Date('2023-07-21'), description: 'Barbie suffers a crisis of existentialism and sets off on a journey of self-discovery in the real world.', poster: 'https://image.tmdb.org/t/p/w500/iuFNMS8vlbpn0DLQK1fJWWZfDaS.jpg' },
      { title: 'Top Gun: Maverick', genre: ['Action','Drama'], language: ['English'], runtime: 131, releaseDate: new Date('2022-05-27'), description: 'After 30 years, Maverick is still pushing the limits as a top naval aviator while training a new generation.', poster: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg' },
      { title: 'Avatar: The Way of Water', genre: ['Sci-Fi','Action'], language: ['English'], runtime: 192, releaseDate: new Date('2022-12-16'), description: 'Jake Sully and Neytiri form a family and face new threats from the humans returning to Pandora.', poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSligBeGDH2.jpg' },
      { title: 'The Lion King', genre: ['Animation','Drama'], language: ['English'], runtime: 118, releaseDate: new Date('2019-07-19'), description: 'A young lion prince must confront his destiny and take back the Pride Lands from his treacherous uncle.', poster: 'https://image.tmdb.org/t/p/w500/2bXbqYdUdNVa8VIWXVfclP2ICtT.jpg' },
      { title: 'Frozen II', genre: ['Animation','Fantasy'], language: ['English'], runtime: 103, releaseDate: new Date('2019-11-22'), description: 'Anna and Elsa venture into the unknown to discover the origin of Elsa\'s magical powers.', poster: 'https://image.tmdb.org/t/p/w500/qdfARIwgbEfLELDXj6aCEqvUxin.jpg' },
      { title: 'Black Panther', genre: ['Action','Sci-Fi'], language: ['English'], runtime: 134, releaseDate: new Date('2018-02-16'), description: 'T\'Challa returns home to Wakanda and finds his kingship challenged by a revolutionary.', poster: 'https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg' },
      { title: 'Doctor Strange', genre: ['Action','Fantasy'], language: ['English'], runtime: 115, releaseDate: new Date('2016-11-04'), description: 'A former neurosurgeon embarks on a journey of healing only to be drawn into the world of the mystic arts.', poster: 'https://image.tmdb.org/t/p/w500/4PiiNGXj1KENTmCBHeN6Mskj2Fq.jpg' },
      { title: 'Fight Club', genre: ['Drama','Thriller'], language: ['English'], runtime: 139, releaseDate: new Date('1999-10-15'), description: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club.', poster: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg' },
      { title: 'Forrest Gump', genre: ['Drama','Romance'], language: ['English'], runtime: 142, releaseDate: new Date('1994-07-06'), description: 'The history of the USA from the 1950s to 1994 unfolds through the perspective of an Alabama man with a low IQ.', poster: 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg' },
      { title: 'The Godfather', genre: ['Crime','Drama'], language: ['English'], runtime: 175, releaseDate: new Date('1972-03-24'), description: 'The aging patriarch of an organized crime dynasty transfers control to his reluctant youngest son.', poster: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsLeleqKo2t6i.jpg' },
      { title: 'Schindler\'s List', genre: ['Drama','History'], language: ['English'], runtime: 195, releaseDate: new Date('1993-12-15'), description: 'In German-occupied Poland, industrialist Oskar Schindler saves the lives of more than 1,000 Jewish refugees.', poster: 'https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg' },
      { title: 'Gladiator', genre: ['Action','Drama'], language: ['English'], runtime: 155, releaseDate: new Date('2000-05-05'), description: 'A former Roman general sets out to exact vengeance against the corrupt emperor who murdered his family.', poster: 'https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg' },
      { title: 'Titanic', genre: ['Romance','Drama'], language: ['English'], runtime: 194, releaseDate: new Date('1997-12-19'), description: 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious Titanic.', poster: 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg' },
      { title: 'The Silence of the Lambs', genre: ['Thriller','Horror'], language: ['English'], runtime: 118, releaseDate: new Date('1991-02-14'), description: 'A young FBI cadet seeks the help of an imprisoned cannibal killer to catch another serial murderer.', poster: 'https://image.tmdb.org/t/p/w500/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg' },
      { title: 'Goodfellas', genre: ['Crime','Drama'], language: ['English'], runtime: 146, releaseDate: new Date('1990-09-19'), description: 'The story of Henry Hill and his life in the mob, covering his rise and fall in the criminal underworld.', poster: 'https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg' },
      { title: 'Coco', genre: ['Animation','Fantasy'], language: ['English'], runtime: 105, releaseDate: new Date('2017-11-22'), description: 'A young boy who dreams of becoming a musician travels to the Land of the Dead to discover his family history.', poster: 'https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg' },
      { title: 'Whiplash', genre: ['Drama','Music'], language: ['English'], runtime: 107, releaseDate: new Date('2014-10-10'), description: 'A promising young drummer enrolls at a cut-throat music conservatory where his teacher pushes him to extremes.', poster: 'https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg' },
      { title: 'La La Land', genre: ['Romance','Musical'], language: ['English'], runtime: 128, releaseDate: new Date('2016-12-09'), description: 'A jazz musician and an aspiring actress fall in love while pursuing their dreams in Los Angeles.', poster: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg' },
      { title: 'Get Out', genre: ['Horror','Thriller'], language: ['English'], runtime: 104, releaseDate: new Date('2017-02-24'), description: 'A young African American man visits his white girlfriend\'s family estate where he uncovers a disturbing secret.', poster: 'https://image.tmdb.org/t/p/w500/tFXcEccSQMVl9dsvXCEZNH9BSPL.jpg' },
      { title: 'Mad Max: Fury Road', genre: ['Action','Sci-Fi'], language: ['English'], runtime: 120, releaseDate: new Date('2015-05-15'), description: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler with the aid of a haunted mechanic.', poster: 'https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg' },
      { title: 'John Wick', genre: ['Action','Thriller'], language: ['English'], runtime: 101, releaseDate: new Date('2014-10-24'), description: 'An ex-hitman comes out of retirement to track down the gangsters that killed his dog and stole his car.', poster: 'https://image.tmdb.org/t/p/w500/fZPSd91qGZ1biXIGbjvNjDse0n1.jpg' },
      { title: 'Dune', genre: ['Sci-Fi','Adventure'], language: ['English'], runtime: 155, releaseDate: new Date('2021-10-22'), description: 'A gifted young man must travel to the most dangerous planet in the universe to ensure the future of his family.', poster: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV48Ze6qgKpK.jpg' },
      { title: 'No Time to Die', genre: ['Action','Thriller'], language: ['English'], runtime: 163, releaseDate: new Date('2021-09-30'), description: 'James Bond has left active service and is enjoying a tranquil life in Jamaica until a familiar face appears.', poster: 'https://image.tmdb.org/t/p/w500/iUgygt3fscRoKWCV1d0C7FuYnkb.jpg' },
      { title: 'Shang-Chi', genre: ['Action','Fantasy'], language: ['English'], runtime: 132, releaseDate: new Date('2021-09-03'), description: 'Shang-Chi must confront the past he thought he left behind when he is drawn into the Ten Rings organization.', poster: 'https://image.tmdb.org/t/p/w500/1BIoJGKbXjdFDAqUEiA2VHqkJVh.jpg' },
      { title: 'Pathaan', genre: ['Action','Thriller'], language: ['Hindi'], runtime: 146, releaseDate: new Date('2023-01-25'), description: 'An exiled spy teams up with an intelligence officer to prevent a massive attack on India.', poster: 'https://image.tmdb.org/t/p/w500/9RmHQJOYKCdxCOLnBCaA3JjXAiQ.jpg' },
      { title: 'Jawan', genre: ['Action','Drama'], language: ['Hindi'], runtime: 169, releaseDate: new Date('2023-09-07'), description: 'A man is driven by a personal vendetta to rectify the wrongs in society while on the run from a determined cop.', poster: 'https://image.tmdb.org/t/p/w500/cDY6dPLbGCqhE9tCkxL4zSJP14V.jpg' },
      { title: 'Animal', genre: ['Action','Drama'], language: ['Hindi'], runtime: 201, releaseDate: new Date('2023-12-01'), description: 'The story of a man who will go to any lengths to win his father\'s love and approval.', poster: 'https://image.tmdb.org/t/p/w500/qTvBEIrWpSjFi4c6OBLqpKhqKpE.jpg' },
      { title: 'Kalki 2898 AD', genre: ['Sci-Fi','Action'], language: ['Hindi','Telugu'], runtime: 181, releaseDate: new Date('2024-06-27'), description: 'Set in a futuristic city, the birth of Kalki — the tenth and final avatar of Vishnu — is foretold.', poster: 'https://picsum.photos/seed/kalki/500/750' },
      { title: 'Uri: The Surgical Strike', genre: ['Action','Drama'], language: ['Hindi'], runtime: 138, releaseDate: new Date('2019-01-11'), description: 'The Indian Army plans a covert operation to avenge the killing of its soldiers by Pakistani militants.', poster: 'https://image.tmdb.org/t/p/w500/7p5VTnHaGTX5WwvnBXp4kBfVxL4.jpg' },
      { title: 'War', genre: ['Action','Thriller'], language: ['Hindi'], runtime: 154, releaseDate: new Date('2019-10-02'), description: 'An Indian soldier is assigned to eliminate his former mentor who has turned against the country.', poster: 'https://image.tmdb.org/t/p/w500/skQfFKgH1TEegDQh0bRXOlJfHi1.jpg' },
      { title: 'Pushpa: The Rise', genre: ['Action','Drama'], language: ['Hindi','Telugu'], runtime: 179, releaseDate: new Date('2021-12-17'), description: 'A laborer rises through the ranks of a red sandalwood smuggling syndicate while being pursued by a ruthless cop.', poster: 'https://image.tmdb.org/t/p/w500/0BtBaH9LkiTHLIKRHfvxFrLjY9T.jpg' },
      { title: 'Tanhaji', genre: ['Action','History'], language: ['Hindi'], runtime: 135, releaseDate: new Date('2020-01-10'), description: 'The story of Tanhaji Malusare, the military leader who led the capture of the fort of Kondhana.', poster: 'https://picsum.photos/seed/tanhaji/500/750' },
    ];

    const createdMovies = await Movie.insertMany(realMovies);
    const createdTheaters = await Theater.insertMany(theaters);

    // Create some shows
    const shows = [];
    const today = new Date();
    
    // Add shows for each movie in each theater
    createdMovies.forEach((movie) => {
      createdTheaters.forEach((theater) => {
        // Morning show
        shows.push({
          movieId: movie._id,
          theaterId: theater._id,
          showTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 10, 0, 0),
          availableSeats: 100,
          bookedSeats: [],
          price: 150
        });
        // Evening show
        shows.push({
          movieId: movie._id,
          theaterId: theater._id,
          showTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 19, 0, 0),
          availableSeats: 100,
          bookedSeats: [],
          price: 200
        });
        // Add movie to theater's moviesRunning
        theater.moviesRunning.push(movie._id);
      });
    });

    await Show.insertMany(shows);
    
    // Save updated theaters
    for (const theater of createdTheaters) {
        await theater.save();
    }

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Booking.deleteMany();
    await Show.deleteMany();
    await Movie.deleteMany();
    await Theater.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error with data destruction: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
