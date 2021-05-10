const pg = require("pg");
const ClientClass = pg.Client;
const pgUrl =
  "postgres://gfmiehkf:u4iQoP26bxF7jq3s81L-ugNGy03egkxB@queenie.db.elephantsql.com:5432/gfmiehkf";
const client = new ClientClass(pgUrl);

async function connect(client) {
  try {
    await client.connect();
    console.log(`Client connected.`);

    const { rows } = await client.query(
      "CREATE TABLE RESTAURANTS (id serial primary key, name text)"
    );
    console.table(rows);
    await client.end();
  } catch (ex) {
    console.log("Some error" + ex);
  } finally {
    await client.end();
  }
}

connect(client);
