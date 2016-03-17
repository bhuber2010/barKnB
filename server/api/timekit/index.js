'use strict';

import {Router} from 'express';
import * as auth from '../../auth/auth.service';
import * as controller from './timekit.controller';

var router = new Router();

router.get('/callback', controller.saveAccount);


export default router;