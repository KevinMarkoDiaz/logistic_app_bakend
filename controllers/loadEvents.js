const { response } = require('express');
const Load = require('../models/LoadModel');

const getLoads = async (req, res = response) => {

    const loads = await Load.find().populate('user', 'name')
    res.status(200).json({
        ok: true,
        loads
    })
};
const createLoad = async (req, res = response) => {

    const load = new Load(req.body)
    try {
        load.user = req.uid
        const loadDB = await load.save();
        res.status(401).json({
            ok: true,
            load: loadDB
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "No se pudo crear el viaje"
        })
    }


};
const updateLoad = async (req, res = response) => {

    const loadId = req.params.id;
    const uid = req.uid;
    try {
        const load = await Load.findById(loadId);
        if (!load) {
            return res.status(404).json({
                ok: false,
                msg: 'Carga no existe con este id'
            })
        }

        if (load.user.toString() !== uid) {
            return res.status(404).json({
                ok: false,
                msg: 'No tiene permisos para editar esta carga'
            })
        }

        const newLoad = {
            ...req.body,
            user: uid
        };
        const loadUpdated = await Load.findByIdAndUpdate(loadId, newLoad, { new: true });

        return res.status(200).json({
            ok: true,
            loadUpdated
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }



};
const deleteLoad = async (req, res = response) => {
    const loadId = req.params.id;
    const uid = req.uid;
    try {
        const load = await Load.findById(loadId);
        if (!load) {
            return res.status(404).json({
                ok: false,
                msg: 'Carga no existe con este id'
            })
        }

        if (load.user.toString() !== uid) {
            return res.status(404).json({
                ok: false,
                msg: 'No tiene permisos para editar esta carga'
            })
        }

        await Load.findByIdAndDelete(loadId)

        return res.status(200).json({ ok: true })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


};

module.exports = {
    getLoads,
    createLoad,
    updateLoad,
    deleteLoad
}