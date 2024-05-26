const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/testdb');
const VrstaPolitickeStranke = require('../../../models/VrstaPolitickeStranke');
const vrstaPolitickeStrankeController = require('../../../controllers/vrstaPolitickeStrankeController');

jest.mock('../../../models/VrstaPolitickeStranke');

describe('VrstaPolitickeStranke model i kontroler', () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    describe('Model unit testovi', () => {
        it('treba stvoriti novu instancu vrste politicke stranke', async () => {
            const mockVrstaPolitickeStranke = {
                oznakavrstepolitickestranke: 1,
                imevrstepolitickestranke: 'Nova Vrsta Stranke',
            };

            VrstaPolitickeStranke.create.mockResolvedValue(mockVrstaPolitickeStranke);

            const vrstaPolitickeStranke = await VrstaPolitickeStranke.create({
                oznakavrstepolitickestranke: 1,
                imevrstepolitickestranke: 'Nova Vrsta Stranke',
            });

            expect(vrstaPolitickeStranke.oznakavrstepolitickestranke).toBe(1);
            expect(vrstaPolitickeStranke.imevrstepolitickestranke).toBe('Nova Vrsta Stranke');
        });

    });

    describe('Kontroler unit testovi', () => {
        it('treba dohvatiti sve vrste politicke stranke', async () => {
            const mockVrstePolitickeStranke = [
                { oznakavrstepolitickestranke: 1, imevrstepolitickestranke: 'Vrsta 1' },
                { oznakavrstepolitickestranke: 2, imevrstepolitickestranke: 'Vrsta 2' },
            ];

            VrstaPolitickeStranke.findAll.mockResolvedValue(mockVrstePolitickeStranke);

            const req = {};
            const res = {
                json: jest.fn(),
                status: jest.fn(),
            };

            await vrstaPolitickeStrankeController.getAllVrstePolitickeStranke(req, res);

            expect(res.json).toHaveBeenCalledWith(mockVrstePolitickeStranke);
        });
    });

});
