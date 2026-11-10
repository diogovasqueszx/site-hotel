import mongoose from 'mongoose';

const hospedeSchema = new mongoose.Schema({
    nome: { type: String, required: true, trim: true },
    codigoQuarto: { type: String, required: true, trim: true },
    tipoQuarto: { type: String, required: true, trim: true }
});

export default mongoose.model('Hospede', hospedeSchema);