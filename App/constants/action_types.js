export class action_enum {
  constructor(schema) {
    if (typeof schema !== 'object') { throw new Error('action\'s schema must be an object') };
    Object.keys(schema).forEach((key) => (this[key] = (new Function(`class enum_case_${key} {}; return new enum_case_${key}`))()));
  }
}


const action_types = new action_enum({
  ON_DB_OPENED:null,
});

export default action_types;