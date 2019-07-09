import { IDictionary, IHashLinkConfig, IUrlConfig } from '../models';
import { defined } from './variable-evaluation';

export function serialize(obj: IDictionary<any>, excluded?: string[]) {
  const str = [];
  for (const p in obj) {
    if (obj[p] && obj.hasOwnProperty(p)) {
      const param = `${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`;
      if (defined(excluded)) {
        if (excluded.indexOf(p) === -1) {
          str.push(param);
        }
      } else {
        str.push(param);
      }
    }
  }
  return str.join('&');
}

export function serializeClean(obj: IDictionary<any>) {
  const str = [];
  for (const p in obj) {
    if (obj[p] && obj.hasOwnProperty(p)) {
      str.push(`/${encodeURIComponent(obj[p])}`);
    }
  }
  return str.join('');
}

export function hashLinkProps(hashLinkConfig: IHashLinkConfig) {
  const { rootUrl, hash } = hashLinkConfig;
  return {
    href: `/${rootUrl}?hash=${hash}`,
    as: `/${rootUrl}/${hash}`,
  };
}

export function removeSpaces(x: string): string {
  if (defined(x)) {
    return x.replace(/\s/g, '');
  } else {
    return '';
  }
}

export function transformFilterArrayToString(currentFilters: IDictionary<string[]>): string {
  const arr = Object.keys(currentFilters);
  if (arr && arr.length > 0) {
    return arr.reduce((filterString: string, type: string) => {
      // all filter types
      if (currentFilters[type] && currentFilters[type].length > 0) {
        if (filterString !== '') {
          filterString += ' and ';
        }
        filterString += currentFilters[type].reduce((a: string, c: string, i: number) => {
          // each filter type
          if (c !== 'All') {
            c = removeSpaces(c);
            if (i > 0) {
              a += ` or ${type} eq ${c}`;
            } else {
              a += `${type} eq ${c}`;
            }
          }
          if (i === currentFilters[type].length - 1) {
            return `( ${a} )`;
          } else {
            return a;
          }
        }, '');
      }
      return filterString;
    }, '');
  } else {
    return null;
  }
}

export function filterToCurrentSelectedOptions(filter: string): IDictionary<string[]> {
  if (filter) {
    const parts = filter.replace(/[()]/g, '').split(' ');
    return parts.reduce((a: IDictionary<string[]>, part: string, index: number) => {
      if (parts[index + 1] === 'eq') {
        if (a[part]) {
          a[part] = [...a[part], parts[index + 2]];
        } else {
          a[part] = [parts[index + 2]];
        }
      }
      return a;
    }, {});
  } else {
    return {};
  }
}

export function filterToSelectedOptions(filter: string): string[] {
  const parts = filter.split(' ');
  return parts.filter(
    (part: string, index: number) =>
      part && !(part === 'eq' || parts[index + 1] === 'eq' || part === 'or'),
  );
}

export function resolveHref(allParams, parent: IUrlConfig, excludedUrlParams?: string[]) {
  const serializedParams = serialize(allParams, excludedUrlParams);
  const cleanParams = parent.pathname;
  if (serializedParams) {
    return `${cleanParams}?${serializedParams}`;
  } else {
    return cleanParams;
  }
}

export function resolveAs(filterParams, parent: IUrlConfig, excludedUrlParams?: string[]) {
  const serializedParams = serialize(filterParams, excludedUrlParams);
  const cleanParams = `${parent.pathname}${serializeClean(parent.params)}`;
  if (serializedParams) {
    return `${cleanParams}?${serializedParams}`;
  } else {
    return cleanParams;
  }
}
