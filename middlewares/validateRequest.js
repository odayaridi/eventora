const { validationResult } = require("express-validator");
const HttpError = require("../utils/HttpError");

const validateRequest = (req,res,next)=> {
       const errors = validationResult(req);
       if(!errors.isEmpty()) {
         throw new HttpError(errors.array()[0].msg,400)
       }
       next();
}

module.exports = validateRequest;