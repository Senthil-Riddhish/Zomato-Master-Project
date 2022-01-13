export const ValidateUser=(req, res) => {
    console.log(req);
    if (!req.session.passport.user._doc._id.equals(req.params._id)) {
      return res.status(401).json({ error: "Unatuhorized" });
    }
  };