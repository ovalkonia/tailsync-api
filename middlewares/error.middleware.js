export default () => {
    return (err, req, res, next) => {
        console.error("UNKNOWN ERROR:");
        console.error(err);

        return res.status(500).json({
            status: "error",
            message: "Internal Server Error!",
        });
    };
};

