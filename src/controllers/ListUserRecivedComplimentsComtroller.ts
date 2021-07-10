/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { ListUserRecivedComplimentsService } from '../services/ListUserRecivedComplimentsService';

class ListUserRecivedSendComplimentsComtroller {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const listUserRecivedComplimentsService = new ListUserRecivedComplimentsService();

    const compliments = listUserRecivedComplimentsService.execute(user_id);

    return compliments;
  }
}

export { ListUserRecivedSendComplimentsComtroller };