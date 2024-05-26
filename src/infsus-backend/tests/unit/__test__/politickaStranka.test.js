const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/testdb');
const PolitickaStranka = require('../../../models/PolitickaStranka');
const politickaStrankaController = require('../../../controllers/politickaStrankaController');

jest.mock('../../../models/PolitickaStranka');

describe('PolitickaStranka model i kontroler', () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    describe('PolitickaStranka model unit testovi', () => {
        it('treba stvoriti novu instancu politicke stranke', async () => {
            const mockPolitickaStranka = {
                imepolitičkestranke: 'HDZ',
                kratkiopisstranke: 'Konzervativna stranka',
                oznakavrstepolitičkestranke: 1,
            };

            PolitickaStranka.create.mockResolvedValue(mockPolitickaStranka);

            const politickaStranka = await PolitickaStranka.create({
                imepolitickestranke: 'HDZ',
                kratkiopisstranke: 'Konzervativna stranka',
                oznakavrstepolitickestranke: 1,
            });

            expect(politickaStranka.imepolitičkestranke).toBe('HDZ');
            expect(politickaStranka.kratkiopisstranke).toBe('Konzervativna stranka');
            expect(politickaStranka.oznakavrstepolitičkestranke).toBe(1);
        });

    });

    describe('PolitickaStranka kontroler unit testovi', () => {
        it('treba dohvatiti sve politicke stranke', async () => {
            const mockPolitickeStranke = [
                { imepolitičkestranke: 'HDZ', kratkiopisstranke: 'Konzervativna stranka', oznakavrstepolitičkestranke: 1 },
                { imepolitičkestranke: 'SDP', kratkiopisstranke: 'Socijaldemokratska stranka', oznakavrstepolitičkestranke: 2 },
            ];

            PolitickaStranka.findAll.mockResolvedValue(mockPolitickeStranke);

            const req = {};
            const res = {
                json: jest.fn(),
                status: jest.fn(),
            };

            await politickaStrankaController.getAllPolitickeStranke(req, res);

            expect(res.json).toHaveBeenCalledWith(mockPolitickeStranke);
        });

        it('treba dohvatiti politicnu stranku po imenu', async () => {
            const mockPolitickaStranka = { imepolitičkestranke: 'HDZ', kratkiopisstranke: 'Konzervativna stranka', oznakavrstepolitičkestranke: 1 };
            PolitickaStranka.findByPk.mockResolvedValue(mockPolitickaStranka);

            const req = { params: { name: 'HDZ' } };
            const res = {
                json: jest.fn(),
                status: jest.fn(),
            };

            await politickaStrankaController.getPolitickaStranka(req, res);

            expect(PolitickaStranka.findByPk).toHaveBeenCalledWith('HDZ');
            expect(res.json).toHaveBeenCalledWith(mockPolitickaStranka);
        });

        it('treba poslati 404 ako politicka stranka nije pronađena', async () => {
            PolitickaStranka.findByPk.mockResolvedValue(null);

            const req = { params: { name: 'UNKNOWN' } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await politickaStrankaController.getPolitickaStranka(req, res);

            expect(PolitickaStranka.findByPk).toHaveBeenCalledWith('UNKNOWN');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Political party not found' });
        });

        it('treba obrisati politicnu stranku', async () => {
            const deletedCount = 1;

            PolitickaStranka.destroy.mockResolvedValue(deletedCount);

            const req = { params: { imepolitickestranke: 'HDZ' } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await politickaStrankaController.deletePolitickaStranka(req, res);

            expect(PolitickaStranka.destroy).toHaveBeenCalledWith({
                where: { imepolitičkestranke: 'HDZ' },
            });
            expect(res.json).toHaveBeenCalledWith({ message: 'Politicka stranka uspjesno izbrisana.' });
        });

        it('treba poslati 404 ako politicka stranka nije pronađena za brisanje', async () => {
            PolitickaStranka.destroy.mockResolvedValue(0);

            const req = { params: { imepolitickestranke: 'UNKNOWN' } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await politickaStrankaController.deletePolitickaStranka(req, res);

            expect(PolitickaStranka.destroy).toHaveBeenCalledWith({
                where: { imepolitičkestranke: 'UNKNOWN' },
            });
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Politicka stranka ne postoji.' });
        });

        it('treba poslati 404 ako politicka stranka nije pronađena za ažuriranje', async () => {
            PolitickaStranka.findByPk.mockResolvedValue(null);

            const req = { params: { name: 'UNKNOWN' }, body: { novoIme: 'Nova HDZ', kratkiopisstranke: 'Nova kratka politika', oznakavrstepolitickestranke: 1 } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await politickaStrankaController.updatePolitickaStranka(req, res);

            expect(PolitickaStranka.findByPk).toHaveBeenCalledWith('UNKNOWN');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Politicka stranka s imenom UNKNOWN ne postoji.' });
        });

    });
});
