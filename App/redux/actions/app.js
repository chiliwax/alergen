import action_types from '../../constants/action_types';

console.log(action_types, action_types.ON_DB_OPENED);

const app = {
  on_db_opened: (sequelize) => ({
    type: action_types.ON_DB_OPENED,
    payload: {
      sequelize,
    },
  }),
};

export default app;