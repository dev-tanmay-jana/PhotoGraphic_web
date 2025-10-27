const { ZodError } = require('zod');

const validate = (schema) => async (req, res, next) => {
  try {
    const parsedBody = await schema.parseAsync(req.body);
    req.body = parsedBody;
    next();
  } catch (err) {
    const status = 422;
      const message = err.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));

      const error = {
        status,
        message
      }

      console.error('Validation failed:', error);
    //   return res.status(400).json({ errors: message });
    
    next(error);
  }
};



module.exports = validate;