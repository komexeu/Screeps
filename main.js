var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var roleOuterHarvester = require('role.outer_harvester');
var roleOuterBuilder = require('role.outer_builder');

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
        console.log('outer_harvestersR :' + _.filter(Game.creeps, (creep) => creep.memory.role == 'outer_harvestersR'));
        console.log('outer_harvestersL :' + _.filter(Game.creeps, (creep) => creep.memory.role == 'outer_harvestersL'));
        console.log('outer_buildersL :' + _.filter(Game.creeps, (creep) => creep.memory.role == 'outer_buildersL'));
        console.log('outer_buildersR :' + _.filter(Game.creeps, (creep) => creep.memory.role == 'outer_buildersR'));
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
    var outer_harvestersR = _.filter(Game.creeps, (creep) => creep.memory.role == 'outer_harvestersR');
    var outer_harvestersL = _.filter(Game.creeps, (creep) => creep.memory.role == 'outer_harvestersL');
    var outer_buildersL = _.filter(Game.creeps, (creep) => creep.memory.role == 'outer_buildersL');
    var outer_buildersR = _.filter(Game.creeps, (creep) => creep.memory.role == 'outer_buildersR');
    
    if(claimer.length !=0){
       claimer = _.sortBy(claimer,(creep) => creep.ticksToLive)
    //   console.log(claimer[0].ticksToLive)
    }
    
    const LV0=[WORK,CARRY,MOVE,MOVE];
    const LV1=[WORK,WORK,CARRY,MOVE,MOVE];
    const LV2=[WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE];
    const LV3=[WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
    const LV4=[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
    const CreepLV=LV3;
    
    if(claimer.length < 1 || (claimer.length == 1 && claimer[0].ticksToLive < 250)) {
        Game.spawns['Mapu'].spawnCreep( [CLAIM,MOVE],'Claimer'+ Game.time,{ memory: { role: 'claimer' } } );
    }else if(outer_harvestersR.length < 5) {
        var newName = 'OuterHarvestersR_' + Game.time;
        Game.spawns['Mapu'].spawnCreep(LV4, newName,{memory: {role: 'outer_harvestersR'}});
    }else if(harvesters.length < 1) {
        var newName = 'Harvester_' + Game.time;
        Game.spawns['Mapu'].spawnCreep(LV4, newName,{memory: {role: 'harvester'}});
    }else if(harvesters1.length < 5) {
        var newName = 'Harvester1_' + Game.time;
        Game.spawns['Mapu'].spawnCreep(CreepLV, newName,{memory: {role: 'harvester1'}});
    }else if(outer_harvestersL.length < 5) {
        var newName = 'OuterHarvestersL_' + Game.time;
        Game.spawns['Mapu'].spawnCreep(LV4, newName,{memory: {role: 'outer_harvestersL'}});
    }else if(upgrader.length < 1) {
        var newName = 'Upgrader_' + Game.time;
        Game.spawns['Mapu'].spawnCreep(CreepLV, newName,{memory: {role: 'upgrader'}});
    }else if(upgrader1.length < 1) {
        var newName = 'Upgrader1_' + Game.time;
        Game.spawns['Mapu'].spawnCreep(CreepLV, newName,{memory: {role: 'upgrader1'}});
    }else if(builder1.length < 2) {
        var newName = 'Builder1_' + Game.time;
        Game.spawns['Mapu'].spawnCreep(CreepLV, newName,{memory: {role: 'builder1'}});
    }else if(builder.length < 4) {
        var newName = 'Builder_' + Game.time;
        Game.spawns['Mapu'].spawnCreep(CreepLV, newName,{memory: {role: 'builder'}});
    }
    // else if(outer_buildersL.length<4){
    //     var newName = 'OuterBuilderL_' + Game.time;
    //     Game.spawns['Mapu'].spawnCreep(CreepLV, newName,{memory: {role: 'outer_buildersL'}});
    // }else if(outer_buildersR.length<4){
    //     var newName = 'OuterBuilderR_' + Game.time;
    //     Game.spawns['Mapu'].spawnCreep(CreepLV, newName,{memory: {role: 'outer_buildersR'}});
    // }
    
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
        if(creep.memory.role == 'outer_harvestersR') {
            roleOuterHarvester.run(creep,'2484077468064e9','W2N8','W1N8','🐛1');
        }
        if(creep.memory.role == 'outer_harvestersL') {
            roleOuterHarvester.run(creep,'ad7c07746802348','W2N8','W1N8','🐛2');
        }
        if(creep.memory.role == 'outer_buildersL') {
            roleOuterBuilder.run(creep,'2484077468064e9','W2N8','W1N8','🐛🚧1');
        }
        if(creep.memory.role == 'outer_buildersR') {
            roleOuterBuilder.run(creep,'ad7c07746802348','W2N8','W1N8','🐛🚧2');
        }
        
        if(creep.memory.role=='claimer'){
            creep.say('🚩')
            creep.moveTo(new RoomPosition(28, 44, 'W2N8'),{visualizePathStyle: {stroke: '#ffffff'}});
            if (creep.room.name == 'W2N8'){
                // let rs=creep.claimController(creep.room.controller) ;
                let rs=creep.reserveController(creep.room.controller) ;
                // console.log(rs)
                if(rs== ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
    }
}