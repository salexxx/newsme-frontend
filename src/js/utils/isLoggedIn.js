export default function isLoggedIn() {
  const JWT_TOKEN = localStorage.getItem('token');
  if (JWT_TOKEN) {
    return true;
  }
  return false;
}
