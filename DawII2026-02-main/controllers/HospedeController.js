import Hospede from '../models/hospede.js';

export default class HospedeController{

    constructor(caminhoBase = 'hospede/') {
        this.caminhoBase = caminhoBase;

        this.openAdd = (req, res) => {
            res.render(`${this.caminhoBase}add`);
        };

        this.add = async (req, res) => {
            await Hospede.create({
                nome: req.body.nome,
                codigoQuarto: req.body.codigoQuarto,
                tipoQuarto: req.body.tipoQuarto
            });
            res.redirect(`/${this.caminhoBase}lst`);
        };

        this.list = async (req, res) => {
            const resultado = await Hospede.find({}).sort({ nome: 1 });
            res.render(`${this.caminhoBase}lst`, { Hospedes: resultado });
        };

        this.find = async (req, res) => {
            const filtro = (req.body.filtro || '').trim();
            const resultado = await Hospede.find({
                nome: { $regex: filtro, $options: 'i' }
            }).sort({ nome: 1 });
            res.render(`${this.caminhoBase}lst`, { Hospedes: resultado });
        };

        this.openEdt = async (req, res) => {
            const hospede = await Hospede.findById(req.params.id);
            if (!hospede) return res.sendStatus(404);
            res.render(`${this.caminhoBase}edt`, { Hospede: hospede });
        };

        this.edt = async (req, res) => {
            await Hospede.findByIdAndUpdate(req.params.id, {
                nome: req.body.nome,
                codigoQuarto: req.body.codigoQuarto,
                tipoQuarto: req.body.tipoQuarto
            }, { runValidators: true });
            res.redirect(`/${this.caminhoBase}lst`);
        };

        this.del = async (req, res) => {
            await Hospede.findByIdAndDelete(req.params.id);
            res.redirect(`/${this.caminhoBase}lst`);
        };
    }
}