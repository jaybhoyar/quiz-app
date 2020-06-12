var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const  attemptSchema = new Schema(
  {
    quizId: { type: Schema.Types.ObjectId, ref: 'Quiz'},
    playerId: { type: Schema.Types.ObjectId, ref: 'User'},
    questions: [{
      questionId: { type: Schema.Types.ObjectId, ref: 'Question'},
      answers: [],
      isCorrect: { type: Boolean, default: false },
      // score: { type: number }
    }],
    // totalScore: { type: number }
  }
  ,
  { timestamps: true }
);

module.exports = mongoose.model("Attempt", attemptSchema);
