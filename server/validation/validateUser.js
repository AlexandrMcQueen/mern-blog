import {body} from 'express-validator';

export const validateUser = [
    body('username',"Введіть будь ласка імя").isLength({min:3}).isString(),
    body('password',"Введіть будь ласка пароль").isLength({min:7})
]