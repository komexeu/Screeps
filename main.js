var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            // console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    // console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        // console.log('Spawning new harvester: ' + newName);
        Game.spawns['Mapu'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName,{memory: {role: 'harvester'}});
    }
    
    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
     if(upgrader.length < 1) {
        var newName = 'Upgrader' + Game.time;
        // console.log('Spawning new harvester: ' + newName);
        Game.spawns['Mapu'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName,{memory: {role: 'upgrader'}});
    }
    
    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
     if(builder.length < 4) {
        var newName = 'Builder' + Game.time;
        // console.log('Spawning new harvester: ' + newName);
        Game.spawns['Mapu'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE], newName,{memory: {role: 'builder'}});
    }
    
    if(Game.spawns['Mapu'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Mapu'].spawning.name];
        Game.spawns['Mapu'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Mapu'].pos.x + 1, 
            Game.spawns['Mapu'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep,'ab9e0774d1c107c');
        }
        if(creep.memory.role == 'upgrader') {
            // console.log(JSON.stringify(creep.name) )
            roleUpgrader.run(creep,'ab9e0774d1c107c');
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep,'f5680774d1c1fe8');
        }
    }
}