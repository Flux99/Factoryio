import { Actor } from "./entity/Actor";
import { Movie } from "./entity/Movie";
import { Producer } from "./entity/Producer";


export async function updateMovie(movieId: number,connection:any,Updatedmovie:any){ // updatedActors?:Actor[],movieData?:Movie,producer?:Producer) {
    // Find the movie to update
    const result = {error: "", isUpdated: false,code:0}
    try {
        const movieRepository = connection.getRepository(Movie);
        const movie = await movieRepository.findOne({id:movieId});
      
        if (!movie) {
          console.log(`Movie with id ${movieId} not found.`);
          result.error= `Movie with id ${movieId} not found.`
          result.code=404;
          return result;
        }
      
        movie.name= Updatedmovie.name
        movie.plot = Updatedmovie.plot
        movie.poster= Updatedmovie.poster
        movie.year_of_release= Updatedmovie.year_of_release
    
        // Save the updated movie to the database
        await movieRepository.save(movie);
        result.isUpdated= true;
        result.code=200;
        return result;
    } catch (error:any) {
        result.error=error;
        result.code=500;
        return result;
    }
  
  }

export async function addMovie(connection:any,movieData:Movie, actorData:Actor[], producerData:Producer) {
  const result = { error:"", isSaved: false,code: 0}
  const producerRepository = await connection.getRepository(Producer);
  const movieRepository = await connection.getRepository(Movie);
  const actorRepository = await connection.getRepository(Actor);

      // check if the producer is already in the database
      console.log("producer data before", producerData);
    let producer = await producerRepository.findOneBy({ name: producerData.name });
    console.log("producer data after ",producer );

    if (!producer) {
      // if not, create a new producer
      producer = await producerRepository.create(producerData);
      await producerRepository.save(producer);
    }
    
        // check if each actor is already in the database
    const actors = [];
    for (const actor of actorData) {
      let existingActor = await actorRepository.findOneBy({  name: actor.name  });
      if (!existingActor) {
        // if not, create a new actor
        existingActor = await actorRepository.create(actor);
        await actorRepository.save(existingActor);
      }
      actors.push(existingActor);
    }
    const movie = await movieRepository.create({
        name: movieData.name,
        year_of_release: movieData.year_of_release,
        plot: movieData.plot,
        poster: movieData.poster,
        producer: producer,
        actors: actors,
      });
    
      // save the new movie to the database
      await movieRepository.save(movie);
      result.isSaved= true;
      result.code=200;
      return result;
  try {
    // create a new movie with the given data
    

  } catch (error:any) {
    console.log("error in addMovies", error);
    
    result.error= error
    result.code=500;
    return result;
  }
  

}


// example usage
// const movieData = {
//     name: 'The Matrix',
//     year: 1999,
//     plot: 'A computer programmer is recruited by a group of rebel computer hackers to fight against powerful computers who have created a virtual reality where anything is possible.',
//     poster: 'https://www.imdb.com/title/tt0133093/mediaviewer/rm1740630528/',
//   };
  
//   const actorData = [
//     {
//       name: 'Keanu Reeves',
//       gender: 'Male',
//       dob: new Date('1964-09-02'),
//       bio: 'Keanu Reeves is a Canadian actor, musician, producer, and director.',
//     },
//     {
//       name: 'Carrie-Anne Moss',
//       gender: 'Female',
//       dob: new Date('1967-08-21'),
//       bio: 'Carrie-Anne Moss is a Canadian actress.',
//     },
//   ];
  
//   const producerData = {
//     name: 'Joel Silver',
//     gender: 'Male',
//     dob: new Date('1952-07-14'),
//     bio: 'Joel Silver is an American film producer.',
//   };