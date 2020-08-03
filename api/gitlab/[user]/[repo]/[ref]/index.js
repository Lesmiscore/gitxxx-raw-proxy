const axios = require("axios");

module.exports = (req, res) => {
  const { user, repo, ref } = req.query;
  const path = req.path || req.query.path || "";
  const path = req.path;
  axios(
    `https://gitlab.com/api/v4/projects/${user}%2f${repo}/repository/commits/${ref}`,
    {
      responseType: "json",
    }
  )
    .then((response) => response.data.id)
    .catch(() => ref)
    .then((ref) =>
      axios(`https://gitlab.com/${user}/${repo}/-/raw/${ref}/${path}`, {
        responseType: "stream",
      })
    )
    .then((response) => {
      response.data.pipe(res);
    });
};
