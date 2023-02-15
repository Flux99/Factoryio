import { Entity } from "typeorm"
@Entity()
export class Movie {
    id:number
    name: string
    plot: string
    poster: string
    year_of_release: number
}