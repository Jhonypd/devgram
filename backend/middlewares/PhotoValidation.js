const { body } = require("express-validator");

const photoInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O título é obigatório.")
      .isString()
      .withMessage("O título é obigatório.")
      .isLength({ min: 3 })
      .withMessage("O título precisa ter no mínimo 3 caracteres."),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("A imagem é obrigatória.");
      }
      return true;
    }),
  ];
};

const photoUpadateValidation = () => {
  return [
    body("title")
      .optional()
      .isString()
      .withMessage("O título é obigatório.")
      .isLength({ min: 3 })
      .withMessage("O título precisa ter no mínimo 3 caracteres."),
  ];
};

const commentValidation = () => {
  return [body("comment").isString().withMessage("O comentário é obigatório.")];
};

module.exports = {
  photoInsertValidation,
  photoUpadateValidation,
  commentValidation,
};
