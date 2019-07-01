var orm = require('../config/orm');

var userActions = {
    // getSinglePlayer: function() {},
    getRosterByUser: function(user_id,cb){
        orm.query(
            "select player.* from userRoster INNER JOIN playersBio player ON player.id = userRoster.player_id WHERE userRoster.user_id = ?",
            [user_id],
            function(err, data){
                if (err) {
                    throw err;
                  }

                cb(data)
            }
        )
    },

    addPlayer: function(col, vals, cb){
        orm.insertOne("userRoster", col, vals, function(res){
            cb(res);
        })

    },

    updatePlayer: function(col, vals, cb){
        orm.updateOne("userRoster", col, vals, function(res){
            cb(res);
        })
    },

    deletePlayer: function(condition, cb){
        orm.deleteOne("userRoster", condition, function(res){
            cb(res);
        })
    },


};
  
  // Export the database functions for the controller (catsController.js).
  module.exports = userActions;
  