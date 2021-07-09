import { getCustomRepository } from 'typeorm';
import { TagsRepositories } from '../repositories/TagsRepositories';
import * as yup from 'yup';

interface ITagResquest {
  name: string;
}

const schema = yup.object().shape({
  name: yup.string().required(),
});

class CreateTagService {
  async execute({ name }: ITagResquest) {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    await schema.validate({ name });

    const tagAlreadyExists = await tagsRepositories.findOne({ name });

    if (tagAlreadyExists) throw new Error('Tag Already Exists');

    const tag = tagsRepositories.create({
      name,
    });

    await tagsRepositories.save(tag);

    return tag;
  }
}

export { CreateTagService };
