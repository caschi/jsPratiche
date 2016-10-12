var rest = require('../helpers/rest.js');
var mysql = require('mysql');
var sql = require('../helpers/db.js');
var tableName = 'Pratiche';

var express = require('express');
var router = express.Router();

// todo
/* GET /pratiche in corso listing. */
router.get('/', function(req, res, next) {
    sql(function(err,connection) {
		var query = "SELECT * FROM ((SELECT Pratiche.*, stringUser, StatoPratiche.idStato, ConstStatoPratiche.descrizione as stringStato, Gestori.name as stringGestore, Comuni.name as stringComune, ConstTipoPratiche.descrizione as stringTipo, ConstStatoPratiche.final as Final FROM Pratiche LEFT OUTER JOIN (SELECT idPratica,Utenti.username stringUser FROM StoricoStatoPratiche n LEFT OUTER JOIN Utenti on (n.idUtente = Utenti.id) WHERE timepoint=(SELECT MAX(timepoint) FROM StoricoStatoPratiche WHERE idPratica=n.idPratica AND idStato=2 AND idUtente IS NOT NULL) AND username IS NOT NULL) AS B on (Pratiche.id = B.idPratica) LEFT OUTER JOIN StatoPratiche on (Pratiche.id = StatoPratiche.idPratica) LEFT OUTER JOIN ConstStatoPratiche on (StatoPratiche.idStato = ConstStatoPratiche.id) LEFT OUTER JOIN Gestori on (Pratiche.idGestore = Gestori.id) LEFT OUTER JOIN Comuni on (Pratiche.idComune = Comuni.id) LEFT OUTER JOIN ConstTipoPratiche on (Pratiche.tipopratica = ConstTipoPratiche.id) WHERE Final=0 OR Final IS NULL) AS A LEFT OUTER JOIN ((select idPratica,SUM(DATEDIFF(dateIN,dateOUT)) as diff from Integrazioni GROUP BY idPratica) AS C) on A.id = C.idPratica)";

		connection.query(query, function(err, data) {
            if (err) rest.error500(res, err);
			else res.json(data);
        });
    });
});

// todo
/* GET /pratiche storico listing. */
router.get('/all', function(req, res, next) {
    sql(function(err,connection) {
		var query = "SELECT * FROM ((SELECT Pratiche.*, stringUser, StatoPratiche.idStato, ConstStatoPratiche.descrizione as stringStato, Gestori.name as stringGestore, Comuni.name as stringComune, ConstTipoPratiche.descrizione as stringTipo, ConstStatoPratiche.final as Final FROM Pratiche LEFT OUTER JOIN (SELECT idPratica,Utenti.username stringUser FROM StoricoStatoPratiche n LEFT OUTER JOIN Utenti on (n.idUtente = Utenti.id) WHERE timepoint=(SELECT MAX(timepoint) FROM StoricoStatoPratiche WHERE idPratica=n.idPratica AND idStato=2 AND idUtente IS NOT NULL) AND username IS NOT NULL) AS B on (Pratiche.id = B.idPratica) LEFT OUTER JOIN StatoPratiche on (Pratiche.id = StatoPratiche.idPratica) LEFT OUTER JOIN ConstStatoPratiche on (StatoPratiche.idStato = ConstStatoPratiche.id) LEFT OUTER JOIN Gestori on (Pratiche.idGestore = Gestori.id) LEFT OUTER JOIN Comuni on (Pratiche.idComune = Comuni.id) LEFT OUTER JOIN ConstTipoPratiche on (Pratiche.tipopratica = ConstTipoPratiche.id)) AS A LEFT OUTER JOIN ((select idPratica,SUM(DATEDIFF(dateIN,dateOUT)) as diff from Integrazioni GROUP BY idPratica) AS C) on A.id = C.idPratica)";

		connection.query(query, function(err, data) {
            if (err) rest.error500(res, err);
			else res.json(data);
        });
    });
});

