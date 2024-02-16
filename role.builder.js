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
                // 修復
                var roadsToRepair = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => structure.structureType === STRUCTURE_ROAD && structure.hits < structure.hitsMax
                });
                roadsToRepair.sort()
                console.log(roadsToRepair.length)
                if(roadsToRepair.length > 0){
                    //  console.log(roadsToRepair[0])
                    creep.moveTo(roadsToRepair[0], {visualizePathStyle: {stroke: '#ff0000'}});
                    let repsreRS = creep.repair(roadsToRepair[0]);
                    console.log(repsreRS)
                    // console.log(roadToRepare[0] +" Repare" + creep.pos.x + ","  + creep.pos.y + ">" + repsreRS)
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