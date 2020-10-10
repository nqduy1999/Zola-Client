const NProgress = require('nprogress');
const nextRoutes = require('next-routes');
const routes = (module.exports = nextRoutes());

NProgress.configure({ showSpinner: false });

routes.Router.onRouteChangeStart = () => {
  NProgress.start();
};

routes.Router.onRouteChangeComplete = () => {
  NProgress.done();
};

routes.Router.onRouteChangeError = () => {
  NProgress.done();
};

routes.add('Index', '/index', 'index');
routes.add('SignUp', '/sign-up', 'sign-up');
routes.add('Home', '/home', 'home');
