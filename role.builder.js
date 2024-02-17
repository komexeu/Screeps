
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep,id) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            // creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	       // creep.say('🚧 build');
	    }
	    
	    creep.say('🚧');

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
                filter: (site) => site.structureType === STRUCTURE_EXTENSION 
                // && site.pos.x < 18 && site.pos.y < 24
            });
            if(targets.length==0){
                targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            }
	        targets.sort();
	        
            if(targets.length>0) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
               // 放進container
                let containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => (structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_STORAGE )
                    // || structure.structureType === RESOURCE_ENERGY
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                });
                console.log(containers.length)
                containers.sort((a,b)=>b.hitsMax - a.hitsMax)
                if(containers.length > 0){
                    creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#7777ff'}})
                    creep.transfer(containers[0], RESOURCE_ENERGY);
                }else{
                    creep.moveTo(27,43, {visualizePathStyle: {stroke: '#ff0000'}});
                }
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