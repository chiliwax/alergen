import * as SQLite from 'expo-sqlite';


const database_name = "Reactoffline.db";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;

const db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size)

export default class Database {

    state = {
        loading: true, 
        dataTodo: [], 
        search: '' 
    }

    async InitDb(){
        await db.transaction(tx => {
            tx.executeSql(
                "create table if not exists items (id integer primary key not null, done int, value text);", [], () => console.log("creeeated"), (a, b) => console.log(b)
            );
        });
        this.state.loading = false
    }

    async getdb() {
        this.state.loading = true
        var temp = [];
        return new Promise((resolve, reject)=>
         db.transaction( tx => {
            tx.executeSql("select * from items", [], (tx, results) => {
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));
                }
                this.state.loading = false
                resolve({results})
            })
        }
        ))
    }
    remove(index) {
        db.transaction(
            tx => {
                tx.executeSql("delete from items where id = ?;", [index]);
                tx.executeSql("select * from items", [], (_, { rows }) =>
                    console.log(JSON.stringify(rows)), () => console.log("error")
                );
            }
        )
    }
    clear() {
        db.transaction(
            tx => {
                tx.executeSql("delete from items");
                tx.executeSql("select * from items", [], (_, { rows }) =>
                    console.log(JSON.stringify(rows)), () => console.log("error")
                );
            }
        )
    }

    add(text) {
        // is text empty?
        if (text === null || text === "") {
            console.log('unable to add data to db')
            return false;
        }

        db.transaction(
            tx => {
                tx.executeSql("insert into items (done, value) values (0, ?)", [text]);
                tx.executeSql("select * from items", [], (_, { rows }) =>
                    console.log(JSON.stringify(rows)), () => console.log("error")
                );
            },
            null,
            this.update
        );
        this.fetchData(text)
    }


    fetchData(search) {
        var query = "SELECT * FROM items WHERE value LIKE '%" + search + "%'";
        var params = [];
        db.transaction((tx) => {
            tx.executeSql(query, params, (tx, results) => {
                console.log(results);
                if (results.rows._array.length > 0) {
                    this.state.dataTodo = results.rows._array
                }
            }, function (tx, err) {
                Alert.alert("Welcome");
            });
        });
    }

}