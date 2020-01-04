import express from 'express';

export const nextDevRouter = nextHandler => {
  const router = express.Router();
  router.get('/_next/*', (req, res) => nextHandler(req, res));
  return router;
};
