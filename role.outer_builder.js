var outer_builder = {

    /** @param {Creep} creep **/
    run: function(creep,id,roomName,homeName,sayWord) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	    }
	    
	    creep.say(sayWord);

	    if(creep.memory.building) {
	       // if (creep.room.name != homeName){
        //          creep.moveTo(new RoomPosition(1, 18, homeName),{visualizePathStyle: {stroke: '#ffaa00'}});
        //     }else
            {
    	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
                    filter: (site) => site.structureType === STRUCTURE_ROAD
                    // && site.id!='1cf62df2f8d640a'
                });
                if(targets.length==0){
                    targets = creep.room.find(FIND_CONSTRUCTION_SITES 
                    // , {
                    //     filter: (site) => site.x>32
                    // }
                    );
                }
                // console.log(targets[0])
    	        targets.sort((a, b) => {
                    if (a.pos.x !== b.pos.x) {
                        return b.pos.x - a.pos.x;
                    }
                    return a.id.localeCompare(b.id);
                });
    	        
                if(targets.length>0) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }else{
                    if (creep.room.name != homeName){
                         creep.moveTo(new RoomPosition(1, 18, homeName),{visualizePathStyle: {stroke: '#ffaa00'}});
                         return;
                    }
                    // 放進container
                    let containers = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => (structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_STORAGE) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                    });
                    containers.sort()
                    if(containers.length > 0){
                        creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#7777ff'}})
                       let rs= creep.transfer(containers[0], RESOURCE_ENERGY);
                    //   console.log(rs)
                    }else{
                        creep.moveTo(27,43, {visualizePathStyle: {stroke: '#ff0000'}});
                    }
                }
            }
	    }
	    else {
            var sources = Game.getObjectById(id)
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = outer_builder;