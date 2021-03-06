'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/profile', auth.isAuthenticated(), controller.updateProfile);
router.put('/:id/settings', auth.isAuthenticated(), controller.updateUserSettings);
router.put('/:id/dog', auth.isAuthenticated(), controller.updateDogs);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

export default router;
