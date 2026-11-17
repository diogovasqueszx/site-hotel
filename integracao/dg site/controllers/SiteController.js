
import Quarto from '../models/quarto.js';

 export default class SiteController {
 
    constructor() {
        this.home = async (req, res) => {
          res.render('site/index')
        };

        this.login = (req, res) => {
          
          res.render('site/login');
        };

        this.quartos = async (req, res) => {
          const quartos = await Quarto.find({}).limit(3);
          res.render('site/quartos/index', { quartos });
        };

    }
 }
