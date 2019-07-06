var orm = require("../config/orm.js");

var search = {
    returnPlayerData: function(id, cb) {
        var queryString =
            "SELECT * FROM playerStatsSeason LEFT JOIN playersBio ON playerStatsSeason.full_name = playersBio.full_name WHERE playersBio.id = ?";
        orm.query(queryString, [id], function(err, data) {
            if (err) {
                throw err;
            }

            cb(data);
        });
    },

    returnPlayerAndId: function(cb) {
        var queryString = "SELECT full_name, id FROM playersBio";
        orm.query(queryString, function(err, data) {
            if (err) {
                throw err;
            }
            cb(data);
        });
    }
};
module.exports = search;
