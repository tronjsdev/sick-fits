import express from 'express';

const accountRouter = express.Router();

//TODO: should be post instead of get
accountRouter.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});
export { accountRouter };
