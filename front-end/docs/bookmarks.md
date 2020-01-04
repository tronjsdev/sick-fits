
Refs
---

- Take a look at this project structure:
  https://github.com/lpbayliss/lpbayliss-nextjs-starter
  
- https://zellwk.com/blog/async-await-express/

- A way to access session/data both on server and client:
https://github.com/zeit/next.js/issues/2252#issuecomment-353992669

- https://developer.okta.com/blog/2018/05/18/node-authentication-with-passport-and-oidc

- How to secure redis:\
https://www.digitalocean.com/community/tutorials/how-to-secure-your-redis-installation-on-ubuntu-14-04

### node-oidc-provider
+ How to check if user logged in or not:\
https://github.com/panva/node-oidc-provider/blob/master/docs/README.md#how-to-display-on-the-website-of-the-op-itself-if-the-user-is-signed-in-or-not

+ Playground:\
https://tranquil-reef-95185.herokuapp.com/setup

+ Local signin: \
https://github.com/panva/node-oidc-provider/issues/535

### Single Sign-on:
> The basic working principle on which SSO works is you can log in to a system in a multi-system application group and be authorized in all other systems without having to log in again, including single sign-on and single sign-off.

> Single Sign On works by having a central server, which all the applications trust. When you login for the first time a cookie gets created on this central server. Then, whenever you try to access a second application, you get redirected to the central server, if you already have a cookie there, you will get redirected directly to the app with a token, without login prompts, which means you’re already logged in. \
>\
> For example, Google implements Single Sign On in its services. Google’s central server is https://accounts.google.com. Once you are logged in this server, you will be able to access Gmail, Youtube, and Google Docs without entering your credentials again. \
>https://accounts.google.com/ServiceLogin?service=youtube&uilel=3&passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3D%252F%253Freload%253D9%2526reload%253D9&hl=en&ec=65620

+ An simple example of how to implement SSO in nodejs: \
 https://codeburst.io/building-a-simple-single-sign-on-sso-server-and-solution-from-scratch-in-node-js-ea6ee5fdf340
 

