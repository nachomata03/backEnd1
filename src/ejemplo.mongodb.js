use("miDataBase");
db.createCollection("users");

const alumnos = [
        { name: "Pedro", lastname: "Perez", age: 20, sex: "M" },
        { name: "Maria", lastname: "Gomez", age: 25, sex: "F" },
        { name: "Luis", lastname: "Lopez",  age: 30, sex: "M" },
        { name: "Agustina", lastname: "Herrera",  age: 27, sex: "F" },
        { name: "Diego", lastname: "Garcia",  age: 35, sex: "M" },
        { name: "Pablo", lastname: "Prez",  age: 55, sex: "M" }
]

db.users.insertMany(alumnos);

db.users.insertOne({ name: "Javier", lastname: "Garcia",  age: 35, sex: "M" });
db.users.removeOne({ name: "Javier", lastname: "Garcia",  age: 35, sex: "M" }); 

db.users.remove({name: "Javier"}); //db.users.remove({}); borra todo
db.users.deleteMany({});
db.users.deleteOne({name: "Javier"});

db.users.find();

db.users.find({sex: "M"}); 

db.users.countDocuments(); //devuelve la cant de documentos que hay

db.users.countDocuments({sex: "M"}); //devuelve la cant de documentos que hay con el sexo masculino

db.users.find().sort({age: -1}); //-1 descendente, 1 ascendente o asc y desc

db.users.find().sort({age: "asc"}).limit(2); //limita los resultados a dos

db.users.find().sort({age: "asc"}).skip(2); //salta los dos primeros resultados

db.users.find().sort({age: "asc"}).skip(2).limit(2); //no importa el orden (skip-limit o limit-skip), sa    lta los dos primeros resultados y limita a dos

db.users.find({age: {$gt: 30}}); //devuelve los que tienen mas de 30 años
db.users.find({age: {$lt: 30}}); //devuelve los que tienen menos de 30 años
db.users.find({age: {$gte: 30, $lt: 40}}); //devuelve los que tienen 30 años o mas

db.users.updateOne({name: "Luis"}, {$set: {name: "Hugo"}});
db.users.findOne({name: "Hugo"});

db.users.updateMany({name: "Luis"}, {$set: {name: "Hugo"}});
db.users.find({name: "Hugo"});

db.users.find({$or: [ { name: ["Diego"] }, {age:55} ]}); //devuelve los que tienen el nombre Diego o tienen 30 años

