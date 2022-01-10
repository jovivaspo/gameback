const {Schema, model} = require('mongoose')

const VideogameSchema = new Schema({
    name:{type:String, required: true},
    description:{type:String},
    ranting: {type: Number, required:true},
    image:{
        data: Buffer,
        contentType: String
    },
    plattaform:{type:String},
    personalComment:{type:String, default:''},
    personalRating: {type:Number, default:0},
    state:{type:'Progress', default:'Not Started'},
    users:{type:Schema.Type.ObjectId,
    ref:'Users'}
})

module.exports = model('Videogames',VideogameSchema)

