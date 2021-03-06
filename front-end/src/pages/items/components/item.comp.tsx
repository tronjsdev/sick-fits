import React from 'react';
import Link from 'next/link';
import { formatMoney } from '@libs';
import { DeleteItem } from '@components';
import { Title, ItemStyles, PriceTag } from '@components/styles';

import { AddToCartButton } from './add-to-cart-btn.comp';

interface Props {
  item: any;
  page: number;
}

const Item: React.FunctionComponent<Props> = props => {
  const { item, page } = props;
  return (
    <ItemStyles>
      {item.image && <img src={item.image} alt={item.title} />}
      <Title>
        <Link
          href={{
            pathname: '/item',
            query: { id: item.id },
          }}
        >
          <a>{item.title}</a>
        </Link>
      </Title>
      <PriceTag>{formatMoney(item.price)}</PriceTag>
      <p>{item.description}</p>

      <div className="buttonList">
        <Link
          href={{
            pathname: 'update',
            query: { id: item.id },
          }}
        >
          <a>Edit</a>
        </Link>
        <AddToCartButton itemId={item.id} />
        <DeleteItem id={item.id} page={page}>
          Delete
        </DeleteItem>
      </div>
    </ItemStyles>
  );
};

export { Item };
