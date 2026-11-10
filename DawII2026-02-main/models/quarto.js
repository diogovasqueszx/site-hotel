import mongoose from 'mongoose';

const quartoSchema = new mongoose.Schema({
    nome: { type: String, required: true, trim: true },
    codigo: { type: String, required: true, trim: true, unique: true },
    andar: { type: Number, min: 0, default: null },
    bloco: { type: String, trim: true, default: '' },
    disponivel: { type: Boolean, default: true }
});

export default mongoose.model('Quarto', quartoSchema);