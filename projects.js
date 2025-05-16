import sqlite from 'sqlite3';
//const dbPath = './database.db'; // Path to the database file
const dbPath = process.env.dbFile || "./database.db";

export default {
    
    async GetAllProjects(param) {
        // Connect to the database in a physical file
        const db = new sqlite.Database(dbPath);
        console.log("dbPath","File: " + dbPath);
        console.log("process.env.dbFile", process.env.dbFile);
        console.error("dbPath", "File: " + dbPath);
        console.error("process.env.dbFile", process.env.dbFile);
        
        let arrayProjects = [];
        
        // Database operations
        //db.serialize(() => {
            // Create a table
            //db.run("CREATE TABLE lorem (info TEXT)");

            // Insert data into the table
            //const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
            //for (let i = 0; i < 10; i++) {
            //    stmt.run("Ipsum " + i);
            //}
            //stmt.finalize();

            let rows = await db_all("select projectId, clientId, clientName, title, workDescription, \
                                     qualifications, contactEmail, contactPhone, estimatedWorkdays, \
                                     statusId, dateCreated from projects order by projectId", db);
            for(var item in rows){
                arrayProjects.push({ projectId: rows[item].projectId, clientName: rows[item].clientName,
                                     title: rows[item].title, workDescription: rows[item].workDescription,
                                     qualifications: rows[item].qualifications, contactEmail: rows[item].contactEmail,
                                     statusId: rows[item].statusId, dateCreated: rows[item].dateCreated,
                                     estimatedWorkdays: rows[item].estimatedWorkdays
                 });    
            }
            return {success: true, message: "OK", projects: arrayProjects};
            
            // Query data from the table
            /*db.all("SELECT rowid AS id, info FROM lorem", (err, rows) => {
                //if (err) reject(err);
                console.log("Rows", rows.length);
                for(var item in rows){
                    arrayProjects.push({ id: rows[item].id, name: rows[item].info });    
                }
                return {success: true, message: "OK", data: arrayProjects};
            });*/
            
            
            //let dbResult = db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
            //    arrayProjects.push({ id: row.id, name: row.info });
                //console.log("arrayProjects2b", arrayProjects);
                //console.log(row.id + ": " + row.info);
            //});
            //console.log("dbResult");

            //console.log("arrayProjects2", arrayProjects);
            //return {success: true, message: "OK", data: arrayProjects};
        //});

        // Close the connection when you're done
        db.close();
        
        console.log("DbClosed");
    }, 

    async InsertProject(clientName, title, workDescription) {
        try{
            // Connect to the database in a physical file
            const db = new sqlite.Database(dbPath);

            try {
                let dbInsert = await execute(db, "insert into projects(clientName, title, workDescription) \
                                                  values(?,?,?)",
                                                 [clientName, title, workDescription]);
                //console.log("dbInsert", dbInsert);
            } catch (err) {
                console.log(err);
            } finally {
                // Close the connection when you're done
                db.close();
            }

            return {success: true, message: "New project created." }; 
        }
        catch(ex){
            return {success: false, message: "Insert project failed." };    
        }
    }

}

async function db_all(query, db){
    return new Promise(function(resolve,reject){
        db.all(query, function(err,rows){
           if(err){return reject(err);}
           resolve(rows);
         });
    });
}

const execute = async (db, sql, params = []) => {
  if (params && params.length > 0) {
    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) 
            reject(err);
        
        //console.log("DbInsertId-1", db.lastInsertRowId);

        resolve();
      });
    });
  }
  return new Promise((resolve, reject) => {
    db.exec(sql, (err) => {
      if (err) reject(err);
      //console.log("DbInsertId-2", db.lastInsertRowId);
      resolve();
    });
  });
};