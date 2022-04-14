import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import { override } from '@helpers/loaderOverrider';

const FadeLoading = props => {
  const { color, text } = props;
  return (
    <>
      <FadeLoader
        css={override}
        sizeUnit="px"
        height={15}
        width={5}
        radius={20}
        // size={50}
        color={color}
        loading
      />
      <p className="mt-3 mb-0 text-center">{text}</p>
    </>
  );
};

export default FadeLoading;