// todo
/* GET /pratiche/correggere in correzione listing. */
router.get('/correggere', function(req, res, next) {
    sql(function(err,connection) {
		var query = "SELECT * FROM ((SELECT Pratiche.*, stringUser, StatoPratiche.idStato, ConstStatoPratiche.descrizione as stringStato, Gestori.name as stringGestore, Comuni.name as stringComune, ConstTipoPratiche.descrizione as stringTipo, ConstStatoPratiche.final as Final FROM Pratiche LEFT OUTER JOIN (SELECT idPratica,Utenti.username stringUser FROM StoricoStatoPratiche n LEFT OUTER JOIN Utenti on (n.idUtente = Utenti.id) WHERE timepoint=(SELECT MAX(timepoint) FROM StoricoStatoPratiche WHERE idPratica=n.idPratica AND idStato=2 AND idUtente IS NOT NULL) AND username IS NOT NULL) AS B on (Pratiche.id = B.idPratica) LEFT OUTER JOIN StatoPratiche on (Pratiche.id = StatoPratiche.idPratica) LEFT OUTER JOIN ConstStatoPratiche on (StatoPratiche.idStato = ConstStatoPratiche.id) LEFT OUTER JOIN Gestori on (Pratiche.idGestore = Gestori.id) LEFT OUTER JOIN Comuni on (Pratiche.idComune = Comuni.id) LEFT OUTER JOIN ConstTipoPratiche on (Pratiche.tipopratica = ConstTipoPratiche.id)) AS A LEFT OUTER JOIN ((select idPratica,SUM(DATEDIFF(dateIN,dateOUT)) as diff from Integrazioni GROUP BY idPratica) AS C) on A.id = C.idPratica) WHERE idStato = 4 OR idStato = 5";

		connection.query(query, function(err, data) {
            if (err) rest.error500(res, err);
			else res.json(data);
        });
    });
});

// todo
/* GET /pratiche/protocollare in uscita ma senza protocollo listing. */
router.get('/protocollare', function(req, res, next) {
    sql(function(err,connection) {
		var query = "SELECT * FROM ((SELECT Pratiche.*, stringUser, StatoPratiche.idStato, ConstStatoPratiche.descrizione as stringStato, Gestori.name as stringGestore, Comuni.name as stringComune, ConstTipoPratiche.descrizione as stringTipo, ConstStatoPratiche.final as Final FROM Pratiche LEFT OUTER JOIN (SELECT idPratica,Utenti.username stringUser FROM StoricoStatoPratiche n LEFT OUTER JOIN Utenti on (n.idUtente = Utenti.id) WHERE timepoint=(SELECT MAX(timepoint) FROM StoricoStatoPratiche WHERE idPratica=n.idPratica AND idStato=2) AND username IS NOT NULL) AS B on (Pratiche.id = B.idPratica) LEFT OUTER JOIN StatoPratiche on (Pratiche.id = StatoPratiche.idPratica) LEFT OUTER JOIN ConstStatoPratiche on (StatoPratiche.idStato = ConstStatoPratiche.id) LEFT OUTER JOIN Gestori on (Pratiche.idGestore = Gestori.id) LEFT OUTER JOIN Comuni on (Pratiche.idComune = Comuni.id) LEFT OUTER JOIN ConstTipoPratiche on (Pratiche.tipopratica = ConstTipoPratiche.id)) AS A LEFT OUTER JOIN ((select idPratica,SUM(DATEDIFF(dateIN,dateOUT)) as diff from Integrazioni GROUP BY idPratica) AS C) on A.id = C.idPratica) WHERE idStato = 6";

		connection.query(query, function(err, data) {
            if (err) rest.error500(res, err);
			else res.json(data);
        });
    });
});

