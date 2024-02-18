var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep,id) {
        if(creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = false;
            // creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
	        creep.memory.upgrading = true;
	       // creep.say('🚧 build');
	    }
        // creep.say('💚');
        
	   // if(creep.store[RESOURCE_ENERGY] == 0) {
	   if(creep.memory.upgrading) {
            // var sources = creep.room.find(FIND_SOURCES);
            // if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(sources[0]);
            // }
            var sources = Game.getObjectById(id)
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	}
};

module.exports = roleUpgrader;