import { generateRandomString} from "./utils";

export const generateUserCredentials = (length) => {
  const baseString = generateRandomString(length);

  const username = baseString;
  const email = `${baseString}@mail.com`;
  const password = `${baseString}1234`;
  const registeredUser = "Rale13";
  const registeredEmail = "rale13@gmail.com";
  const registeredPassword = "Test1234"

  return {
    username,
    email,
    password,
    registeredUser,
    registeredEmail,
    registeredPassword,
  };
};

export const VALID_LOGIN_PAYLOAD = {
    email: generateUserCredentials().registeredEmail,
    password: generateUserCredentials().registeredPassword,
  };