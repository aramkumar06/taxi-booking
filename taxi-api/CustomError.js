// errors.js
class CustomError extends Error { // parent error
    constructor(taxiId, content) {
        super();
        this.name = this.constructor.name // good practice   
        this.message = `TaxiId: ${taxiId} not found` // detailed error message
        this.statusCode = 400 // error code for responding to client
    }
}

// extending to child error classes
class TaxiNotFoundError extends CustomError { }
module.exports = {
    CustomError,
    TaxiNotFoundError,
}