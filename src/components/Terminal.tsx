import React from 'react';
import { useTerminal } from '../hooks/useTerminal';

const Terminal: React.FC = () => {
  const { terminalContent, colorClass } = useTerminal();

  return (
    <div id="terminal">
      {terminalContent.map((char, index) => (
        <span key={index} className={colorClass}>
          {char === '\n' ? <br /> : char}
        </span>
      ))}
      <span id="cursor" />
    </div>
  );
};

export default Terminal;
