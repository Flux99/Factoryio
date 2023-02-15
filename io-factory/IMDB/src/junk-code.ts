
// const movie = new Movie();
//     let actors: Actor[] =[];
//     if (result.actors) {

//         if (result.actors.length > 0) {
//             for(let i = 0; i < result.actors.length;i++) { 
//                 console.log("running for loop for actors",i );
//                 const actor = new Actor()
//                 actor.name=result.actors.name;
//                 actor.bio=result.actors.bio;
//                 actor.gender=result.actors.gender;
//                 actor.dob=result.actors.dob;
//                 // const user = await AppDataSource.getRepository(Actor).create(actor)
//                 const savedActor= await AppDataSource.getRepository(Actor).save(actor);
//                 actors.push(savedActor);
//             }
//             movie.actors=actors;
//         }

//     } else if (result.existing_actors) {
//         actors=[];
//         if (result.existing_actors.length > 0) {
//         for(let i = 0; i < result.existing_actors.length;i++) { 
//             const findActor = await AppDataSource.getRepository(Actor).findOneBy({
//                 id: result.existing_actors
//             });
//             if (findActor) {
//                 actors.push(findActor)
//             }
//         }
//         movie.actors=actors;
//         } else {
//             throw createHttpError.NotFound("Actor not Found");
//         }
//     }
//     if (result.producer) {
//         const producer = new Producer();
//         producer.name=result.producer.name;
//         producer.bio= result.producer.bio;
//         producer.dob= result.producer.dob;
//         producer.gender= result.producer.gender;
//         // const producerCreated = await AppDataSource.getRepository(Producer).create(producer)
//         const savedProducer= await AppDataSource.getRepository(Producer).save(producer);
//         movie.producer=savedProducer;

//     } else if (result.existing_producer) {
//         const findProducer = await AppDataSource.getRepository(Producer).findOneBy({
//             id: result.existing_producer
//         });
//         if (findProducer) {
//             movie.producer=findProducer;
//         } else {
//             throw createHttpError.NotFound("Producer not Found");
//         }
//     }
//     movie.name= result.movie.name
//     movie.plot= result.movie.plot
//     movie.poster= result.movie.poster
//     // const movieCreated = await AppDataSource.getRepository(Movie).create(movie)
//     const savedMovie= await AppDataSource.getRepository(Movie).save(movie);
// import "reflect-metadata"
// import {app} from "../index";
// const request = require("supertest") // .agent(app.listen())
// import { updateMovie, addMovie } from '../helper';
// import {AppDataSource} from "../database";
// import { Movie } from '../entity/Movie';
// import { Producer } from '../entity/Producer';
// import { Actor } from '../entity/Actor';
// import { Gender } from '../Schemas/Actor';

// jest.setTimeout(10000)
// describe("POST /add-movie", () => {
//     it("should add a new movie successfully", async () => {
//       // Mock data
//       const movieData= new Movie()
//       movieData.name= 'The New Movie';
//       movieData.plot= 'The New Movie';
//       movieData.poster ='https://new-movie-poster.jpg';
//       movieData.year_of_release= 2022;
  
//       const actorData:Actor[]=[]
//       const actor1 = new Actor();
//           actor1.name= 'Actor 1'
//           actor1.gender= Gender.MALE
//           actor1.dob= '2000-01-01'
//           actor1.bio= 'An actor'

//       const actor2 = new Actor();
//           actor2.name= 'Actor 2'
//           actor2.gender= Gender.FEMALE
//           actor2.dob= '2001-01-01'
//           actor2.bio= 'An actress'
        
//       actorData.push(actor1)
//       actorData.push(actor2)
  
//       const producerData = new Producer();
      
//         producerData.name= 'Producer';
//         producerData.gender=Gender.MALE;
//         producerData.dob= '1980-01';
//         producerData.bio= "bio";
      
    
//       // Sending the request to the server
//       const res = await request(app)
//         .post("/add-movie")
//         .send({ movie: movieData, actors: actorData, producer: producerData });
  
//       // Assertions
//       console.log("response add movie api", res.body,res.statusCode);
      
//       expect(res.statusCode).toEqual(200);
//       expect(res.body).toEqual({ isSaved: true });
    //   expect(console.log).toHaveBeenCalledWith("post api running...");
// });
  
// it("should return 422 error for invalid input", async () => {
//   // Send the request to the server with invalid input
//   const res = await request(app)
//     .post("/add-movie")
//     .send({ movie: {}, actors: [], producer: {} });

//   // Assertions
//   expect(res.statusCode).toEqual(422);
//   expect(res.body).toHaveProperty("message", expect.any(String));
//   expect(res.body).toHaveProperty("details", expect.any(Array));
// });

// it("should return error response for server error", async () => {
//   // Send the request to the server
//   const res = await request(app)
//     .post("/add-movie")
//     .send({ movie: {}, actors: [], producer: {} });

//   // Assertions
//   expect(res.statusCode).toEqual(500);
//   expect(res.body).toHaveProperty("message", "Internal server error");
//   expect(console.log).toHaveBeenCalledWith("post api running...");
// });
// });