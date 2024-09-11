export const calculateAge = ({ birthday }) => {
  const birthDate = new Date(birthday);

  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthDate.getFullYear();

  const monthDiff = currentDate.getMonth() - birthDate.getMonth();
  const dayDiff = currentDate.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
};
