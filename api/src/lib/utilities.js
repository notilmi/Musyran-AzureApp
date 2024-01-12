// utilities.js

function buildResponse(httpStatus, message, body) {
    const response = {
        status: httpStatus || 200,
        message: message || "OK",
        body: body !== undefined ? body : null,
    };

    return {
        headers: {
            "Content-Type": "application/json",
        },
        status: httpStatus || 200,
        body: JSON.stringify(response),
    };
}

module.exports = { buildResponse }