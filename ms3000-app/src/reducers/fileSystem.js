const DEFAULT_STATE = {
  files: [
    {name: "index.html", size: 1232},
    {name: "hello.txt", size: 122},
    {name: "mario.magicBitmap", size: 1032},
    {name: "flower.magicBitmap", size: 1232},
    {name: "oneup.magicBitmap", size: 1232},
  ]
}

const fileSystem = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    // case REQUEST_SHIFTER_STATE:
    //   return {
    //     ...state,
    //     isFetching: true
    //   }
    // case RECEIVE_SHIFTER_STATE:
    //   return {
    //     ...state,
    //     shifterState: action.shifterState,
    //     isFetching: false
    //   };
    default:
      return state
  }
};

export default fileSystem
