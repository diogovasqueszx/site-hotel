import Quarto from '../models/quarto.js';

export default class QuartoController{

    constructor(caminhoBase = 'quarto/') {
        this.caminhoBase = caminhoBase;

        this.openAdd = (req, res) => {
            res.render(`${this.caminhoBase}add`);
        };

        this.add = async (req, res) => {
            await Quarto.create({
                nome: req.body.nome,
                codigo: req.body.codigo,
                andar: req.body.andar || null,
                bloco: req.body.bloco,
                disponivel: req.body.disponivel === 'true'
            });
            res.redirect(`/${this.caminhoBase}lst`);
        };

        this.list = async (req, res) => {
            const resultado = await Quarto.find({}).sort({ codigo: 1 });
            res.render(`${this.caminhoBase}lst`, { Quartos: resultado });
        };

        this.openEdt = async (req, res) => {
            const quarto = await Quarto.findById(req.params.id);
            if (!quarto) return res.sendStatus(404);
            res.render(`${this.caminhoBase}edt`, { Quarto: quarto });
        };

        this.edt = async (req, res) => {
            await Quarto.findByIdAndUpdate(req.params.id, {
                nome: req.body.nome,
                codigo: req.body.codigo,
                andar: req.body.andar || null,
                bloco: req.body.bloco,
                disponivel: req.body.disponivel === 'true'
            }, { runValidators: true });
            res.redirect(`/${this.caminhoBase}lst`);
        };

        this.del = async (req, res) => {
            await Quarto.findByIdAndDelete(req.params.id);
            res.redirect(`/${this.caminhoBase}lst`);
        };
    }
}