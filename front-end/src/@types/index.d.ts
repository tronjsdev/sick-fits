import { NextPage } from 'next';

declare module 'next' {
  import { ReactNode } from 'react';

  type AppPage<P = {}, IP = P> = NextPage<P, IP> & {
    Layout?: ReactNode;
  };
}

declare module 'react' {
  interface DOMAttributes<T> {
    css?: InterpolationWithTheme<any>
  }
}


declare global {

}
