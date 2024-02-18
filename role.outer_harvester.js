var outer_harvester = {

    /** @param {Creep} creep **/
    run: function (creep, id, roomName, homeName, sayWord) {
        if (creep.memory.harvesting && creep.store.getFreeCapacity() == 0) {
            creep.memory.harvesting = false;
            // creep.memory.target=null;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harvesting = true;
            creep.say('🚧 build');
        }

        // creep.say(creep.memory.targetRoom)

        if (creep.memory.harvesting) {
            var sources = Game.getObjectById(id)
            if (creep.room.name != creep.memory.sourceRoom ) {
                creep.say(creep.memory.sourceRoom)
            }
            if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            // if (creep.room.name != creep.memory.homeRoom){
            //      creep.moveTo(new RoomPosition(1, 18, creep.room.homeRoom),{visualizePathStyle: {stroke: '#ffffff'}});
            // }
            if (creep.room.name != creep.memory.targetRoom ) {
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
                    if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
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