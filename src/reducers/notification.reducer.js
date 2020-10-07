import * as NotificationActions from '../actions/notifications.actions.js';

const INITIAL_STATE = {
  entity: {show: false},
  id: ''
};

export default function notification(state = INITIAL_STATE, action) {
  switch(action.type){
  case NotificationActions.DELETE_ONE_SUCCESS:
    return {
      entity: {
        message: '',
        show: false,
        variant: ''
      },
      id: ''
    };

  case NotificationActions.UPDATE_ONE_SUCCESS:
    return {
      entity: action.notification,
      id: `${action.notification.message}-${action.notification.variant}-${action.notification.show}`
    };

  default:
    return state;
  }
};


export const getNotificationShow = (state) => {
  return state.notification.entity.show;
};

export const getNotificationMessage = (state) => state.notification.entity.message;
export const getNotificationVariant = (state) => state.notification.entity.variant;
