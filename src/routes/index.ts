import { Router } from 'express';
import { AuthenticateUserController } from '../controllers/AuthenticateUserController';
import { CreateComplimentController } from '../controllers/CreateComplimentController';
import { CreateTagController } from '../controllers/CreateTagController';
import { CreateUserController } from '../controllers/CreateUserController';
import { ListTagsController } from '../controllers/ListTagsController';
import { ListUserRecivedSendComplimentsComtroller } from '../controllers/ListUserRecivedComplimentsComtroller';
import { ListUsersController } from '../controllers/ListUsersController';
import { ListUserSendComplimentsComtroller } from '../controllers/ListUserSendComplimentsComtroller';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';

const router = Router();

router.post('/login', new AuthenticateUserController().handle);

router.get('/users', ensureAuthenticate, new ListUsersController().handle);

router.post('/users', ensureAuthenticate, new CreateUserController().handle);

router.get(
  '/users/compliments/send',
  ensureAuthenticate,
  new ListUserSendComplimentsComtroller().handle
);

router.get(
  '/users/compliments/recived',
  ensureAuthenticate,
  new ListUserRecivedSendComplimentsComtroller().handle
);

router.get('/tags', ensureAuthenticate, new ListTagsController().handle);

router.post(
  '/tags',
  ensureAuthenticate,
  ensureAdmin,
  new CreateTagController().handle
);

router.post(
  '/compliments',
  ensureAuthenticate,
  new CreateComplimentController().handle
);

export { router };
