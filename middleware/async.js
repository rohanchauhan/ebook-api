module.exports = function asyncMiddleware(handler) {
    return (req, res, next) => {
        try {
            await handler(req, res);
        }
        catch (error) {
            next(error);
        }
    };
}