var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var i = 0;

module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    i= (i+1) %100;
    if(i==0){
        console.log('claimer :' + _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer'));
        console.log('harvester :' + _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'));
        console.log('harvester1 :' + _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester1'));
        console.log('upgrader :' + _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'));
        console.log('upgrader1 :' + _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader1'));
        console.log('builder :' + _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'));
        console.log('builder1 :' + _.filter(Game.creeps, (creep) => creep.memory.role == 'builder1'));
    }

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            // console.log('Clearing non-existing creep memory:', name);
        }
    }

    var claimer = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var harvesters1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester1');
    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var upgrader1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader1');
    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var builder1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder1');
    
    if(claimer.length < 0) {
        Game.spawns['Mapu'].spawnCreep( [CLAIM,MOVE,MOVE],'Claimer',{ memory: { role: 'claimer' } } );
    }
    
    const LV1=[WORK,WORK,CARRY,MOVE,MOVE];
    const LV2=[WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE];
    const LV3=[WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
    const LV4=[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
    const CreepLV=LV4;
    
    if(harvesters.length < 1) {
        var newName = 'Harvester_' + Game.time;
        Game.spawns['Mapu'].spawnCreep(CreepLV, newName,{memory: {role: 'harvester'}});
    }else if(harvesters1.length < 4) {
        var newName = 'Harvester1_' + Game.time;
        Game.spawns['Mapu'].spawnCreep(CreepLV, newName,{memory: {role: 'harvester1'}});
    }else if(upgrader.length < 4) {
        var newName = 'Upgrader_' + Game.time;
        Game.spawns['Mapu'].spawnCreep(CreepLV, newName,{memory: {role: 'upgrader'}});
    }else if(upgrader1.length < 0) {
        var newName = 'Upgrader1_' + Game.time;
        Game.spawns['Mapu'].spawnCreep(CreepLV, newName,{memory: {role: 'upgrader1'}});
    }else if(builder1.length < 4) {
        var newName = 'Builder1_' + Game.time;
        // console.log('Spawning new harvester: ' + newName);
        Game.spawns['Mapu'].spawnCreep(CreepLV, newName,{memory: {role: 'builder1'}});
    }else if(builder.length < 1) {
        var newName = 'Builder_' + Game.time;
        // console.log('Spawning new harvester: ' + newName);
        Game.spawns['Mapu'].spawnCreep(CreepLV, newName,{memory: {role: 'builder'}});
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
        if(creep.memory.role == 'harvester1') {
            roleHarvester.run(creep,'f5680774d1c1fe8');
        }
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep,'ab9e0774d1c107c');
        }
        if(creep.memory.role == 'upgrader') {
            // console.log(JSON.stringify(creep.name) )
            roleUpgrader.run(creep,'ab9e0774d1c107c');
        }
        if(creep.memory.role == 'upgrader1') {
            // console.log(JSON.stringify(creep.name) )
            roleUpgrader.run(creep,'f5680774d1c1fe8');
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep,'ab9e0774d1c107c');
        }
        if(creep.memory.role == 'builder1') {
            roleBuilder.run(creep,'f5680774d1c1fe8');
        }
        
        if(creep.memory.role=='claimer'){
            if (creep.room.name !== 'W2N8'){
                creep.moveTo(new RoomPosition(28, 44, 'W2N8'),{visualizePathStyle: {stroke: '#ffffff'}});
            }else{
                let rs=creep.claimController(creep.room.controller) ;
                // console.log(rs)
                if(rs== ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
    }
}