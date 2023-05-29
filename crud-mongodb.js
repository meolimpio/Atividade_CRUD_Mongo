const { MongoClient } = require("mongodb");

const url = "mongodb://0.0.0.0:27017";
const client = new MongoClient(url);
const dbName = "tree-app";

const main = async () => 
{
  try 
  {
    await client.connect();
    console.log("Conectado com sucesso");
    const db = client.db(dbName);
    const collection = db.collection("trees");

    //Operações CREATE do CRUD

    console.log("\n------Insert One --------------\n");

    const insertOne = await collection.insertOne({
      species: "Mangifera indica",
      family: "Anacardiaceae",
      height: 10,
    });

    console.log("Árvore Inserida: ", insertOne);

    console.log("\n----------Insert Many-----------\n");

    //Inserindo árvores
    const insertMany = await collection.insertMany([
      {
        species: "Pinus taeda",
        family: "Pinaceae",
        height: 20,
      },

      {
        species: "Acacia mangium",
        family: "Fabaceae",
        height: 15,
      },

      {
        species: "Eucalyptus grandis",
        family: "Myrtaceae",
        height: 25,
      },

      {
        species: "Ficus benjamina",
        family: "Moraceae",
        height: 12,
      },
    ]);

    console.log("Árvore Inseridas: ", insertMany);
    //Operações READ do CRUD

    //Consultar todas as árvores da coleção

    console.log("\n----------Find----------------\n");

    const findAll = await collection.find({}).toArray();

    console.log("árvore encontrados: ", findAll);

    console.log("\n----------------------------\n");

    //Consultar todas as árvores da coleção que têm altura superior a 15 metros
    const filterTallTrees = await collection
      .find({ height: { $gt: 15 } })
      .toArray();

    console.log("Árvores encontradas: ", filterTallTrees);

    console.log("\n----------------------------\n");

    //Consultar todas as árvores da coleção que pertencem à família "Fabaceae"
    const filterFabaceae = await collection
      .find({ family: "Fabaceae" })
      .toArray();

    console.log("Árvores encontradas: ", filterFabaceae);

    //Operações UPDATE do CRUD
    console.log("\n--------Update One--------------------\n");
    
    //Atualizar apenas um documento
    const updateDoc = await collection.updateOne(
      { species: "Mangifera indica" },
      { $set: { height: 12 } }
    );
    
    console.log("Árvore atualizada: ", updateDoc);
    
    //Atualizar várias árvores
    console.log("\n--------Update Many--------------------\n");
    
    const updateDocs = await collection.updateMany(
      { height: { $gt: 20 } },
      { $set: { height: 18 } }
    );
    
    console.log("Árvores Atualizadas: ", updateDocs);

    //Operações de DELETE do CRUD
    console.log("\n----------Delete One------------------\n");

    //Deletar apenas uma árvore
    const deleteDoc = await collection.deleteOne({ species: "Pinus taeda" });

    console.log("Árvore Deletada: ", deleteDoc.deletedCount);

    //Deletar vários árvores

    console.log("\n----------Delete Many------------------\n");

    const deleteDocs = await collection.deleteMany({ height: { $lt: 15 } });

    console.log("Árvores deletadas: ", deleteDocs.deletedCount);
  } 

  catch (e)
  {
    console.error(e);
  }
};

main();