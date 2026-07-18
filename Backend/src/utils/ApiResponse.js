class ApiResponse {
  static success(res, message = 'Operation successful', data = null, statusCode = 200) {
    const response = {
      success: true,
      message,
    };

    if (data !== null && data !== undefined) {
      response.data = data;
    }

    return res.status(statusCode).json(response);
  }

  static created(res, message = 'Resource created successfully', data = null) {
    return ApiResponse.success(res, message, data, 201);
  }

  static error(res, message = 'Something went wrong', errors = [], statusCode = 500) {
    const response = {
      success: false,
      message,
    };

    if (errors.length > 0) {
      response.errors = errors;
    }

    return res.status(statusCode).json(response);
  }
}

module.exports = ApiResponse;
