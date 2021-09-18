import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  variant: PropTypes.string,
};

const defaultProps = {
  href: '',
  variant: 'h-8 w-8',
};

function IconContainer({ variant, href, children }) {
  // FIX ME: This could be a better/more efficient container for the icons

  const classNameVariant = `inline-block rounded-full ${variant}`;
  const renderedIcon = href === ''
    ? children
    : <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;

  return (
    <span className={classNameVariant}>
      {renderedIcon}
    </span>
  );
}

IconContainer.propTypes = propTypes;
IconContainer.defaultProps = defaultProps;

export default IconContainer;
