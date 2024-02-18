var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep, id) {
        if (creep.memory.harvesting && creep.store.getFreeCapacity() == 0) {
            creep.memory.harvesting = false;
            // creep.memory.target=null;
            // creep.say('🔄 harvest');
        }
        if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harvesting = true;
            // creep.say('🚧 build');
        }
        // creep.say('👷');

        if (creep.memory.harvesting) {
            // var sources = creep.room.find(FIND_SOURCES);
            // if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            // }
            var sources = Game.getObjectById(id)
            if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
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
                // console.log(JSON.stringify( creep.memory.target))
                // if(!creep.memory.target){
                //     creep.memory.target=targets[0];
                // }
                // let _target=Game.getObjectById(creep.memory.target.id);
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                // creep.moveTo( 20,32, {visualizePathStyle: {stroke: '#ffffff'}});
                if (creep.memory.role == 'harvester') {
                    if (_.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length > 2) {

                    } else {
                        creep.memory.role = 'builder';
                    }
                } else {
                    if (_.filter(Game.creeps, (creep) => creep.memory.role == 'builder1').length > 2) {

                    } else {
                        creep.memory.role = 'builder1';
                    }
                }
            }
        }
    }
};

module.exports = roleHarvester;