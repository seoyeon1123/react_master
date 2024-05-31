import React, { useState } from 'react';
import styled from 'styled-components';

function App() {
  const [username, setUsername] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Welcome ! ' + username);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={username}
          type="text"
          placeholder="username"
        />
        <button>Log In</button>
      </form>
    </div>
  );
}
export default App;
