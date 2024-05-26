const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/testdb');
const IzbornaJedinica = require('../../../models/IzbornaJedinica');
const izbornaJedinicaController = require('../../../controllers/izbornaJedinicaController');

jest.mock('../../../models/IzbornaJedinica');

describe('IzbornaJedinica model i controller', () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    describe('IzbornaJedinica model unit testovi', () => {
        it('treba stvoriti novu instancu izborne jedinice', async () => {
            const mockIzbornaJedinica = {
                rednibrojizbjed: 1,
                opis: 'Opis izborne jedinice',
                brojbirača: 1000,
            };

            IzbornaJedinica.create.mockResolvedValue(mockIzbornaJedinica);

            const izbornaJedinica = await IzbornaJedinica.create({
                rednibrojizbjed: 1,
                opis: 'Opis izborne jedinice',
                brojbirača: 1000,
            });

            expect(izbornaJedinica.rednibrojizbjed).toBe(1);
            expect(izbornaJedinica.opis).toBe('Opis izborne jedinice');
            expect(izbornaJedinica.brojbirača).toBe(1000);
        });
    });

    describe('IzbornaJedinica controller unit testovi', () => {
        it('treba dohvatiti sve izborne jedinice', async () => {
            const mockIzborneJedinice = [
                { rednibrojizbjed: 1, opis: 'Opis 1', brojbirača: 1000 },
                { rednibrojizbjed: 2, opis: 'Opis 2', brojbirača: 1500 },
            ];

            IzbornaJedinica.findAll.mockResolvedValue(mockIzborneJedinice);

            const req = {};
            const res = {
                json: jest.fn(),
                status: jest.fn(),
            };

            await izbornaJedinicaController.getAllIzborneJedinice(req, res);

            expect(res.json).toHaveBeenCalledWith(mockIzborneJedinice);
        });

        it('treba dohvatiti izbornu jedinicu po id-u', async () => {
            const mockIzbornaJedinica = { rednibrojizbjed: 1, opis: 'Opis 1', brojbirača: 1000 };
            IzbornaJedinica.findByPk.mockResolvedValue(mockIzbornaJedinica);

            const req = { params: { id: 1 } };
            const res = {
                json: jest.fn(),
                status: jest.fn(),
            };

            await izbornaJedinicaController.getIzbornaJedinica(req, res);

            expect(IzbornaJedinica.findByPk).toHaveBeenCalledWith(1);
            expect(res.json).toHaveBeenCalledWith(mockIzbornaJedinica);
        });

        it('treba obrisati izbornu jedinicu', async () => {
            const deletedCount = 1;

            IzbornaJedinica.destroy.mockResolvedValue(deletedCount);

            const req = { params: { rednibrojizbjed: 1 } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
    
            await izbornaJedinicaController.deleteIzbornaJedinica(req, res);
    
            expect(IzbornaJedinica.destroy).toHaveBeenCalledWith({
                where: { rednibrojizbjed: 1 },
            });
            expect(res.json).toHaveBeenCalledWith({ message: 'Izborna jedinica deleted successfully' });
        });
    
        it('treba poslati 404 ako izborna jedinica nije pronađena za brisanje', async () => {
            IzbornaJedinica.destroy.mockResolvedValue(0);
    
            const req = { params: { rednibrojizbjed: 999 } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
    
            await izbornaJedinicaController.deleteIzbornaJedinica(req, res);
    
            expect(IzbornaJedinica.destroy).toHaveBeenCalledWith({
                where: { rednibrojizbjed: 999 },
            });
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Izborna jedinica not found' });
        });
    });
    
}); 
