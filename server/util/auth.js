var jwt = require("jsonwebtoken");

module.exports = {
	generateJwt: async (user, next) => {
		try {
			var payload = { userId: user._id };
			var token = await jwt.sign(payload, process.env.SECRET);
			return token;
		} catch (error) {
			next(error);
		}
	},
	validateJwt: async (req, res, next) => {
		try {
			var token = req.headers["authorization"] || "";
			if (!token && !req.isGuestAllowed) {
				return res.status(401).json({ message: "token required" });
			}
			var payload = await jwt.verify(token, process.env.SECRET);
			req.userId = payload.userId;
			next();
		} catch (error) {
			if(req.isGuestAllowed) {
				next();
			} else {
				return res
					.status(401)
					.json({ error: error.message || "something went wrong" });
			}
		}
	},
	
	allowGuest: (req, res, next) => {
		req.isGuestAllowed = true;
		next();
	}
};
