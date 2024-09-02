/* eslint-disable no-var */
import jwt from 'jsonwebtoken'

export var auth = (req, res, next) => {

    const token = req.header('token');
    if (!token) {
        var error = {
            status: 500,
            message: `We need to be identified to access here`,
            type: 'TypeError.AnthError'
        }
        return res.status(error.status).send(error);
    }
    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = decoded._id;
        req.email = decoded.email;
        req.name = decoded.name;
        next();
    } catch (error) {
        var error = {
            status:'TokenExpiredError' ? 403: 500,
            message: error.name == 'TokenExpiredError' ? 'Your session has expired please login again' : `The token is invalid`,
            type: 'TypeError.AnthError'
        }
        return res.status(error.status).send(error);
    }
}


