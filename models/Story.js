const { model, Schema } = require('mongoose');
const { ObjectId } = Schema.Types;

const StorySchema = new Schema({
  title: { type: String, required: true, trim: true },
  body: { type: String, required: true },
  status: { type: String, default: 'public', enum: ['private', 'public'] },
  body: { type: ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model('Story', StorySchema);
