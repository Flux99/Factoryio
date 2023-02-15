import "reflect-metadata"
import { updateMovie, addMovie } from '../helper';
import {AppDataSource} from "../database";
import { Movie } from '../entity/Movie';
import { Producer } from '../entity/Producer';
import { Actor } from '../entity/Actor';
import { Gender } from '../Schemas/Actor';



beforeAll(async () => {
    await AppDataSource.initialize()
    .then(() => {
        console.log("database running....");
    })
    .catch((error) => console.log(error))

    // movieRepository = AppDataSource.getRepository(Movie);
    // actorRepository = AppDataSource.getRepository(Actor);
    // producerRepository = AppDataSource.getRepository(Producer);
  });

//   afterAll(async () => {
//     await AppDataSource.close();
//   });


describe('addMovie function', () => {
    test('should add a new movie with the given data and return isSaved true', async () => {
      const movieData= new Movie()
      movieData.name= 'The New Movie';
      movieData.plot= 'The New Movie';
      movieData.poster ='https://new-movie-poster.jpg';
      movieData.year_of_release= 2022;
  
      const actorData:Actor[]=[]
      const actor1 = new Actor();
      actor1.id=1
          actor1.name= 'Actor 1'
          actor1.gender= Gender.MALE
          actor1.dob= '2000-01-01'
          actor1.bio= 'An actor'
      const actor2 = new Actor();
      actor1.id=1
          actor1.name= 'Actor 2'
          actor1.gender= Gender.FEMALE
          actor1.dob= '2001-01-01'
          actor1.bio= 'An actress'
        
      actorData.push(actor1)
      actorData.push(actor2)
  
      const producerData = new Producer();
      
        producerData.name= 'Producer';
        producerData.gender=Gender.MALE;
        producerData.dob= '1980-01';
        producerData.bio= "bio";
      
        
      const data = await addMovie(AppDataSource,movieData,actorData,producerData);
      console.log("data of addMovie", data);
      
      expect(data.isSaved).toBe(true);
  })
  })

 


describe('updateMovie function', () => {
  test('should not update the movie with the given ID and return isUpdated true', async () => {
    const movieId = 1;
    const updatedMovie = {
      name: 'The New Movie',
      plot: 'A new plot',
      poster: 'https://new-movie-poster.jpg',
      year_of_release: 2022,
    };

    const result = await updateMovie(movieId, AppDataSource, updatedMovie);

    expect(result.isUpdated).toBe(false);
  });

  test('should return an error if the movie with the given ID is not found', async () => {
    const movieId = 1;
    const updatedMovie = {
      name: 'The New Movie',
      plot: 'A new plot',
      poster: 'https://new-movie-poster.jpg',
      year_of_release: 2022,
    };
 
    const result = await updateMovie(movieId, AppDataSource, updatedMovie);
    // console.log("result of 2nd test", result);
    
    expect(result.code).toBe(500);
  });

  test('should return an error if there is an error while updating the movie', async () => {
    const movieId = 1;
    const updatedMovie = {
      name: 'The New Movie',
      plot: 'A new plot',
      poster: 'https://new-movie-poster.jpg',
      year_of_release: 2022,
    };

    const result = await updateMovie(movieId, AppDataSource, updatedMovie);

    expect(result.error).toBeInstanceOf(Error);
    expect(result.code).toBe(500);
  });
});

