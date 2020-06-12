var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const quizSchema = new Schema(
  {
    title: {
      type: String,
      minlength: 4,
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
