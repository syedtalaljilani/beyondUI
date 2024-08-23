#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { program } = require('commander');

program
  .version('1.0.0')
  .argument('<componentType>', 'Component type for example (Button or Input)')
  .option('-js', 'Create a JavaScript component')
  .option('-ts', 'Create a TypeScript component')
  .parse(process.argv);

const options = program.opts();
const [componentType] = program.args;

const validComponents = ['Button', 'Input'];
if (!validComponents.includes(componentType)) {
  console.error('Invalid component type. Choose either for example "Button" or "Input".');
  process.exit(1);
}

const componentDir = path.join('src', 'components', componentType);

// Create directories if they don't exist
if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
}

const isTypeScript = options.ts;
const fileExtension = isTypeScript ? 'tsx' : 'jsx';

// Generate the component file content based on the component type
let componentTemplate;

if (componentType === 'Button') {
  componentTemplate = isTypeScript
    ? `
import React from 'react';

interface ${componentType}Props {
  label: string;
  onClick?: () => void;
  backgroundColor?: string;
  color?: string;
  borderRadius?: string;
}

const ${componentType}: React.FC<${componentType}Props> = ({
  label,
  onClick,
  backgroundColor = '#007bff',
  color = '#fff',
  borderRadius = '5px',
}) => {
  const style = {
    backgroundColor,
    color,
    borderRadius,
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  };

  return (
    <button style={style} onClick={onClick}>
      {label}
    </button>
  );
};

export default ${componentType};
`
    : `
import React from 'react';
import PropTypes from 'prop-types';

const ${componentType} = ({
  label,
  onClick,
  backgroundColor = '#007bff',
  color = '#fff',
  borderRadius = '5px',
}) => {
  const style = {
    backgroundColor,
    color,
    borderRadius,
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  };

  return (
    <button style={style} onClick={onClick}>
      {label}
    </button>
  );
};

${componentType}.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  borderRadius: PropTypes.string,
};

${componentType}.defaultProps = {
  onClick: () => {},
  backgroundColor: '#007bff',
  color: '#fff',
  borderRadius: '5px',
};

export default ${componentType};
`;
} else if (componentType === 'Input') {
  componentTemplate = isTypeScript
    ? `
import React, { ChangeEvent } from 'react';

interface ${componentType}Props {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  backgroundColor?: string;
  color?: string;
  borderRadius?: string;
}

const ${componentType}: React.FC<${componentType}Props> = ({
  value,
  onChange,
  placeholder = 'Enter text...',
  backgroundColor = '#fff',
  color = '#000',
  borderRadius = '5px',
}) => {
  const style = {
    backgroundColor,
    color,
    borderRadius,
    padding: '10px',
    border: '1px solid #ccc',
    fontSize: '16px',
  };

  return (
    <input 
      type="text" 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder} 
      style={style} 
    />
  );
};

export default ${componentType};
`
    : `
import React from 'react';
import PropTypes from 'prop-types';

const ${componentType} = ({
  value,
  onChange,
  placeholder = 'Enter text...',
  backgroundColor = '#fff',
  color = '#000',
  borderRadius = '5px',
}) => {
  const style = {
    backgroundColor,
    color,
    borderRadius,
    padding: '10px',
    border: '1px solid #ccc',
    fontSize: '16px',
  };

  return (
    <input 
      type="text" 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder} 
      style={style} 
    />
  );
};

${componentType}.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  borderRadius: PropTypes.string,
};

${componentType}.defaultProps = {
  placeholder: 'Enter text...',
  backgroundColor: '#fff',
  color: '#000',
  borderRadius: '5px',
};

export default ${componentType};
`;
}

// Create the component file
const componentFile = path.join(componentDir, `${componentType}.${fileExtension}`);

fs.writeFileSync(componentFile, componentTemplate.trim());

console.log(`Component ${componentType} created at ${componentFile}`);
