import React from 'react';
import Link from 'next/link';
import { formatMoney } from '@libs';
import {DeleteItem} from "@components";

import Title from '../styles/Title';
import ItemStyles from '../styles/ItemStyles';
import PriceTag from '../styles/PriceTag';

interface Props {
  item: any;
}

const Item: React.FunctionComponent<Props> = props => {
  const { item } = props;
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
        <button type="button">Add To Cart</button>
        <DeleteItem id={item.id}>Delete</DeleteItem>
      </div>
    </ItemStyles>
  );
};

export { Item };
