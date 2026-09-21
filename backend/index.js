const express=require("express");
const MongoClient=require("mongodb").MongoClient;
var cors=require("cors")
const bodyParser=require("body-parser")

const app=express();
let db;
const PORT=3000;
app.use(cors());
app.use(bodyParser.json());

async function connectToDB(){
	let client=new MongoClient("mongodb://127.0.0.1:27017/ejemplo421");
	await client.connect();
	db=client.db();
	console.log("conectado a la base de datos");
} 

async function getList(coleccion, req, res){
	let sortBy=req.query._sort;
	let sortOrder=req.query._order=="ASC"?1:-1;
	let inicio=Number(req.query._start);
	let fin=Number(req.query._end);
	let sorter={}
	sorter[sortBy]=sortOrder;
	let data=await db.collection(coleccion).find({}).sort(sorter).project({_id:0}).toArray();
	res.set("Access-Control-Expose-Headers", "X-Total-Count");
	res.set("X-Total-Count", data.length);
	data=data.slice(inicio,fin);
	res.json(data);
}

async function getMany(coleccion, req, res){
	let data=[]
	for(let index=0; index<req.query.id.length; index++){
		let dataParcial=await db.collection(coleccion).find({id: Number(req.query.id[index])}).project({_id:0}).toArray();
		data=await data.contact(dataParcial)
	}
	res.json(data);
}

async function getManyReference(coleccion, req, res){
	let data=await db.collection(coleccion).find(req.query).project({_id:0}).toArray();
	res.set("Access-Control-Expose-Headers", "X-Total-Count");
	res.set("X-Total-Count", data.length);
	res.json(data);
}
app.get("/Productos", async (req, res)=>{
	if("_sort" in req.query){//getList
		await getList("productos", req,res);
	}else if("id" in req.query){
		await getMany("productos", req,res)
	}else{	
		await getManyReference("productos", req,res);
	}
});

async function deleteOne(coleccion, id, req, res){
	let data=await db.collection(coleccion).deleteOne({"id": id});
	res.json(data);
}

app.delete("/Productos/:id", async (req, res)=>{
	await deleteOne("productos", Number(req.params.id), req, res);
});

async function getOne(coleccion, id, req, res){
	let data=await db.collection(coleccion).find({"id": id}).project({_id:0}).toArray();
	res.json(data[0]);
}

app.get("/Productos/:id", async (req, res)=>{
	await getOne("productos", Number(req.params.id), req, res);
});


async function updateData(coleccion,  req, res){
	valores=req.body;
	valores["id"]=Number(valores["id"]);
	let data=await db.collection(coleccion).updateOne({"id":valores["id"]},{"$set":valores});
	data=await db.collection(coleccion).find({"id": valores["id"]}).project({_id:0}).toArray();
	res.json(data[0]);

}

app.put("/Productos/:id", async (req, res)=>{
	await updateData("productos", req, res)
})

app.listen(PORT,async ()=>{
	await connectToDB();
	console.log("aplicacion iniciada en puerto 3000")
});
