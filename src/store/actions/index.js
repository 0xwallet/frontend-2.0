export const login = (info) => ({
    type: 'login',
    payload: {
      data : {
          info
      }
    }
});