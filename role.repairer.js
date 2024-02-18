var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep,sourceRoom,targetRoom) {
        // console.log(creep.memory.repairing)
        // console.log(creep.store[RESOURCE_ENERGY] != creep.store.getFreeCapacity())
        // console.log( creep.store[RESOURCE_ENERGY])
        // console.log( creep.store.getFreeCapacity())
        if(creep.memory.repairing  && creep.store[RESOURCE_ENERGY] == 0) {
	       // console.log('change to false')
            creep.memory.repairing = false;
	    }
	    if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
	       // console.log('change to true')
	        creep.memory.repairing = true;
	    }
        // creep.say('🔨');
        
	   if(creep.memory.repairing) {
	        if(creep.room.name!=targetRoom)
	        {
                creep.moveTo(new RoomPosition(1, 18, targetRoom),{visualizePathStyle: {stroke: '#ffffff'}});
	            return;
	        }
	       
            if(!creep.memory.fixingTargetId){
                //能量補充
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ( structure.structureType == STRUCTURE_TOWER) 
                        && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                    }
                });
                targets.sort();
                if(targets.length > 0) {
                    if(creep.transfer(targets[0] , RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo( targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }else{ 
                    // 修復
                    var roadsToRepair = creep.room.find(FIND_STRUCTURES, {
                            filter: structure => structure.hits < structure.hitsMax * 0.9
                            // && structure.structureType === STRUCTURE_ROAD 
                            && structure.structureType !== STRUCTURE_WALL 
                    });
                    roadsToRepair.sort((a, b) => {
                        // if(a.structureType !== b.structureType ){
                        //     return a.structureType.localeCompare(b.structureType)
                        // }
                        if (a.hits !== b.hits) {
                            return a.hits/a.hitsMax - b.hits/b.hitsMax;
                        }
                        
                        if (a.pos.y !== b.pos.y) {
                            return b.pos.y - a.pos.y;
                        }
                        
                        // return a.id.localeCompare(b.id);
                        return b.pos.x - a.pos.x;
                    });
                    
                    if(roadsToRepair.length > 0){
                        creep.memory.fixingTargetId = roadsToRepair[0].id;
                        let repsreRS = creep.repair(roadsToRepair[0]);
                        if(repsreRS==ERR_NOT_IN_RANGE){
                            creep.moveTo(roadsToRepair[0], {visualizePathStyle: {stroke: '#ff0000'}});
                        }
                        // console.log(repsreRS)
                    }
                }
            }
            else{
                var target=Game.getObjectById(creep.memory.fixingTargetId)
                if(!target){
                    creep.memory.fixingTargetId=null
                }else{
                    let repsreRS = creep.repair(target);
                         if(repsreRS === ERR_NOT_IN_RANGE) {
                            creep.moveTo(target.pos.x,target.pos.y, {visualizePathStyle: {stroke: '#ff0000'}});
                         }else{
                            //  console.log( creep.repair(target))
                            creep.moveTo(target.pos.x,target.pos.y, {visualizePathStyle: {stroke: '#ff0000'}});
                             if(repsreRS===OK){
                                //  if(creep.id=='63f0790273953ff')
                                // {console.log('OK:' + target.hits +' ID>' + target.id)}
                             }else{
                                // console.log('Repair ERROR:' + repsreRS + 'pos>' + target.pos.x  +',' + target.pos.y)
                             }
                         }
                    
                    if(target.hits == target.hitsMax){
                        creep.memory.fixingTargetId=null
                    }
                     
                }
            }
        }
        else {
            if(creep.room.name!=sourceRoom)
	        {
                creep.moveTo(new RoomPosition(1, 18, sourceRoom),{visualizePathStyle: {stroke: '#ffffff'}});
	            return;
	        }
	        
            var targets= creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => (structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_STORAGE )
                && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            })
            targets.sort((a,b)=>{
                if (a.hitsMax !== b.hitsMax) {
                    return a.hitsMax - b.hitsMax;
                }
                return a.id.localeCompare(b.id);
            })
            if(targets.length>0){
                const rs = creep.withdraw(targets[0],RESOURCE_ENERGY);
                if(rs === ERR_NOT_IN_RANGE){
                    creep.moveTo(targets[0].pos);
                }
                else if (rs === OK || rs === ERR_BUSY) {
                    
                } else {
                    console.log(`withdraw失敗，ERROR Code: ${rs},pos:${targets[0].pos}`);
                }
            }
        }
	}
};

module.exports = roleRepairer;