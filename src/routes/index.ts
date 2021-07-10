import { Router } from 'express';
import { AuthenticateUserController } from '../controllers/AuthenticateUserController';
import { CreateComplimentController } from '../controllers/CreateComplimentController';
import { CreateTagController } from '../controllers/CreateTagController';
import { CreateUserController } from '../controllers/CreateUserController';
import { ListUserRecivedSendComplimentsComtroller } from '../controllers/ListUserRecivedComplimentsComtroller';
import { ListUserSendComplimentsComtroller } from '../controllers/ListUserSendComplimentsComtroller';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';

const router = Router();

const createUserController = new CreateUserController();

const createTagController = new CreateTagController();

const createComplimentController = new CreateComplimentController();

const authenticateUserController = new AuthenticateUserController();

const listUserSendComplimentsComtroller =
  new ListUserSendComplimentsComtroller();

const listUserRecivedSendComplimentsComtroller =
  new ListUserRecivedSendComplimentsComtroller();

router.post('/login', authenticateUserController.handle);

router.post('/users', ensureAuthenticate, createUserController.handle);

router.get(
  '/users/compliments/send',
  ensureAuthenticate,
  listUserSendComplimentsComtroller.handle
);

router.get(
  '/users/compliments/recived',
  ensureAuthenticate,
  listUserRecivedSendComplimentsComtroller.handle
);

router.post(
  '/tags',
  ensureAuthenticate,
  ensureAdmin,
  createTagController.handle
);

router.post(
  '/compliments',
  ensureAuthenticate,
  createComplimentController.handle
);

export { router };
