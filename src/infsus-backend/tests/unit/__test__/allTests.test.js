const request = require('supertest');
const app = require('../../../app');
const sequelize = require('../../../config/testdb');
const PolitickaStranka = require('../../../models/PolitickaStranka');
const IzbornaJedinica = require('../../../models/IzbornaJedinica');
const VrstaPolitickeStranke = require('../../../models/VrstaPolitickeStranke');
const Zastupnik = require('../../../models/Zastupnik');

beforeAll(async () => {
    await sequelize.sync({force: true});
    await VrstaPolitickeStranke.create({
      oznakavrstepolitičkestranke: 3,
      imevrstepolitičkestranke: 'Socijaldemokratska stranka',
    })
    await VrstaPolitickeStranke.create({
      oznakavrstepolitičkestranke: 4,
      imevrstepolitičkestranke: 'Zelena stranka',
    })

    await IzbornaJedinica.create({
      rednibrojizbjed: 1,
      opis: 'I. izborna jedinica obuhvaća sjeverozapadni dio Zagrebačke županije te dio centra i zapada Grada Zagreba',
      brojbirača: 342740,
    });
    
    await PolitickaStranka.create({
      imepolitičkestranke: 'Socijaldemokratska partija Hrvatske',
      kratkiopisstranke: 'Socijaldemokratska partija Hrvatske politička je stranka lijevoga centra i jedna od dvije vodeće stranke u Republici Hrvatskoj od njenoga osamostaljenja.',
      oznakavrstepolitičkestranke: 3,
    });

    await PolitickaStranka.create({
      imepolitičkestranke: 'Možemo!',
      kratkiopisstranke: 'Možemo! je hrvatska politička platforma i stranka zelene ljevice nastala za djelovanje na izborima na nacionalnoj razini za Sabor i Europski parlament, 10. veljače 2019. godine.',
      oznakavrstepolitičkestranke: 4,
    });

    await Zastupnik.create({
      imezastupnika: 'Sandra Benčić',
      godinezastupnika: 46,
      spolzastupnika: 'ž',
      rednibrojizbjed: 1, 
      imepolitičkestranke: 'Možemo!',
    });

    await Zastupnik.create({
      imezastupnika: 'Davor Bernardić',
      godinezastupnika: 44,
      spolzastupnika: 'm',
      rednibrojizbjed: 1,
      imepolitičkestranke: 'Socijaldemokratska partija Hrvatske',
    });
});

afterAll(async () => {
  await sequelize.close();
});



//politička stranka
//GET
describe('GET /politickeStranke/:name', () => {
  it('treba vratiti odabranu političku stranku', async () => {
    const response = await request(app).get('/api/politickeStranke/Socijaldemokratska partija Hrvatske');
    expect(response.status).toBe(200);
    expect(response.body.imepolitičkestranke).toBe('Socijaldemokratska partija Hrvatske');
    expect(response.body.kratkiopisstranke).toBe('Socijaldemokratska partija Hrvatske politička je stranka lijevoga centra i jedna od dvije vodeće stranke u Republici Hrvatskoj od njenoga osamostaljenja.');
    expect(response.body.oznakavrstepolitičkestranke).toBe(3);
  });

  it('ne smije vratiti nikakvu političku stranku', async () => {
    const response = await request(app).get('/api/politickeStranke/sdfsd');
    expect(response.status).toBe(404);
  });
});

// //CREATE
describe('CREATE /politickeStranke/create/:imepolitickestranke/:kratkiopisstranke/:oznakavrstepolitickestranke', () => {
  it('treba stvoriti odabranu političku stranku', async () => {
    const response = await request(app).put('/api/politickeStranke/create/Nova Stranka/Novi opis stranke./3');
    expect(response.status).toBe(200);
    expect(response.body.imepolitičkestranke).toBe('Nova Stranka');
    expect(response.body.kratkiopisstranke).toBe('Novi opis stranke.');
    expect(response.body.oznakavrstepolitičkestranke).toBe(3);
  });
  it('ne smije stvoriti novu stranku', async () => {
    const response = await request(app).put('/api/politickeStranke/create//Novi opis stranke./2');
    expect(response.status).toBe(404)
  });
});

