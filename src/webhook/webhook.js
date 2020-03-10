module.exports = (req, res) => {
  const resObj = {
    body: req.body,
    query: req.query,
    cookies: req.cookies
  }
  console.log(JSON.stringify(resObj, null, 2))
  res.json(resObj)
}
