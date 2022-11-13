import Joi from "@hapi/joi";

export const mailCreateValidation = (data: object) => {
  const validator = Joi.object({
    subject: Joi.string().required().max(255),
    recieverEmail: Joi.string().required().email(),
    body: Joi.string().required(),
  });

  return validator.validate(data);
};
