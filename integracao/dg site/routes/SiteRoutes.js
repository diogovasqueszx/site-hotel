import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const router = express.Router();
import SiteController from '../controllers/SiteController.js'
const controle = new SiteController();

const caminhobase = 'site/'
const siteViews = join(dirname(fileURLToPath(import.meta.url)), '../views/site');

const servePage = (section, pages) => (req, res, next) => {
	const page = pages[req.params.page];
	if (!page) return res.sendStatus(404);
	res.type('html').sendFile(join(siteViews, section, page), next);
};

router.get('/' + caminhobase, controle.home)
router.get('/' + caminhobase + 'login', controle.login)
router.post('/' + caminhobase + 'login', controle.login)
router.get('/index.html', (req, res) => res.redirect('/site/'));
router.get('/hospedes/:page', servePage('hospedes', {
	'index.html': 'index.html',
	'ana-oliveira.html': 'ana-oliveira.html',
	'bruno-martins.html': 'bruno-martins.html',
	'carla-souza.html': 'carla-souza.html',
	'diego-ferreira.html': 'diego-ferreira.html',
	'elisa-costa.html': 'elisa-costa.html'
}));
router.get('/quartos/:page', servePage('quartos', {
	'index.html': 'index.ejs',
	'quarto-base.html': 'quarto-base.html',
	'quarto-duplo.html': 'quarto-duplo.html',
	'quarto-luxo.html': 'quarto-luxo.html',
	'quarto-slim.html': 'quarto-slim.html',
	'suite-presidencial.html': 'suite-presidencial.html'
}));

export default router