router.get('/:id', function(req, res, next) {
    sql(function(err, connection) {
		var query = mysql.format("SELECT Pratiche.*, Comuni.name as stringComune, Gestori.name as stringGestore FROM Pratiche LEFT OUTER JOIN Comuni on Pratiche.idComune = Comuni.id LEFT OUTER JOIN Gestori on (Pratiche.idGestore = Gestori.id) WHERE Pratiche.id=?", [req.params.id]);

		connection.query(query, function(err, data) {
            if (err) rest.error500(res, err);
			else res.json(data.length == 1 ? data[0] : []);
        });
    });
});

router.post('/', function(req, res, next) {

    sql(function (err, connection) {
		connection.query('START TRANSACTION;', function(err, data) {
			if (err) rest.error500(res, err);
			else {
				var query = mysql.format('INSERT INTO ??(idGestore, idComune, address, sitecode, tipopratica, protoIN, dataIN, protoOUT, dataOUT, note) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [tableName, req.body.idGestore, req.body.idComune, req.body.address, req.body.sitecode, req.body.tipopratica, req.body.protoIN, req.body.dataIN, req.body.protoOUT, req.body.dataOUT, req.body.note]);

				connection.query(query, function(err, data) {
					if (err) rest.error500(res, err);
					else
						connection.query("SELECT LAST_INSERT_ID() AS id;", function(err, datares) {
							if (err) rest.error500(res, err);
							else {
								var lastid = datares[0].id;
								var query2 = mysql.format("INSERT INTO StatoPratiche(idPratica,idUtenteModifica,idStato) VALUES (?,?,?)", [lastid, req.user.id, 1]);

								connection.query(query2, function(err, datares2) {
									if (err) rest.error500(res, err);
									else {
										connection.query('COMMIT;', function(err, data) {
											if (err) rest.error500(res, err);
											rest.created(res, datares[0]);
										});
									}
								});
							}
						});
				});
			}
		});
    });
});

router.put('/:id', function(req, res, next) {
    sql(function (err, connection) {
        var query = mysql.format('UPDATE ?? SET idGestore = ?, idComune = ?, address = ?, sitecode = ?, tipopratica = ?, protoIN = ?, dataIN = ?, protoOUT = ?, dataOUT = ?, note = ? WHERE id = ?', [tableName, req.body.idGestore, req.body.idComune, req.body.address, req.body.sitecode, req.body.tipopratica, req.body.protoIN, req.body.dataIN, req.body.protoOUT, req.body.dataOUT, req.body.note, req.params.id]);

        connection.query(query, function(err, data) {
            if (err) rest.error500(res, err);
            else rest.updated(res, data);
        });
    });
});

// NOT TESTED (but should work)
/* PUT /pratiche/protoout/:id */
router.put('/protoout/:id', function(req, res, next) {

	sql(function (err, connection) {
		connection.query('START TRANSACTION;', function(err, data) {
			if (err) rest.error500(res, err);
			else
				connection.query(mysql.format('UPDATE ?? SET protoOUT = ?, dataOUT = ? WHERE id = ?', [tableName, req.body.protoOUT, req.body.dataOUT, req.params.id]), function(err, data) {
					if (err) rest.error500(res, err);
					else
						connection.query(mysql.format("INSERT INTO StatoPratiche(idPratica,idStato,idUtenteModifica) VALUES (?,?,?)", [ req.params.id, 12, req.user.id ]), function(err, datares2) {
							if (err) rest.error500(res, err);
							else {
								connection.query('COMMIT;', function(err, data) {
									if (err) rest.error500(res, err);
									else rest.updated(res, datares2);
								});
							}
						});
				});
		});
    });
});

router.delete('/:id', function(req, res, next) {

    sql(function (err, connection) {
		var query = mysql.format("INSERT INTO StatoPratiche(idPratica,idStato,idUtenteModifica) VALUES (?,?,?)", [ req.params.id, 10, req.user.id ]);

		connection.query(query, function(err, data) {
			if (err) rest.error500(res, err);
			else rest.deleted(res, data);
		});
    });
});

module.exports = router;
