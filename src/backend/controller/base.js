class BaseControllerClass {
    constructor() {

    }

    toResponse(data) {
        return JSON.stringify({
            data: data
        });
    }

    toError(error) {
        return JSON.stringify({
            error: error
        });
    }
};

export default BaseControllerClass;