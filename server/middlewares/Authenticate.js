const { compareToken } = require("../helper/generateToken")
const { User } = require("../models")

module.exports = (req, res, next) => {
    // console.log(req.headers)
    const { access_token } = req.headers
    if (!access_token) {
        res.status(401).json({msg: "Login First"})
    } else {
        const decoded = compareToken(access_token)
        // console.log(decoded.id)
        req.LoginUser = decoded
        // console.log(req.LoginUser)
        User.findOne({where: {
            id: decoded.id
        }})
            .then(data => {
                if(data) {
                    next()
                } else {
                    res.status(401).json({msg: "Login First"})
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}