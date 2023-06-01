import React from 'react';
import Nav from '@/components/Nav';
import Main from '@/components/Main';
const index: React.FC = () => {
  return (
    <>
      <Nav />
      <Main />
    </>
  );
};

export default index;

// export default connect(mapStateToProps, mapDispatchToProps)(index);
