import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, } from "typeorm"
import { Gender} from "../Schemas/Actor";
import { Movie } from "./Movie";

@Entity()
export class Actor {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        length: 100,
        unique: true 
    })
    name: string

    @Column("text")
    bio: string

    @Column({
        type: 'enum',
        enum: Gender,
      })
    gender: Gender

    @Column("text")
    dob: string


    @ManyToMany(() => Movie,movie => movie.actors)
    @JoinTable()
    movies: Movie[]
}