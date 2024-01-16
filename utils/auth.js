import axios from 'axios';

async function auth(email, password) {
  try {
    const response = await axios.post('http://192.168.0.103:5001/laundaryLogin', {
      email: email,
      password: password
    });
    const data = response.data;
    const token = data.token;
    const em = data.email;
    const userId = data.userId;
    return { token: token, email: em, userId: userId };
  } catch (error) {
    console.error(error);
  }
}

export const createUser = async (email, password) => {
  const token = auth(email, password);
  return token;
};

export const checkUser = async (email, password) => {
  const token = await auth(email, password);
  return token;
};
