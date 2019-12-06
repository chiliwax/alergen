import Sequelize, { DataTypes } from 'rn-sequelize';
import * as SQLite from "expo-sqlite";
import models from '../models';

class SequelizeHandle {
  constructor() {
    let is_ready = false;

    
    this._native_handler = new Sequelize({
      dialectModule: SQLite,
      database: "AllergenDB",
      dialectOptions: {
        version: "1.0",
        description: "Allergen's local DB"
      }
    });
    
    let promise_pool = []
    this.ready = () => is_ready ? Promise.resolve() : new Promise(resolve => promise_pool.push(resolve));
    
    this._native_handler.authenticate().then(() => {
      this.models = models.map(modelCtor => modelCtor(this._native_handler, DataTypes));
      is_ready = true;
      promise_pool.forEach(resolve => resolve());
    }, e => { throw e; });
  }

};

export default SequelizeHandle;


