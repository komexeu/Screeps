var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep,id) {
	    if(creep.store[RESOURCE_ENERGY] == 0) {
            // var sources = creep.room.find(FIND_SOURCES);
            // if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(sources[0]);
            // }
            var sources = Game.getObjectById(id)
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources);
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
	}
};

module.exports = roleUpgrader;