//EDIT
describe('EDIT /politickeStranke/:name', () => {
  it('treba promijeniti političku stranku', async () => {
    const response = await request(app).put('/api/politickeStranke/Socijaldemokratska partija Hrvatske').send({
      novoIme: 'Socijaldemokratska partija Hrvatske', 
      kratkiopisstranke: 'Socijaldemokratska partija Hrvatske politička je stranka desnog centra i jedna od dvije vodeće stranke u Republici Hrvatskoj od njenoga osamostaljenja.', 
      oznakavrstepolitičkestranke: 3});
    expect(response.status).toBe(200);
    expect(response.body.stranka.imepolitičkestranke).toBe('Socijaldemokratska partija Hrvatske');
    expect(response.body.stranka.kratkiopisstranke).toBe('Socijaldemokratska partija Hrvatske politička je stranka desnog centra i jedna od dvije vodeće stranke u Republici Hrvatskoj od njenoga osamostaljenja.');
    expect(response.body.stranka.oznakavrstepolitičkestranke).toBe(3);
  });

  it('ne smije promijeniti političku stranku', async () => {
    const response = await request(app).put('/api/politickeStranke/Socijaldemokratska partija Hrvatske').send({
      novoIme: 'Socijaldemokratska partija Hrvatske',
      kratkiopisstranke: null,
      oznakavrstepolitičkestranke: 3
    });
    expect(response.status).toBe(500);
  });
});

//DELETE
describe('DELETE /politickeStranke/delete/:imepolitickestranke', () => {
  it('treba obrisati stranku', async () => {
    const response = await request(app).delete('/api/politickeStranke/delete/Nova Stranka');
    expect(response.status).toBe(200);
  });
  it('ne smije obrisati stranku', async () => {
    const response = await request(app).put('/api/politickeStranke/delete/bezveze');
    expect(response.status).toBe(404);
  });
});



//zastupnik
//GET
describe('GET /zastupnici/:id', () => {
  it('treba vratiti odabranog zastupnika', async () => {
    const response = await request(app).get('/api/zastupnici/1/edit');
    expect(response.status).toBe(200);
    expect(response.body.imezastupnika).toBe('Sandra Benčić');
    expect(response.body.godinezastupnika).toBe(46);
    expect(response.body.spolzastupnika).toBe('ž');
    expect(response.body.rednibrojizbjed).toBe(1);
    expect(response.body.imepolitičkestranke).toBe('Možemo!');
  });

  it('ne smije dohvatit odabranog zastupnika', async () => {
    const response = await request(app).get('/api/zastupnici/5/edit');
    expect(response.status).toBe(404);
  });
});

//CREATE
describe('CREATE /add/:stranka', () => {
  it('treba stvoriti odabranog zastupnika', async () => {
    const response = await request(app).post('/api/zastupnici/add/Možemo!').send({
      imezastupnika:'bezimeni', 
      godinezastupnika: 10, 
      spolzastupnika:'ž', 
      rednibrojizbjed: 1, 
      imepolitičkestranke:'Možemo!'
    });
    expect(response.status).toBe(201);
    expect(response.body.imezastupnika).toBe('bezimeni');
    expect(response.body.godinezastupnika).toBe(10);
    expect(response.body.spolzastupnika).toBe('ž');
    expect(response.body.rednibrojizbjed).toBe(1);
    expect(response.body.imepolitičkestranke).toBe('Možemo!');
  });

  it('ne smije stvoriti odabranog zastupnika', async () => {
    const response = await request(app).post('/api/zastupnici/add/Možemo!').send({
      imezastupnika: 'bezimeni', 
      godinezastupnika:'10', 
      spolzastupnika: 'mž', 
      rednibrojizbjed:'1', 
      imepolitičkestranke:'Možemo!'
    });
    expect(response.status).toBe(400);
  });
});

