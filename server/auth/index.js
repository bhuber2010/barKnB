'use strict';

import express from 'express';
import passport from 'passport';
import config from '../config/environment';
import User from '../api/user/user.model';
import {Settings} from '../api/user/user.model';

// Passport Configuration
require('./local/passport').setup(User, Settings, config);
require('./google/passport').setup(User, Settings, config);

var router = express.Router();

router.use('/local', require('./local'));
router.use('/google', require('./google'));

export default router;
