'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';
import User from '../user/user.model';
import Request from '../request/request.model';

const DogSchema = new mongoose.Schema({
  owner_user: { type: Schema.Types.ObjectId, ref: 'User' },
  owner: Boolean,
  name: String,
  breed: String,
  photo: String,
  bio: String,
  vet_contact: String,
  rating: Number,
  requests: [{ type: Schema.Types.ObjectId, ref: 'Request' }],
  shots: [{ type: Schema.Types.ObjectId, ref: 'Shot' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

const ShotSchema = new mongoose.Schema({
  name: String,
  date: Date
});

const CommentSchema = new mongoose.Schema({
  user: String,
  comment: String
});

const Shot = mongoose.model('Shot', ShotSchema);
const Comment = mongoose.model('Comment', CommentSchema);

export default mongoose.model('Dog', DogSchema);
