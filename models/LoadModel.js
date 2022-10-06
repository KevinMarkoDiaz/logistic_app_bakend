const {Schema, model  } = require('mongoose');

const loadModel = Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },    
    loading_place:{
        type:String,
        required:true
    },
    loading_date:{
        type:Date,
        required:true
    },
    unload_place:{
        type:String,
        required:true
    },
    unload_date:{
        type:Date,
        required:true
    },
    cargo_description:{
        type:String,
        required:true
    },
    fuel_charge:[{
        name: String,
        values: Schema.Types.Mixed
    }],
    other_bills:[{
        name: String,
        values: Schema.Types.Mixed
    }]
});


module.exports = model('Load', loadModel );