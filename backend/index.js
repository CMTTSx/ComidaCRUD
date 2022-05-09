//Importar Express
const express = require('express');

//Importar mongooose
const mongoose = require('mongoose');
//Inicializar Aplicação
const app = express();

const cors = require('cors');

//Modelos
const FoodModel = require('./models/Food')

//Middlewares
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://csmUser:pass00@cluster0.knhtp.mongodb.net/food?retryWrites=true&w=majority", {
    useNewUrlParser: true,
});


// INSERT 
app.post('/insert', async (req, res) => {
    
    
    const foodName = req.body.foodName;
    const days = req.body.days;

    const food = new FoodModel({ foodName: foodName, daysSinceIAte: days });

    try {
        await food.save();
        res.send('Informação salva!')
    } catch (err) {
        console.log(err)
    }
});


//READ
app.get('/read', async (req, res) => {
    FoodModel.find({}, (err, result) => {
        if (err) {
            res.send(err)
        }

        res.send(result)

    })
});

//Update
app.put('/update', async (req, res) => {
    
   const newFoodName = req.body.newFoodName;
   const id = req.body.id;

   try {
    await FoodModel.findById(id, (err, updatedFood) => {
        updatedFood.foodName = newFoodName;
        updatedFood.save();
        res.send('Informação editada!')
    });
} catch (err) {
    console.log(err)
}
});

//delete
app.delete('/delete/:id', async (req, res) => {
   const id = req.params.id;
   
   await FoodModel.findByIdAndRemove(id).exec();
   res.send('Deletado com sucesso!')
})


// Ouvir portas
app.listen(3001, () => {
    console.log('Servidor em funcionamento na porta 3001!')
});