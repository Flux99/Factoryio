import "reflect-metadata"
import express from "express";
import {AppDataSource} from "./database";
import { Actor } from "./entity/Actor";
import { Movie } from "./entity/Movie";
import { addmovie, updatemovie } from "./Middleware/validation";
import { Gender } from './Schemas/Actor';
import { Producer } from "./entity/Producer";
import createHttpError from "http-errors";
import { addMovie, updateMovie } from "./helper";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from './entity/User';
const JWT_SECRET="PRIVATE_KEY";
const app = express();

app.use(express.json())
AppDataSource.initialize()
    .then(() => {
        console.log("database running....");
    })
    .catch((error) => console.log(error))

app.post("/get-token", async (req, res, next)=>{
    const userRepository = AppDataSource.getRepository(User);

    try {
        const { email, password } = req.body;
    
        // Check if user already exists
        let user = await userRepository.findOne({ where: { email } });
    
        // If user doesn't exist, create a new user
        if (!user) {
          // Hash password
          const hashedPassword = await bcrypt.hash(password, 10);
    
          // Create new user
          user = userRepository.create({
            email,
            password: hashedPassword,
          });
    
          // Save new user to the database
          await userRepository.save(user);
        }
    
        // Create JWT token with expiry date of 1 day
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
          expiresIn: '1d',
        });
    
        res.locals.userId = user.id;
        res.locals.token = token;
        next();
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
})

app.get("/get-all-movies", async (req, res)=>{
    try {
        const movies = await AppDataSource.getRepository(Movie).find()
        if (movies.length > 0){
            return res.status(404).send({message: "Movies not found"});
        } else{
            return res.status(200).send({message: "Movies Found", data: movies});
        }
    } catch (error) {
        return res.status(500).send({message: "Internal Server Error"})
    }
    
});
app.post("/add-movie", async (req,res,next)=>{
    console.log("post api running...");
   
   
    try {
        const result:any = await addmovie.validateAsync(req.body);
        const movieAdded = await addMovie(AppDataSource,result.movie,result.actors,result.producer);
        console.log("movieAdded", movieAdded);
        
       if (movieAdded.isSaved) {
        return res.send({"isSaved": true});
       } else {
        return res.status(movieAdded.code).send(movieAdded.error);
       }
    } catch (error:any) {
        console.log("error in add api", error);
        if (error.isJoi) {
            error.status = 422;
          }
          next(error);

    }
});

app.post("/update-movie", async (req,res,next)=>{
    try {
        const result:any = await updatemovie.validateAsync(req.body);
        const movieUpdated = await updateMovie(result.movie_id,AppDataSource,result.movie);
        if (movieUpdated.isUpdated) {
            return res.send({"isUpdated": true});
           } else {
            return res.status(movieUpdated.code).send(movieUpdated.error);
           }
    } catch (error:any) {
        console.log("error in add api", error);
        if (error.isJoi) {
            error.status = 422;
          }
          next(error);
    }
})


app.use((err:any, req:any, res:any, _next:any) => {
    res.status(err.status || 500);
    res.send({
      error: {
        status: err.status || 500,
        message: err.message || "Internal Server Error",
      },
    });
  });

const port = 3000;

 app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

export {app}