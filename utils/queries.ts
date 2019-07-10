import { RouterProps } from 'next-server/router';
import fetch from 'isomorphic-unfetch';
import { IDictionary, IFetchConfig, IFetchParamsValues, IUser } from '../models';
import { API_URL } from '../data';
import { defined } from './variable-evaluation';
import { isBrowser } from './browser';
import { Authentication } from '../components/auth';
import { resolveTableState } from './queries-resolve-state';
import { resolveAs, resolveHref, serialize } from './queries-format';

export async function fetchData(url: string, opts?: IDictionary<any>) {
  let auth;
  let authHeaders = {};
  let root = API_URL;

  if (isBrowser()) {
    auth = new Authentication();
    const user: IUser = await auth.getUser();
    if (user && user.id_token) {
      authHeaders = { Authorization: `Bearer ${user.id_token}` };
    }
  } else if (root.indexOf('http') !== 0) {
    root = 'http://api:8081/api';
  }

  if (!root) {
    root = 'http://3.211.248.180/api';
  }
  console.info('fetch url: ', `${root}${url}`);

  const defaultOpts = {
    headers: {
      ...authHeaders,
    },
  };
  let res;
  if (opts) {
    if (opts.headers) {
      opts.headers = { ...defaultOpts.headers, ...opts.headers };
    }
    res = await fetch(`${root}${url}`, { ...defaultOpts, ...opts });
  } else {
    res = await fetch(`${root}${url}`, defaultOpts);
  }
  if (res.status === 401 || res.status === 403) {
    if (auth) {
      auth.login();
    }
  }

  if (res.status === 204) {
    return null;
  } else {
    return await res.json();
  }
}

let currentTab;
let historyMethod = 'push';

export async function resolveTableFetch(
  nextFilterParams: Partial<IFetchParamsValues>,
  currentFilterParams: Partial<IFetchParamsValues>,
  router: RouterProps,
  fetchConfig: IFetchConfig,
): Promise<any> {
  const { child, parent, excluded } = fetchConfig;
  let filterParams = {
    ...currentFilterParams,
    ...child.params,
    ...nextFilterParams,
  };

  if (child.params) {
    // tab change
    if (currentTab !== child.params.tab) {
      historyMethod = 'replace';
      if (currentTab) {
        filterParams = child.params;
      }
    }
    currentTab = child.params.tab;
  }

  let fetchUrl;

  if (defined(fetchConfig.parent)) {
    // for nested tables eg/ block details -> transactions table
    const allParams = {
      ...parent.params,
      ...filterParams,
    };

    const href = resolveHref(allParams, parent, excluded);
    const as = resolveAs(filterParams, parent, [
      ...(excluded || []),
      ...Object.keys(parent.params),
    ]);
    router[historyMethod](href, as, { shallow: true });
    const urlParams = serialize(filterParams, Object.keys(parent.params));
    fetchUrl = fetchConfig.fetchUrlIsAsPath
      ? as
      : urlParams
      ? `${child.pathname}?${urlParams}`
      : child.pathname;
  } else {
    const params = serialize(filterParams);
    const path = params ? `${child.pathname}?${params}` : child.pathname;
    router.push(path, path, { shallow: true });
    fetchUrl = path;
  }
  const tableFetch = await fetchData(fetchUrl);
  return resolveTableState(tableFetch, filterParams);
}

export function removeTabPath(asPath) {
  const pathParts = asPath.split('/');
  if (pathParts.length > 3) {
    pathParts.pop();
  }
  return pathParts.join('/');
}

export * from './queries-resolve-state';
export * from './queries-format';
