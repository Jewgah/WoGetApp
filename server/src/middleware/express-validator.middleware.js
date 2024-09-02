import { validationResult } from "express-validator";


export const checkExpressValidor = (req, res, next)  => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = {
        status: 400,
        message: `We need to specified all attributes`,
        type: 'error',
        all: errors.array()
      }
     
      return res.status(error.status).send(error);
    }
    next();
  }