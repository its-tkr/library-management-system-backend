const joi = require('@hapi/joi');

module.exports = {
    validateRegisterUser: (user) => {

        const schema = joi.object({

            userName: joi.string().min(4).required(),
            userPassword: joi.string().min(8).required(),
            userEmail: joi.string().email().required(),
            isAdmin: joi.boolean().required(),

        });

        return schema.validate(user);
    },
    validateLoginUser: (user) => {

        const schema = joi.object({

            userPassword: joi.string().min(8).required(),
            userEmail: joi.string().email().required(),

        });

        return schema.validate(user);
    }
}