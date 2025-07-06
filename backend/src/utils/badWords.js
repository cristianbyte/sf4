const badWords = [
  'puta', 'mierda', 'malparido', 'gonorrea', 'hpta', 'culero', 'pendejo','perra','verga','pichurria',
  'fuck', 'bitch', 'asshole', 'shit', 'bastard', 'dick', 'cunt', 'fag'
];

export const containsBadWords = (text) => {
  const normalized = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return badWords.some(word => normalized.includes(word));
};