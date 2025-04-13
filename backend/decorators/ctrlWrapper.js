const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        error.status = 400;
        error.message = error.errors.map((err) => err.message).join(", ");
      }
      if (error.name === "SequelizeUniqueConstraintError") {
        error.status = 409;
        error.message = error.errors.map((err) => err.message).join(", ");
      }
      next(error);
    }
  };

  return func;
};

export default ctrlWrapper;
