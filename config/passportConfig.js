const fs = require("fs");
const path = require("path");
const { Strategy, ExtractJwt } = require("passport-jwt");

const pathToKey = path.join(__dirname, "..", "secrets", "rsaPubKey.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

const strategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await User.findOne({
      where: { uid: payload.uid },
    });
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

module.exports = (passport) => {
  passport.use(strategy);
};
