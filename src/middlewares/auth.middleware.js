const { auth0 } = require('../config/config')
const { auth } = require('express-oauth2-jwt-bearer');
const db = require('../models')

exports.ensureAuth = auth({
  audience: auth0.audience,
  issuerBaseURL: auth0.issuer,
  tokenSigningAlg: 'RS256'
});

