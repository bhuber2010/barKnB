'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';
import Dog from '../dog/dog.model';
import User from '../user/user.model';

const RequestSchema = new mongoose.Schema({
  dog: { type: Schema.Types.ObjectId, ref: 'Dog' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  start: Date,
  duration: Number,
  status: String
});

export default mongoose.model('Request', RequestSchema);
