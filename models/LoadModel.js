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
    fuel_charge:{
        type:Map,
        of: String,
        required:true
    },
    other_bills:{
        type:Map,
        of: String,
        required:true
    }
});


module.exports = model('Load', loadModel );