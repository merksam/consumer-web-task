import * as React from 'react';
import classnames from 'clsx';
import PropTypes from 'prop-types';

import styles from './icon-style.scss';

const propTypes = {
  className: PropTypes.string,
  raw: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

const defaultProps = {
  className: undefined,
  raw: false,
};

function Icon(props) {
  const { className, name, raw } = props;

  if (!name) {
    return null;
  }

  const icon = require(`./${name}.svg`);
  if (!icon) {
    return null;
  }

  return (
    <span
      className={classnames(styles['icon'], { [styles['icon-raw']]: raw }, className, name)}
      dangerouslySetInnerHTML={{ __html: icon.default }}
    />
  );
}

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export { Icon };
