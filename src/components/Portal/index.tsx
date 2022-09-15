import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children, id = '' }: any) => {
  const _node: any = useMemo(() => (id ? document.getElementById(id) : document.body), [id]);
  return createPortal(<>{children}</>, _node);
};

export default Portal;
