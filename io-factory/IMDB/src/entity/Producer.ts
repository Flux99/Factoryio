import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Gender} from "../Schemas/Actor";
import { Movie } from "./Movie";


@Entity()
export class Producer {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar")
    name: string

    @Column("varchar")
    bio: string

    @Column({
        type: 'enum',
        enum: Gender,
      })
    gender: Gender

    @Column("varchar")
    dob: string

    @OneToMany(() => Movie, (movie:Movie) => movie.producer)
    movies: Movie[]
    
}