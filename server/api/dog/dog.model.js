'use strict';

import mongoose from 'mongoose';

var DogSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Dog', DogSchema);
