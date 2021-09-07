import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const encrypt = async (text: string) =>
  await bcrypt.hash(text, saltOrRounds);
