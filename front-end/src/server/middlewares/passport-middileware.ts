/* eslint-disable @typescript-eslint/camelcase */
import passport from 'passport';
import { AuthorizationParameters, generators, Strategy } from 'openid-client';

const doNotUseSessionPages = ['/public'];

const passportMiddleware = app => {
  app.use(passport.initialize());
  
  // Passport resolve session on every request, which also call to passport.deserializeUser
  // This is a trick to avoid that on certain paths
  app.use((req, res, next) => {
    if (doNotUseSessionPages.some(x=>x===req.url)) {
      next(); // do not invoke passport
    } else {
      passport.session()(req, res, next);
      //app.use(passport.session());
    }
  });

  const client = new app.locals.identixIssuer.Client({
    client_id: process.env.IDENTIX_OAUTH2_CLIENT_ID as string,
    client_secret: process.env.IDENTIX_OAUTH2_CLIENT_SECRET as string,
    redirect_uris: [process.env.IDENTIX_OAUTH2_CLIENT_REDIRECT_URI as string],
    response_types: ['code'],
  });

  const params: AuthorizationParameters = {
    client_id: process.env.IDENTIX_OAUTH2_CLIENT_ID as string,
    redirect_uri: process.env.IDENTIX_OAUTH2_CLIENT_REDIRECT_URI as string,
    response_type: 'code',
    scope: 'openid profile email',
    nonce: generators.nonce(),
  };
  const options = { client, params };

  const verifyCallback = (tokenSet, userInfo, done) => {
    console.log('oidc-client Strategy verify result: ', { tokenSet, userInfo });
    // Here we have options to store the user info in session: save full of the info or just the userid and
    // some other basic info.
    // If just the userid to be saved to the session, then in the `passport.deserializeUser` below we should
    // query the full user info from the db
    const userContext = { tokenSet, userInfo };
    return done(null, userContext);
  };

  passport.serializeUser((userContext, done) => {
    done(null, userContext);
  });

  passport.deserializeUser((obj, done) => {
    console.log('passport.deserializeUser(', obj);
    //If need to get more info of use, can query them from db here?
    done(null, obj);
  });

  return (req, res, next) => {
    passport.use('openid-client', new Strategy(options, verifyCallback));
    next();
  };
};

export { passportMiddleware };
