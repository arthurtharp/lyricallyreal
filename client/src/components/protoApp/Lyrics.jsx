import React from 'react';
import nl2br from 'react-newline-to-break';

const Lyrics = props => {
  return <div className="text-center">{nl2br(props.lyrics)}</div>;
};

export default Lyrics;
