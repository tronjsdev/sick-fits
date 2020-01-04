/* eslint-disable @typescript-eslint/camelcase */
import express from 'express';
import passport from 'passport';

const LOGIN_URL = '/auth/login';

export const authRouter = app => {
  // base = /auth
  const router = express.Router();

  router.use(
    '/login',
    (req, res, next) => {
      const { nextUrl } = req.query;
      req.session.nextUrl = nextUrl;
      next();
    },
    passport.authenticate('openid-client')
  );

  router.use(
    '/cb',
    passport.authenticate('openid-client', { failureRedirect: '/error' }),
    (req, res) => {
      const { nextUrl } = req.session;
      delete req.session.nextUrl;
      res.redirect(nextUrl || '/account/profile');
    }
  );
  /*router.use('/cb', (req, res, next) => {
    const optionsx = { successRedirect: '/', failureRedirect: '/login' };
    passport.authenticate('openid-client', optionsx, (err, user, info) => {
      if (err) {
        console.log(`ERROR: ${err.error}: ${err.error_description}`);
        return next(err);
      }
      if (!user) return res.redirect(optionsx.failureRedirect);
      return next();
    })(req, res, next);
  });*/

  return router;
};
