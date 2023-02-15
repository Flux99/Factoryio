import { Entity } from "typeorm"

export enum Gender {
    MALE = 'female',
    FEMALE = 'female',
  }
@Entity()
export class Producer {
    id:number
    name: string
    bio: string
    dob: string
    gender: Gender
}