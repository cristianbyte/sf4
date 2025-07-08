export const sanitizeRes = (user) => {
    const { password, ...safeUser } = user;
    return safeUser;
};

export const sanitizeLogin = (data) => {
  const result = {};
  if (data.email) result.email = data.email;
  if (data.password) result.password = data.password;
  return result;
};