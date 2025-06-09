const { connect } = require("mongoose")

const connectMongo = (url) => {
    return connect(url)
}

module.exports = {connectMongo}