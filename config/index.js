const tokenSecret = 'rZnC3mS8D5N1Xh8irVj0pum2Ba3SXjTL';

const config = {}
config.JWTsecret = process.env.SECRET || tokenSecret;
config.TokenDurationInHours = 24;

config.dbURI = "mongodb://ahmed:a123456@ds255319.mlab.com:55319/efiletest";


module.exports = config;