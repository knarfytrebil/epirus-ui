import * as React from 'react';
import { ILinkItem, ELinkType } from '../models';

export function handleAndResolveLinks(
  links: ILinkItem[],
  router,
  renderNotFound,
  linkType: ELinkType,
) {
  if (links) {
    const link: ILinkItem = resolveLink(links, linkType);
    if (link) {
      router.push(link.href);
    } else {
      renderNotFound();
    }
  } else {
    renderNotFound();
  }
}

export function resolveLink(links: ILinkItem[], linkType: ELinkType) {
  return links.filter((searchLink: ILinkItem) => searchLink.rel === linkType).pop();
}
