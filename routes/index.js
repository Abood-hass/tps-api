var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : process.env.DATABASE_HOST,
  user     : process.env.DATABASE_USER,
  database : process.env.DATABASE_SCHEMA
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
});

router.post('/', function(req, res, next) {
  try {
    const weight = Math.round(req.body.weight*2)/2;
    const country = req.body.country;
    const type = req.body.type;
    let tableName = "";

    if(type === "وثائق"){
      tableName = 'papers';
    }else
      if(type === "طرد"){
      tableName = 'packages';
    }

    if(weight > 0 && country !== "" && tableName !== ""){
    let query = 'SELECT *\n' +
        'FROM destination\n' +
        'LEFT JOIN '+tableName+'\n' +
        'ON destination.zone_id = '+tableName+'.zone_id\n' +
        'WHERE weight = '+weight+' AND country = "'+country+'";';
      try{
        connection.query(query, function (error, results, fields) {
          console.log(weight + " || " + country)
          if (error) {
            res.json({"msg": "", "err": "unExpectedError"})
          } else {
            try {
              res.json({"msg": results[0]['price'], "err": ""});
            }catch (e) {
              res.json({"msg": "", "err": "unExpectedError"})
            }
          }
        });
      }catch (e) {
        res.json({"msg": "", "err": "unExpectedError"});
      }

    }else{
      res.json({"msg": "", "err": "unExpectedError"});
    }
  }catch (err) {
    res.json({"msg": "", "err": "unExpectedError"});
    console.log(err)
  }
});

router.get('/countriesListPackages', function (req, res, next) {

  let query = 'SELECT DISTINCT country\n' +
      'FROM destination\n' +
      'RIGHT JOIN packages\n' +
      'ON destination.zone_id = packages.zone_id;';

  connection.query(query, function (error, results, fields) {
    if (error) {
      res.json({"msg": "", "err": "unExpectedError"})
    } else {
      res.json({"msg": results, "err": ""});
    }
  });
})

router.get('/countriesListPaper', function (req, res, next) {

  let query = 'SELECT DISTINCT country\n' +
      'FROM destination\n' +
      'RIGHT JOIN papers\n' +
      'ON destination.zone_id = papers.zone_id;';

  connection.query(query, function (error, results, fields) {
    if (error) {
      res.json({"msg": "", "err": "unExpectedError"})
    } else {
      res.json({"msg": results, "err": ""});
    }
  });
})


router.post('/neighboringCountriesShipping', function (req, res, next) {
  try {
    const weight = Math.round(req.body.weight*2)/2;
    const country = req.body.country;
    const packageContent = req.body.packageContent;

    let packageContentValue = 1;
    let multiple = 1;
    if (packageContent ===  "إعتيادي")
    {packageContentValue = 0}
    if (weight > 1){
      multiple = weight
    }


    if(weight > 0 && country !== "" ){
      let query = 'SELECT * FROM destination RIGHT JOIN transports ON destination.id = transports.countryId ' +
          'WHERE `weight` = '+weight+' AND `country` = "'+country+'" AND `packageType` = '+packageContentValue+';';
      try{
        connection.query(query, function (error, results, fields) {
          if (error) {
            res.json({"msg": "", "err": "unExpectedError"})
          } else {
            try {
              res.json({"msg": results[0]['price'], "err": ""});
            }catch (e) {
              res.json({"msg": "", "err": "unExpectedError"})
            }
          }
        });
      }catch (e) {
        res.json({"msg": "", "err": "unExpectedError"});
      }

    }else{
      res.json({"msg": "", "err": "unExpectedError"});
    }
  }catch (err) {
    res.json({"msg": "", "err": "unExpectedError"});
    console.log(err)
  }
})


router.post('/turkeyShipping', function (req, res, next) {
  try {

    const weight = req.body.weight;
    if(weight > 0 ){
      let query = 'SELECT * FROM `importclothes` WHERE `weight` = '+weight+';';
      try{
        connection.query(query, function (error, results, fields) {
          if (error) {
            res.json({"msg": "", "err": "unExpectedError"})
          } else {
            try {
              res.json({"msg": results[0]['price'], "err": ""});
            }catch (e) {
              res.json({"msg": "", "err": "unExpectedError"})
            }
          }
        });
      }catch (e) {
        res.json({"msg": "", "err": "unExpectedError"});
      }

    }else{
      res.json({"msg": "", "err": "unExpectedError"});
    }
  }catch (err) {
    res.json({"msg": "", "err": "unExpectedError"});
    console.log(err)
  }
})


router.post('/usaShipping', function (req, res, next) {
  try {

    const weight = req.body.weight;
    if(weight > 0 ){
      let query = 'SELECT * FROM `importclothes` WHERE `weight` = '+weight+';';
      try{
        connection.query(query, function (error, results, fields) {
          if (error) {
            res.json({"msg": "", "err": "unExpectedError"})
          } else {
            try {
              res.json({"msg": results[0]['price'], "err": ""});
            }catch (e) {
              res.json({"msg": "", "err": "unExpectedError"})
            }
          }
        });
      }catch (e) {
        res.json({"msg": "", "err": "unExpectedError"});
      }

    }else{
      res.json({"msg": "", "err": "unExpectedError"});
    }
  }catch (err) {
    res.json({"msg": "", "err": "unExpectedError"});
    console.log(err)
  }
})
module.exports = router;
