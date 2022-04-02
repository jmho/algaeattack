export const formatResponseBody = (body: SuccessResponseBody | FailureResponseBody) => {
    if (!body.data) {
        body.data = null;
    }
    return body;
};