const tokenSecret = 'rZnC3mS8D5N1Xh8irVj0pum2Ba3SXjTL';

const Config = {}
config.JWTsecret = process.env.SECRET || tokenSecret;
config.TokenDurationInHours = 24;


module.exports = config;