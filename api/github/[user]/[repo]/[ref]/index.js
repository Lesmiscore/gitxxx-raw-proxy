const axios = require("axios");

module.exports = (req, res) => {
  const { user, repo, ref } = req.query;
  const path = req.path || req.query.path || "";
  axios(`https://api.github.com/repos/${user}/${repo}/commits/${ref}`, {
    responseType: "json",
  })
    .then((response) => response.data.sha)
    .catch(() => ref)
    .then((ref) =>
      axios(`https://github.com/${user}/${repo}/raw/${ref}/${path}`, {
        responseType: "stream",
      })
    )
    .then((response) => {
      response.data.pipe(res);
    });
};
