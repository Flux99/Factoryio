import * as Joi from "@hapi/joi";

const emailSignup = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  repeat_password: Joi.ref("password"),
  birth_year: Joi.number()
    .integer()
    .min(1900)
    .max(2013),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] }
  })
});

// let Joi = require('joi')
// let service = Joi.object().keys({
//   serviceName: Joi.string().required(),
// })

// let services = Joi.array().items(service)

// let test = Joi.validate(
//   [{ serviceName: 'service1' }, { serviceName: 'service2' }],
//   services,
// )
const actor= Joi.object().keys({
    name: Joi.string(),
    bio: Joi.string(),
    dob: Joi.string(),
    gender: Joi.string().valid("male","female")
})

export const addmovie = Joi.object({
    movie: Joi.object({
        name: Joi.string(),
        plot: Joi.string(),
        poster: Joi.string(),
        year_of_release: Joi.number().integer().min(1800).max(2023)
    }).required(),
    actors: Joi.array().items(actor),
    producer: Joi.object({
        name: Joi.string(),
        bio: Joi.string(),
        dob: Joi.string(),
        gender: Joi.string().valid("male","female")
    }),
    // existing_actors: Joi.array().items(Joi.number().integer().min(1)),
    // existing_producer: Joi.number().integer().min(1),
})
export const updatemovie = Joi.object({
    movie: Joi.object({
        name: Joi.string(),
        plot: Joi.string(),
        poster: Joi.string(),
        year_of_release: Joi.number().integer().min(1800).max(2023)
    }),
    movie_id: Joi.number().integer().min(1).required(),
    actors: Joi.array().items(actor),
    producer: Joi.object({
        name: Joi.string(),
        bio: Joi.string(),
        dob: Joi.string(),
        gender: Joi.string().valid("male","female")
    }),
    existing_actors: Joi.array().items(Joi.number().integer().min(1)),
    existing_producer: Joi.number().integer().min(1),
})