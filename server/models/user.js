var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var { hash, compare } = require("bcryptjs");

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		// username: {
		// 	type: String,
		// 	minlength: 6,
		// 	maxlength: 12,
		// 	required: true,
		// 	unique: true,
		// },
		email: {
			type: String,
			required: true,
			match: /@/,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {

	try {
		if (this.password && this.isModified("password")) {
			this.password = await hash(this.password, 10);
			console.log(this.password);
		}
		next();
	} catch (error) {
		next(error);
	}
});

userSchema.methods.verifyPassword = async function (password, next) {
	try {
		return await compare(password, this.password);
	} catch (error) {
		next(error);
	}
};
userSchema.methods.format = function () {
	return {
		id: this._id,
		email: this.email,
		name: this.name,
		quizzes: this.quizzes,
	};
};
module.exports = mongoose.model("User", userSchema);
