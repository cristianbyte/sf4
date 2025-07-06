export const sanitizeRes = (user) => {
    const { password, ...safeUser } = user;
    return safeUser;
};