//EDIT
describe('EDIT /zastupnici/:id/edit', () => {
  it('treba promijeniti zastupnika', async () => {
    const response = await request(app).put('/api/zastupnici/3/edit').send({
      imezastupnika: 'Novo Ime', 
      godinezastupnika: 18, 
      spolzastupnika: 'ž', 
      rednibrojizbjed: 1, 
      imepolitičkestranke:'Možemo!'});
    expect(response.status).toBe(200);
    expect(response.body.imezastupnika).toBe('Novo Ime');
    expect(response.body.godinezastupnika).toBe(18);
    expect(response.body.spolzastupnika).toBe('ž');
    expect(response.body.rednibrojizbjed).toBe(1);
    expect(response.body.imepolitičkestranke).toBe('Možemo!');
  });

  it('ne smije promijeniti zastupnika', async () => {
    const response = await request(app).put('/api/zastupnici/3/edit').send({
      imezastupnika: 'Novo Ime koje je predugačko da bi ga baza primila i trebala bi vratiti status code 400 kao da je nastala greška prilikom update-a', 
      godinezastupnika: 18, 
      spolzastupnika: 'ž', 
      rednibrojizbjed:'1', 
      imepolitičkestranke:'Možemo!'});
    expect(response.status).toBe(400);
  });
});

//DELETE
describe('DELETE /zastupnici/delete/:imezastupnika/:imepolitickestranke', () => {
  it('treba obrisati zastupnika', async () => {
    const response = await request(app).delete('/api/zastupnici/delete/Novo Ime/Možemo!');
    expect(response.status).toBe(200);
  });
  it('ne smije obrisati zastupnika', async () => {
    const response = await request(app).delete('/api/zastupnici/delete/nepostojece ime/Možemo');
    expect(response.status).toBe(404);
  });
});

//izborna jedinica
//GET
describe('GET /izborneJedinice/:id', () => {
  it('treba vratiti odabranu izbornu jedinicu', async () => {
    const response = await request(app).get('/api/izborneJedinice/1');
    expect(response.status).toBe(200);
    expect(response.body.rednibrojizbjed).toBe(1);
    expect(response.body.opis).toBe('I. izborna jedinica obuhvaća sjeverozapadni dio Zagrebačke županije te dio centra i zapada Grada Zagreba');
    expect(response.body.brojbirača).toBe(342740);
  });

  it('ne smije vratiti odabranu izbornu jedinicu', async () => {
    const response = await request(app).get('/api/izborneJedinice/5');
    expect(response.status).toBe(404);
  });
});

// //CREATE
describe('CREATE /izborneJedinice/create/:rednibrojizbjed/:opis/:brojbiraca', () => {
  it('treba stvoriti odabranu izbornu jedinicu', async () => {
    const response = await request(app).put('/api/izborneJedinice/create/2/Novi opis izborne jedinice/30000');
    expect(response.status).toBe(200);
    expect(response.body.rednibrojizbjed).toBe(2);
    expect(response.body.opis).toBe('Novi opis izborne jedinice');
    expect(response.body.brojbirača).toBe(30000);
  });
  it('ne smije stvoriti novu izbornu jedinicu', async () => {
    const response = await request(app).put('/api/politickeStranke/create/3//50000');
    expect(response.status).toBe(404)
  });
});

//EDIT
describe('EDIT /izborneJedinice/update', () => {
  it('treba promijeniti izbornu jedinicu', async () => {
    const response = await request(app).put('/api/izborneJedinice/update').send({
      rednibrojizbjed: 1,
      opis: 'I. izborna jedinica obuhvaća sjeverozapadni dio Zagrebačke županije te dio centra i zapada Grada Zagreba',
      brojbirača: 20000});
    expect(response.status).toBe(200);
    expect(response.body.rednibrojizbjed).toBe(1);
    expect(response.body.opis).toBe('I. izborna jedinica obuhvaća sjeverozapadni dio Zagrebačke županije te dio centra i zapada Grada Zagreba');
    expect(response.body.brojbirača).toBe(20000);
  });

  it('ne smije promijeniti promijeniti izbornu jedinicu', async () => {
    const response = await request(app).put('/api/politickeStranke/Socijaldemokratska partija Hrvatske').send({
      rednibrojizbjed: 1,
      opis: 'I. izborna jedinica obuhvaća sjeverozapadni dio Zagrebačke županije te dio centra i zapada Grada Zagreba',
      brojbirača: null});
    expect(response.status).toBe(500);
  });
});

//DELETE
describe('DELETE /izborneJedinice/delete/:rednibrojizbjed', () => {
  it('treba obrisati izbornu jedinicu', async () => {
    const response = await request(app).delete('/api/izborneJedinice/delete/2');
    expect(response.status).toBe(200);
  });
  it('ne smije obrisati izbornu jedinicu', async () => {
    const response = await request(app).delete('/api/izborneJedinice/delete/7');
    expect(response.status).toBe(404);
  });
});