import {
  varBounceOut,
  varBounceOutUp,
  varBounceOutDown,
  varBounceOutLeft,
  varBounceOutRight
} from './BounceOut';

// ----------------------------------------------------------------------

const TRANSITION_ENTER = {
  duration: 0.72,
  ease: [0.43, 0.13, 0.23, 0.96]
};

const TRANSITION_EXIT = {
  duration: 0.48,
  ease: [0.43, 0.13, 0.23, 0.96]
};

export const varBounceIn = {
  animate: {
    scale: [0.3, 1.1, 0.9, 1.03, 0.97, 1],
    opacity: [0, 1, 1, 1, 1, 1],
    transition: TRANSITION_ENTER
  },
  exit: varBounceOut.animate
};

export const varBounceInUp = {
  animate: {
    y: [720, -24, 12, -4, 0],
    scaleY: [4, 0.9, 0.95, 0.985, 1],
    opacity: [0, 1, 1, 1, 1],
    transition: { ...TRANSITION_ENTER }
  },
  exit: { ...varBounceOutDown.animate, transition: TRANSITION_EXIT }
};

export const varBounceInDown = {
  animate: {
    y: [-720, 24, -12, 4, 0],
    scaleY: [4, 0.9, 0.95, 0.985, 1],
    opacity: [0, 1, 1, 1, 1],
    transition: TRANSITION_ENTER
  },
  exit: { ...varBounceOutUp.animate, transition: TRANSITION_EXIT }
};

export const varBounceInLeft = {
  animate: {
    x: [-720, 24, -12, 4, 0],
    scaleX: [3, 1, 0.98, 0.995, 1],
    opacity: [0, 1, 1, 1, 1],
    transition: TRANSITION_ENTER
  },
  exit: { ...varBounceOutLeft.animate, transition: TRANSITION_EXIT }
};

export const varBounceInRight = {
  animate: {
    x: [720, -24, 12, -4, 0],
    scaleX: [3, 1, 0.98, 0.995, 1],
    opacity: [0, 1, 1, 1, 1],
    transition: TRANSITION_ENTER
  },
  exit: { ...varBounceOutRight.animate, transition: TRANSITION_EXIT }
};
