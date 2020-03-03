import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import Flexbox from './Flexbox';

const blockEvents = (el, events) => {
  const handler = event => {
    event.stopPropagation();
  };

  if (el) {
    for (let i = 0, l = events.length; i < l; i++) {
      el.addEventListener(events[i], handler);
    }

    return () => {
      for (let i = 0, l = events.length; i < l; i++) {
        el.removeEventListener(events[i], handler);
      }
    };
  }
};

const Popup = ({
  className,
  children,
  handleClick,
  top,
  left,
  bottom,
  right,
  topOccluded,
  leftOccluded,
  rightOccluded,
  bottomOccluded,
  occludingContainerId,
  blockedEvents,
  ...props
}) => {
  const [isTopOccluded, setIsTopOccluded] = useState(false);
  const [isLeftOccluded, setIsLeftOccluded] = useState(false);
  const [isBottomOccluded, setIsBottomOccluded] = useState(false);
  const [isRightOccluded, setIsRightOccluded] = useState(false);
  const popup = useRef();
  const popupRef = useCallback(
    node => {
      const getWindowWithBoundingRect = {
        getBoundingClientRect: () => ({
          top: 0,
          bottom: window.innerHeight,
          left: 0,
          right: window.innerWidth,
        }),
      };
      let occludingContainer =
        document.getElementById(occludingContainerId) ||
        getWindowWithBoundingRect;
      popup.current = node;
      if (
        node &&
        node.getBoundingClientRect().top <
          occludingContainer.getBoundingClientRect().top
      ) {
        setIsTopOccluded(true);
      } else {
        setIsTopOccluded(false);
      }
      if (
        node &&
        node.getBoundingClientRect().bottom >
          occludingContainer.getBoundingClientRect().bottom
      ) {
        setIsBottomOccluded(true);
      } else {
        setIsBottomOccluded(false);
      }
      if (
        node &&
        node.getBoundingClientRect().left <
          occludingContainer.getBoundingClientRect().left
      ) {
        setIsLeftOccluded(true);
      } else {
        setIsLeftOccluded(false);
      }
      if (
        node &&
        node.getBoundingClientRect().right >
          occludingContainer.getBoundingClientRect().right
      ) {
        setIsRightOccluded(true);
      } else {
        setIsRightOccluded(false);
      }
    },
    [occludingContainerId]
  );

  const handleEvent = e => {
    e.stopPropagation();
    e.preventDefault();
    if (popup.current.contains(e.target)) {
      return;
    }
    handleClick(e);
  };

  useEffect(() => {
    if (blockedEvents.length) {
      return blockEvents(popup.current, blockedEvents);
    }
  }, [blockedEvents]);

  useEffect(() => {
    document.addEventListener('mousedown', handleEvent);
    return () => {
      document.removeEventListener('mousedown', handleEvent);
    };
  });

  let appliedTop = top;
  let appliedBottom = bottom;
  let appliedLeft = left;
  let appliedRight = right;
  let transformOrigin = 'top left';
  let style;

  const ignoreTransform =
    className && className.includes('grasp-transform-ignore-scale');

  if (isRightOccluded) {
    appliedLeft = 'unset';
    appliedRight = rightOccluded ? rightOccluded : left;
    transformOrigin = transformOrigin.replace('left', 'right');
    style = { transformOrigin };
  } else if (isLeftOccluded) {
    appliedRight = 'unset';
    appliedLeft = leftOccluded ? leftOccluded : right;
  }
  if (isBottomOccluded) {
    appliedTop = 'unset';
    appliedBottom = bottomOccluded ? bottomOccluded : top;
    transformOrigin = transformOrigin.replace('top', 'bottom');
    style = { transformOrigin };
  } else if (isTopOccluded && !isBottomOccluded) {
    appliedBottom = 'unset';
    appliedTop = topOccluded ? topOccluded : bottom;
  }

  return (
    <Flexbox
      style={ignoreTransform && style}
      ref={popupRef}
      className={`${className} grasp-popup`}
      position="absolute"
      zIndex={1}
      top={appliedTop}
      left={appliedLeft}
      bottom={appliedBottom}
      right={appliedRight}
      {...props}
    >
      {children}
    </Flexbox>
  );
};

Popup.defaultProps = {
  blockedEvents: [],
};

Popup.propTypes = {
  className: PropTypes.string,
  props: PropTypes.node,
  children: PropTypes.node,
  handleClick: PropTypes.func,
  top: PropTypes.string,
  bottom: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  topOccluded: PropTypes.string,
  bottomOccluded: PropTypes.string,
  leftOccluded: PropTypes.string,
  rightOccluded: PropTypes.string,
  occludingContainerId: PropTypes.string,
  blockedEvents: PropTypes.array,
};

export default Popup;
