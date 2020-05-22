import * as Yup from 'yup';
import { Request, Response as ExpressResponse, NextFunction } from 'express';

import { Response, HttpStatus } from '../libs';

const idValidator = Yup.object().shape({
  id: Yup.number().integer().required(),
});

const validateId = async (
  req: Request,
  res: ExpressResponse,
  next: NextFunction
) => {
  const isValidId = await idValidator.isValid(req.params);

  if (!isValidId) {
    return Response.send(
      res,
      Response.buildError(
        'Id parameter must be integer',
        HttpStatus.BAD_REQUEST
      )
    );
  }

  return next();
};

const validateBody = (validator: Yup.ObjectSchema) => async (
  req: Request,
  res: ExpressResponse,
  next: NextFunction
) => {
  try {
    await validator.validate(req.body);
    return next();
  } catch (error) {
    return Response.send(
      res,
      Response.buildError(error.errors.join(', '), HttpStatus.BAD_REQUEST)
    );
  }
};

export const Validations = { validateId, validateBody };
