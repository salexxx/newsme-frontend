export default function isLoggedIn(api) {
  const data = {};

  api.getUser()
    .then((res) => {
      if (res.message) {
        data.name = undefined;
        data.auth = false;
        return;
      }
      data.name = res.data.name;
      data.auth = true;
    });
  return data;
}
