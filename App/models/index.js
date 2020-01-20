import historysmodels from './history';

function _insert(something) {
  if (Array.isArray(something)) {
    this.push(...something);
  } else {
    this.push(something);
  }
}

const models = [];

const insert = _insert.bind(models);

insert(historysmodels);

export default models;