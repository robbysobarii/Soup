export const checkPasswordValid = (password) => {
  const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
  if (passwordRegex.test(password)) {
    return true
  } else {
    return false
  }
}