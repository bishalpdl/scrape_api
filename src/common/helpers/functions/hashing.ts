import * as bcrypt from 'bcryptjs';

const generateSalt = async (length: number = 10) => {
  return await bcrypt.genSalt(length);
};

export const generateHash = async (value: string, salt?: string) => {
  if (!salt) {
    salt = await generateSalt();
  }
  return { hashedValue: await bcrypt.hash(value, salt), salt };
};
