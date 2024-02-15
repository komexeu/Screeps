var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep,id) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
	        targets.sort();
            if(targets.length>0) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                creep.moveTo( 27,43, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            // var target = Game.getObjectById('e851cacb4792943');
            // if(creep.build(target) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            // }
	    }
	    else {
	       // var sources = creep.room.find(FIND_SOURCES);
        //     if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        //     }
            var sources = Game.getObjectById(id)
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;