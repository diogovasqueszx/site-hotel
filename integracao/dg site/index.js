import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from './routes/route.js'; // rotas externas
import hospedeRoutes from './routes/HospedeRoutes.js';
import quartoRoutes from './routes/QuartoRoutes.js';
import siteRoutes from './routes/SiteRoutes.js';
import { connectDatabase } from './config/conexao.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Caminho correto das views e public
const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

// Servir arquivos estáticos
app.use(express.static(join(__dirname, 'public')));
app.set('views', join(__dirname, '/views'));

// Rotas
app.use(siteRoutes);
app.use(hospedeRoutes);
app.use(quartoRoutes);
app.use(routes);

const port = process.env.PORT || 3001;

connectDatabase()
	.then(() => app.listen(port, () => console.log(`Servidor disponível em http://localhost:${port}`)))
	.catch((error) => {
		console.error('Não foi possível conectar ao MongoDB:', error.message);
		process.exitCode = 1;
	});
// Exporta o handler compatível com Vercel
export default app;