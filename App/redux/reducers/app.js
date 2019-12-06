import update from 'immutability-helper';
import action_types from '../../constants/action_types';
import extend_update from '../../helpers/extend_update';

extend_update(update);

const app = {
  [action_types.ON_DB_OPENED]: (state, payload) => update(state, {
    app: {
      sequelize_instance: { $set: payload.sequelize },
    },
  }),
};

export default app;