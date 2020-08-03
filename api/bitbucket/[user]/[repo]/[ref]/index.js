const axios = require("axios");

module.exports = (req, res) => {
  const { user, repo, ref } = req.query;
  const path = req.path;
  axios(
    `https://api.bitbucket.org/2.0/repositories/${user}/${repo}/commits/${ref}`,
    {
      responseType: "json",
    }
  )
    .then((response) => response.data.sha)
    .catch(() => ref)
    .then((ref) =>
      axios(`https://bitbucket.org/${user}/${repo}/raw/${ref}/${path}`, {
        responseType: "stream",
      })
    )
    .then((response) => {
      response.data.pipe(res);
    });
};
