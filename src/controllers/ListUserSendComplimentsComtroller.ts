/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { ListUserSendComplimentsService } from '../services/ListUserSendComplimentsService';

class ListUserSendComplimentsComtroller {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const listUserSendComplimentsService = new ListUserSendComplimentsService();

    const compliments = listUserSendComplimentsService.execute(user_id);

    return compliments;
  }
}

export { ListUserSendComplimentsComtroller };
