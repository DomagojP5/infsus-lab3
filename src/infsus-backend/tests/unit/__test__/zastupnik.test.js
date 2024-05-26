const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/testdb'); 
const Zastupnik = require('../../../models/Zastupnik');
const zastupnikController = require('../../../controllers/zastupnikController');

jest.mock('../../../models/Zastupnik'); 

describe('zastupnik model i controller', () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true }); 
    });

    describe('zastupnik model unit testovi', () => {
        it('treba stvoriti novu instance zastupnika', async () => {
        const mockZastupnik = {
            idzastupnika: 1,
            imezastupnika: 'Ivan Ivic',
            godinezastupnika: 35,
            spolzastupnika: 'm',
            rednibrojizbjed: 1,
            imepolitičkestranke: 'HDZ'
        };

        Zastupnik.create.mockResolvedValue(mockZastupnik);

        const zastupnik = await Zastupnik.create({
            imezastupnika: 'Ivan Ivic',
            godinezastupnika: 35,
            spolzastupnika: 'm',
            rednibrojizbjed: 1,
            imepolitičkestranke: 'HDZ'
          });

        expect(zastupnik.idzastupnika).toBeDefined();
        expect(zastupnik.imezastupnika).toBe('Ivan Ivic');
        expect(zastupnik.godinezastupnika).toBe(35);
        expect(zastupnik.spolzastupnika).toBe('m');
        expect(zastupnik.rednibrojizbjed).toBe(1);
        expect(zastupnik.imepolitičkestranke).toBe('HDZ');
        });

    });


    describe('zastupnik controller unit testovi', () => {
        it('trebalo bi dobiti zastupnika po id-u', async () => {
        const mockZastupnik = {
            idzastupnika: 1,
            imezastupnika: 'Ivan Ivic',
            godinezastupnika: 35,
            spolzastupnika: 'm',
            rednibrojizbjed: 1,
            imepolitičkestranke: 'HDZ'
        };
        Zastupnik.findByPk.mockResolvedValue(mockZastupnik);

        const req = { params: { id: 1 } };
        const res = {
            json: jest.fn(),
            status: jest.fn()
        };

        await zastupnikController.getZastupnikById(req, res);

        expect(Zastupnik.findByPk).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith(mockZastupnik);
        });

        it('trebalo bi poslati error ako ne postoji zastupnik s id-om', async () => {
        const errorMessage = 'Zastupnik not found';
        Zastupnik.findByPk.mockResolvedValue(null);

        const req = { params: { id: 999 } };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        await zastupnikController.getZastupnikById(req, res);

        expect(Zastupnik.findByPk).toHaveBeenCalledWith(999);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
        });

    });
});
