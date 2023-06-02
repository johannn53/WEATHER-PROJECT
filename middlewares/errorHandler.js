function errorHandler(error, req, res, next) {
  if (error.name === "SequelizeValidationError") {
    const errorMessages = {};
    error.errors.forEach((err) => {
      errorMessages[err.path] = err.message;
    });
    res.status(200).json({
      status: false,
      error: {
        type: "error.validation",
        msg: errorMessages,
      },
    });
  }
  if (error.name === "SequelizeDatabaseError") {
    return res.status(200).json({
      status: false,
      error: {
        type: "error.validation.format",
        msg: error.parent.sqlMessage,
      },
    });
  }
  // ERROR CITY NOT EXIST
  if (error.name === "city not found") {
    return res.status(200).json({
      status: false,
      error: {
        type: "error.validation",
        msg: {
          city: "validation.not.found",
        },
      },
    });
  }
  // ERROR QUERY EMPTY FOR CITY
  if (error.name === "city required") {
    return res.status(200).json({
      status: false,
      error: {
        type: "error.validation",
        msg: {
          city: "validation.required",
        },
      },
    });
  }

  // WRONG API KEY
  if (error.name == "invalid api key") {
    return res.status(200).json({
      status: false,
      error: {
        type: "error.validation",
        msg: {
          appid: "validation.invalid",
        },
      },
    });
  }

  // REFERENCE ERROR (CALL BEFORE THE VARIABLE)
  if (error.name == "ReferenceError") {
    return res.status(200).json({
      status: false,
      error: {
        type: "ReferenceError",
        msg: error.message,
      },
    });
  }

  // UNHANDLE ERROR FROM AXIOS
  if (error.response.data.message) {
    return res.status(200).json({
      status: false,
      error: {
        type: "error.validation",
        msg: {
          data: error.response.data.message,
        },
      },
    });
  }

  // IF THERES UNKNWON ERROR
  return res.status(200).json([
    {
      status: false,
      error: [{ type: "error.general" }],
    },
  ]);
}

module.exports = errorHandler;
