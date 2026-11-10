import mongoose from "mongoose";

const url = "mongodb+srv://diogo:1234@cluster0.su1a6aa.mongodb.net/";

export async function connectDatabase() {
    try {
        await mongoose.connect(url);
        console.log("MongoDB conectado com sucesso!");
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
        throw error;
    }
}