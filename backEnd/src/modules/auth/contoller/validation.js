import Joi from "joi";
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const signUp = Joi.object({
username: Joi.string().alphanum().min(5).max(25).required(),
email: Joi.string().email().required(),
password: Joi.string().regex(passwordRegex).required().messages({
    'string.pattern.base': 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)',
  }),
  cPassword: Joi.string().valid(Joi.ref("password")).required().strict().messages({
    'any.only': 'Confirm password must match the password field',
  }),
  isOnline: Joi.boolean().default(false),
  isAdmin: Joi.string().valid(true,false).required(),
}).required();


export const login=Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().regex(passwordRegex).required().messages({
      'string.pattern.base': 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)',
    })
  })
  