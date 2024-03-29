import express from "express"
import { db, firestore} from "../banco de dados/firebase";
import cors from "cors"

const app = express();



app.use(express.json())
app.use(express.urlencoded({extended: true }));
app.use(cors({
"origin": "*",
"methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
}))



app.get("/", (req, res) =>  {
    res.send('Bem vindo a minha primeira API')
})

app.post('/Formulario', async (req, res)=> {
    const nome = req.body.nome 
    const senha = req.body.senha
    const email = req.body.email
    const descricao = req.body.descricao

    try {
        const docRef = await firestore.addDoc
        (firestore.collection(db, 'Formulario'),
        {
            nome: nome,
            senha:senha,
            email:email,
            descricao: descricao
        })
         res.send("Resposta enviada com sucesso:" + docRef.id)
        
    }catch (e){
        console.log(e)

        
        res.status(500).send(e)
    }
} )

app.get('/listarFormulario',async (req,res) =>{
   try {
    const formulario = await firestore.getDocs(firestore.collection(db, 'Formulario'))

    const formularioLista = formulario.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }))

    res.send(formularioLista)
   } catch (e) {
    console.log("Erro ao listar formulario:"  + e)

    res.status(500).send("Erro ao listar formulario:" + e)
   }
})

app.put('/atualizaFormulario/:id', async (req, res)=> {
    const id = req.params.id
    const nome = req.body.nome 

    try {
        await firestore.updateDoc(firestore.doc(db, 'Formulario', id), {
            nome: nome,
        })
        res.send('Formulario atualizado com sucesso! ')
    } catch (e) {
        console.log('Erro ao atualizar Formulario:' + e)

        res.status(500).send('Erro ao atualizar formulario:' + e)
    }
})

app.delete('/deletaFormulario/:id', async (req, res) =>{
    const id = req.params.id

    try {
        await firestore.deleteDoc(firestore.doc(db,'Formulario', id))

        res.send('Formulario deletado com sucesso!')
    } catch (e) {
        console.log('Erro ao deletar Formulario: ' +e)

        res.status(500).send('Erro ao deletar Formulario: ' +e)
    }
})

app.listen(3000,function () {
    console.log("Serviço rodando na porta http://localhost:3000");
})
