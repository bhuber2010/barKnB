'use strict';

import mongoose from 'mongoose';

const DogSchema = new mongoose.Schema({
  name: String,
  breed: String,
  photo: String,
  bio: String,
  vet_contact: String,
  rating: Number,
  // requests: [Request.schema],
  // shots: [Shot.schema],
  // comments: [Comment.schema]
});

export default mongoose.model('Dog', DogSchema);
