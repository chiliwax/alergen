export default (sequelize, data_types) => {
  const history_entry = sequelize.define('sequelize_entry', {
    title: {
      type: data_types.STRING,
      allowNull: false,
    },
    picture: {
      type: data_types.STRING,
      allowNull: true,
    },
    sub: {
      type: data_types.STRING,
      allowNull: true,
    }
  });

  return history_entry;
}