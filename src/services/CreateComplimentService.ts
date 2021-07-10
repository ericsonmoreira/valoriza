import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';
import { TagsRepositories } from '../repositories/TagsRepositories';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IComplimentResquest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

const schema = yup.object().shape({
  tag_id: yup.string().required(),
  user_sender: yup.string().required(),
  user_receiver: yup.string().required(),
  message: yup.string().required(),
});

class CreateComplimentService {
  async execute({
    tag_id,
    user_sender,
    user_receiver,
    message,
  }: IComplimentResquest) {
    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );
    const usersRepositories = getCustomRepository(UsersRepositories);
    const tagsRepositories = getCustomRepository(TagsRepositories);

    await schema.validate({ tag_id, user_sender, user_receiver, message });

    if (user_sender === user_receiver)
      throw new Error('Invalid User Receiver - equals User Sender');

    const userReceiverExists = await usersRepositories.findOne(user_receiver);

    if (!userReceiverExists) throw new Error('User Receiver Not Exists');

    const userSenderExists = await usersRepositories.findOne(user_sender);

    if (!userSenderExists) throw new Error('User Sender Not Exists');

    const tagExists = await tagsRepositories.findOne(tag_id);

    if (!tagExists) throw new Error('Tag Not Exists');

    const compliment = complimentsRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message,
    });

    await complimentsRepositories.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };
