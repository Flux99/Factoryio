import "reflect-metadata"
import { DataSource } from "typeorm"
import { Actor } from "./entity/Actor"
import { Movie } from "./entity/Movie"
import { Producer } from "./entity/Producer"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "test03",
    entities: [Actor,Movie,Producer,User], // ["src/entity/*.ts"],//
    logging: false,
    synchronize: true,
})

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
// AppDataSource.initialize()
//     .then(() => {
//         // here you can start to work with your database
//         console.log("database running....");
        

//     })
//     .catch((error) => console.log(error))
