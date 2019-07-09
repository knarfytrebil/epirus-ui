import { ITokensData, ITokenDetailsResult } from '../models';
import { ETagType } from '../components';

export function resolveTokenName(data: ITokensData | ITokenDetailsResult): string {
  const { name, address, symbol } = data;
  if (name && symbol) {
    return `${name} (${symbol})`;
  } else if (name) {
    return name;
  } else {
    return address;
  }
}

export function tokenTableTagLookup(tagType: ETagType): string {
  switch (tagType) {
    default:
      return 'Hybrid';
    case ETagType.ERC20:
      return 'Fungible';
    case ETagType.ERC721:
      return 'NonFungible';
    case ETagType.ERC1155:
      return 'Hybrid';
  }
}

export function tokenDetailsTagLookup(tagType: ETagType): string {
  switch (tagType) {
    default:
      return 'Hybrid';
    case ETagType.ERC20:
      return 'Fungible (ERC20)';
    case ETagType.ERC721:
      return 'Non-Fungible (ERC721)';
    case ETagType.ERC1155:
      return 'HybridERC1155';
  }
}
