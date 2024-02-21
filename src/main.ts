import express from "express"
import { db, firestore} from "../banco de dados/firebase";

const app = express();


app.use(express.json())

app.get("/", (req, res) =>  {
    res.send('Bem vindo a minha primeira API')
})

app.post('/Formulario', async (req, res)=> {
    const nome = req.body.nome 
    const telefone = req.body.telefone
    const email = req.body.email
    const descricao = req.body.descricao

    try {
        const docRef = await firestore.addDoc
        (firestore.collection(db, 'Formulario'),
        {
            nome: nome,
            telefone:telefone,
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
    const usuarios = await firestore.getDocs(firestore.collection(db, 'formulario'))

    const usuariosLista = usuarios.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }))

    res.send(usuariosLista)
   } catch (e) {
    console.log("Erro ao listar formulario:"  + e)

    res.status(500).send("Erro ao listar formulario:" + e)
   }
})

app.put('/atualizaFormulario/:id', async (req, res)=> {
    const id = req.params.id
    const nome = req.body.nome 

    try {
        await firestore.updateDoc(firestore.doc(db, 'formulario', id), {
            nome: nome,
        })
        res.send('Formulario atualizado com sucesso! ')
    } catch (e) {
        console.log('Erro ao atualizar Formulario:' + e)

        res.status(500).send('Erro ao atualizar Formulario:' + e)
    }
})

app.delete('/deletarFormulario/:id', async (req, res) =>{
    const id = req.params.id

    try {
        await firestore.deleteDoc(firestore.doc(db,'formulario', id))

        res.send('Formulario deletado com sucesso!')
    } catch (e) {
        console.log('Erro ao deletar formulario: ' +e)

        res.status(500).send('Erro ao deletar formulario: ' +e)
    }
})

app.listen(3000,function () {
    console.log("Serviço rodando na porta http://localhost:3000");
})
