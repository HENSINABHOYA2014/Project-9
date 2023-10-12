import React from 'react';

function Note({ title, content }) {
  return (
    <div className="note">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}

export default Note;
