import Joi from "@hapi/joi";

export const mailCreateValidation = (data: object) => {
  const validator = Joi.object({
    recieverEmail: Joi.string().required().email(),
    subject: Joi.string().required().max(255),
    body: Joi.string().required(),
  });

  return validator.validate(data);
};
