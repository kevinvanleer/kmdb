import React from 'react';
import PropTypes from 'prop-types';

const getTouchMoveDistance = (start, end) => {
  return (
    (end.screenX - start.screenX) ** 2 + (end.screenY - start.screenY) ** 2
  );
};

class Clickable extends React.Component {
  constructor(props) {
    super(props);
    this.touchStart = null;
  }
  render() {
    return (
      <button
        id={this.props.id}
        style={this.props.style}
        className={`grasp-core-clickable ${this.props.className}`}
        onClick={evt => {
          window.dataLayer &&
            window.dataLayer.push({
              event: 'Clickable click',
              id: this.props.id,
              disabled: this.props.disabled,
            });
          if (evt !== undefined) {
            evt.stopPropagation();
            evt.preventDefault();
          }
          if (!this.props.disabled) {
            this.props.onClick && this.props.onClick(evt);
          }
        }}
        title={
          this.props.disabled ? this.props.disabledTitle : this.props.title
        }
        onMouseOver={evt => {
          if (evt !== undefined) {
            evt.stopPropagation();
            evt.preventDefault();
          }
          if (!this.props.disabled) {
            this.props.onMouseOver && this.props.onMouseOver(evt);
          }
        }}
        onTouchStart={evt => {
          if (evt !== undefined) {
            evt.stopPropagation();
            evt.preventDefault();
          }
          this.touchStart = evt.touches[0];
        }}
        onTouchEnd={evt => {
          window.dataLayer &&
            window.dataLayer.push({
              event: 'Clickable click',
              id: this.props.id,
              disabled: this.props.disabled,
            });
          if (evt !== undefined) {
            evt.stopPropagation();
            evt.preventDefault();
          }
          let moveDist = getTouchMoveDistance(
            this.touchStart,
            evt.changedTouches[0]
          );
          if (moveDist < 4) {
            if (!this.props.disabled) {
              this.props.onTouchEnd
                ? this.props.onTouchEnd(evt)
                : this.props.onClick && this.props.onClick(evt);
            }
          }
        }}
        onKeyPress={this.props.onKeyPress}
        onContextMenu={evt => {
          if (evt !== undefined) {
            evt.stopPropagation();
            evt.preventDefault();
          }
        }}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
      >
        {this.props.children}
      </button>
    );
  }
}

Clickable.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  onTouchEnd: PropTypes.func,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  disabledTitle: PropTypes.string,
  onKeyPress: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

Clickable.defaultProps = {
  disabled: false,
  disabledTitle: undefined,
};

export default Clickable;
