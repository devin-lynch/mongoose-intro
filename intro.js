const db = require('./models')
const { update } = require('./models/Drink')

const drinkCRUD = async () => {
    try {
        // // CREATE 
        // // way number 1
        // // use the model as a constructor (not async)
        // const newDrink = new db.Drink({
        //     name: 'Chocolate Milk',
        //     rating: 10
        // })
        // // save the result (is async)
        // await newDrink.save() // puts it in the db

        // // way number 2
        // // directly create a new entry to the db
        // const secondDrink = await db.Drink.create({
        //     name: 'Strawberry Milk',
        //     rating: 0
        // })
        // console.log(secondDrink)

        // READ
        // find many (.find({ optional search query })) -- returns array
        const allDrinks = await db.Drink.find({})
        // console.log(allDrinks)
        allDrinks.forEach(drink => console.log(`drink ${drink.name} is rated ${drink.rating}`))

        // // find one (.findOne({ search query })) -- returns object
        // const chocoDrink = await db.Drink.findOne({
        //     name: 'Chocolate Milk'
        // })
        // console.log(`found the choco drink: ${chocoDrink.name} is rated ${chocoDrink.rating}`)

        // find by id (.findById('mongo id hash'))
        const strawberryMilk = await db.Drink.findById('633c6c37fe0dc902cef96f59')
        console.log(`blech: ${strawberryMilk.name} is rated ${strawberryMilk.rating}`)

        // UPDATING
        // find an instance and update it and save it
        // set a value of a model instance
        strawberryMilk.rating = -10
        await strawberryMilk.save()

        // search for something in the database and update it directly
        // .findOneAndUpdate({ query to search for }, { what to update }, { config options })
        // config option of new: true will return the updated instance from the database
        const updatedMilk = await db.Drink.findOneAndUpdate({ name: 'Chocolate Milk' }, { name: 'Choco Milk', rating: 11 }, { new: true })
        console.log(updatedMilk)

        // upsert (insert or update)
        // config option -- upsert: true
        const bananaMilk = await db.Drink.findOneAndUpdate({ name: 'Banana Milk' }, { rating: 6 }, { new: true, upsert: true })
        console.log(`banana milk has been upserted: ${bananaMilk.name} is rated ${bananaMilk.rating}`)

        // DESTROYING
        // findOneAndRemove({ search query })
        const removedBanana = await db.Drink.findOneAndRemove({ name: 'Banana Milk' })
        console.log(`removed this db entry: ${removedBanana.name}`)

        // findByIdAndDelete('mongo id string')
        const banishedMilk = await db.Drink.findByIdAndDelete('633c6c37fe0dc902cef96f59')
        console.log(`banished milk:`, banishedMilk)

    } catch(err) {
        console.warn(err)
    }
}

drinkCRUD()