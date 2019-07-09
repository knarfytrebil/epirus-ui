import Routes, * as nextRoutes from "next-routes";

// @ts-ignore
export const routes = nextRoutes() as Routes;
export const Router = routes.Router;
export const Link = routes.Link;

routes
  .add('blocks', '/blocks/:detailsHash/:tab?')
  .add('contracts', '/contracts/:detailsHash/:tab?')
  .add('accounts', '/accounts/:detailsHash/:tab?')
  .add('tokens', '/tokens/:detailsHash/:tab?')
  .add('transactions', '/transactions/:detailsHash/:tab?')
  .add('metadata', '/metadata/:detailsHash/:tab?')
;
