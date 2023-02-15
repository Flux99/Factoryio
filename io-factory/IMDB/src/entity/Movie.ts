import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable,ManyToOne } from "typeorm"
import {Actor} from "./Actor";
import {Producer} from "./Producer";


@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id: number

    @Column("text")
    name: string
   
    @Column("text")
    plot: string

    @Column("text")
    poster: string

    @Column("text")
    year_of_release: number

    @ManyToMany(() => Actor,actor => actor.movies)
    @JoinTable()
    actors: Actor[]

    @ManyToOne(() => Producer)
    @JoinTable()
    producer: Producer
}