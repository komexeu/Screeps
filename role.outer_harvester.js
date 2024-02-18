var outer_harvester = {

    /** @param {Creep} creep **/
    run: function (creep, id) {
        if (creep.memory.harvesting && creep.store.getFreeCapacity() == 0) {
            creep.memory.harvesting = false;
            // creep.memory.target=null;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harvesting = true;
            creep.say('🚧 build');
        }

        // creep.say(creep.memory.harvesting)

        if (creep.memory.harvesting) {
            var sources = Game.getObjectById(id)
            if (creep.room.name != creep.memory.sourceRoom) {
                creep.say(creep.memory.sourceRoom)
            }
            var rs=creep.harvest(sources);
            if (rs == ERR_NOT_IN_RANGE) {
                creep.moveTo(new RoomPosition(sources.pos.x, sources.pos.y, creep.memory.sourceRoom), { visualizePathStyle: { stroke: '#ffaa00' } });
            }else{
                // console.log(rs)
            }
        }
        else {
            // if (creep.room.name != creep.memory.homeRoom){
            //      creep.moveTo(new RoomPosition(1, 18, creep.room.homeRoom),{visualizePathStyle: {stroke: '#ffffff'}});
            // }
            if (creep.room.name != creep.memory.targetRoom) {
                creep.say(creep.memory.targetRoom)
                creep.moveTo(new RoomPosition(1, 18, creep.memory.targetRoom), { visualizePathStyle: { stroke: '#ffffff' } });
            }
            else {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN)
                            && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                    }
                });
                targets.sort((a, b) => {
                    if (a.pos.x !== b.pos.x) {
                        b.pos.x - a.pos.x
                    }
                    return b.pos.y - a.pos.y
                });
                if (targets.length > 0) {
                    var rs = creep.transfer(targets[0], RESOURCE_ENERGY);
                    if (rs == ERR_NOT_IN_RANGE) {
                        creep.moveTo(new RoomPosition(targets[0].pos.x, targets[0].pos.y, creep.memory.targetRoom), { visualizePathStyle: { stroke: '#ffffff' } });
                    } else {
                        console.log(rs)
                    }
                } else {
                    creep.moveTo(new RoomPosition(20, 32, creep.memory.targetRoom), { visualizePathStyle: { stroke: '#ffffff' } });
                    if (creep.memory.role == 'outer_harvestersR') {
                        if (_.filter(Game.creeps, (creep) => creep.memory.role == 'outer_buildersR').length > 2) {

                        } else {
                            creep.memory.role = 'outer_buildersR';
                        }
                    } else {
                        if (_.filter(Game.creeps, (creep) => creep.memory.role == 'outer_buildersL').length > 2) {

                        } else {
                            creep.memory.role = 'outer_buildersL';
                        }
                    }
                }
            }
        }
    }
};

module.exports = outer_harvester;