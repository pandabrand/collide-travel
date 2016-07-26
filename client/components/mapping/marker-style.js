// Taken from istarkov google-map-react-examples
// https://github.com/istarkov/google-map-react-examples/tree/master/web/flux/components/examples/x_simple

const K_WIDTH = 40;
const K_HEIGHT = 40;
const K_CIRCLE_SIZE = 30;
const K_STICK_SIZE = 10;
const K_STICK_WIDTH = 3;

const markerStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_CIRCLE_SIZE,
  height: K_CIRCLE_SIZE,
  left: -K_CIRCLE_SIZE / 2,
  top: -(K_CIRCLE_SIZE)
};

const markerCircleStyle = {
  position: 'absolute',
  left: 0,
  top: K_CIRCLE_SIZE,
  width: K_CIRCLE_SIZE,
  height: K_CIRCLE_SIZE,
  border: '3px solid #f44336',
  borderRadius: K_CIRCLE_SIZE,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 1,
  cursor: 'pointer',
  boxShadow: '0 0 0 1px white'
};


const markerCircleStyleHover = {
  ...markerCircleStyle,
  border: '3px solid #3f51b5',
  color: '#f44336'
};

export {markerStyle, markerCircleStyle,markerCircleStyleHover, K_CIRCLE_SIZE};
