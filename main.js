var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

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

    var claimer = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var harvesters1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester1');
    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var upgrader1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader1');
    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var builder1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder1');
    var repairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var repairerw2n8 = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairerw2n8');
    
    var outer_harvestersR = _.filter(Game.creeps, (creep) => creep.memory.role == 'outer_harvestersR');
    var outer_harvestersL = _.filter(Game.creeps, (creep) => creep.memory.role == 'outer_harvestersL');
    var outer_buildersL = _.filter(Game.creeps, (creep) => creep.memory.role == 'outer_buildersL');
    var outer_buildersR = _.filter(Game.creeps, (creep) => creep.memory.role == 'outer_buildersR');
    if(i==0){
        console.log('claimer :' + claimer);
        console.log('harvester :' + harvester);
        console.log('harvester1 :' + harvester1);
        console.log('upgrader :' + upgrader);
        console.log('upgrader1 :' + upgrader1);
        console.log('builder :' + builder);
        console.log('builder1 :' + builder1);
        console.log('repairer :' + repairer);
        console.log('repairerw2n8 :' + repairerw2n8);
        
        console.log('outer_harvestersR :' + outer_harvestersR);
        console.log('outer_harvestersL :' + outer_harvestersL);
        console.log('outer_buildersL :' + outer_buildersL);
        console.log('outer_buildersR :' + outer_buildersR);
    }

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            // console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    if(claimer.length !=0){
       claimer = _.sortBy(claimer,(creep) => creep.ticksToLive)
    //   console.log(claimer[0].ticksToLive)
    }
    
    if( Game.rooms['W2N8'].find(FIND_HOSTILE_CREEPS).length > 0){
        if(_.filter(Game.creeps, (creep) => creep.memory.role == 'attacker').length < 6){
            Game.spawns['Mapu'].spawnCreep([ATTACK, MOVE], `Attacker_${Game.time}`, { memory: { role: 'attacker', targetRoom: 'W2N8' } });
        }
    }
    
    const LV0=[WORK,CARRY,MOVE,MOVE];
    const LV1=[WORK,WORK,CARRY,MOVE,MOVE];
    const LV2=[WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE];
    const LV3=[WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
    const LV4=[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
    
    const LVReparer=[WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]
    const CreepLV=LV3;
    
    if(repairer.length < 7 ){
        var newName = 'Repairer_' + Game.time;
        Game.spawns['Mapu'].spawnCreep(LVReparer, newName,{memory: {role: 'repairer'}});
    }if(repairerw2n8.length < 1 ){
        var newName = 'repairerw2n8_' + Game.time;
        Game.spawns['Mapu'].spawnCreep(LVReparer, newName,{memory: {role: 'repairerw2n8'}});
    }else if(claimer.length < 1 || (claimer.length == 1 && claimer[0].ticksToLive < 250)) {
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
    }else if(upgrader.length < 4) {
        var newName = 'Upgrader_' + Game.time;
        Game.spawns['Mapu'].spawnCreep(LV4, newName,{memory: {role: 'upgrader'}});
    }else if(upgrader1.length < 1) {
        var newName = 'Upgrader1_' + Game.time;
        Game.spawns['Mapu'].spawnCreep(LV4, newName,{memory: {role: 'upgrader1'}});
    }
    // else if(repairer.length <2 ){
    //     Game.spawns['Mapu'].spawnCreep(LVReparer, newName,{memory: {role: 'repairer'}});
    // }
    
    // else if(builder1.length < 2) {
    //     var newName = 'Builder1_' + Game.time;
    //     Game.spawns['Mapu'].spawnCreep(CreepLV, newName,{memory: {role: 'builder1'}});
    // }else if(builder.length < 4) {
    //     var newName = 'Builder_' + Game.time;
    //     Game.spawns['Mapu'].spawnCreep(CreepLV, newName,{memory: {role: 'builder'}});
    // }
    
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
        
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep,'W1N8','W1N8')
        }
        if(creep.memory.role == 'repairerw2n8') {
            roleRepairer.run(creep,'W1N8','W2N8')
        }
        
        
        if(creep.memory.role == 'attacker') {
            creep.say('🚨')
            if (creep.room.name != 'W2N8'){
                 creep.moveTo(new RoomPosition(18, 4, W2N8),{visualizePathStyle: {stroke: '#ffffff'}});
            }else{
                const enemies = creep.room.find(FIND_HOSTILE_CREEPS);
                if (enemies.length > 0) {
                    const targetEnemy = creep.pos.findClosestByRange(enemies);
                    const attackResult = creep.attack(targetEnemy);
                
                    if (attackResult === OK) {
                        console.log(`Creep 攻擊 ${targetEnemy.name}`);
                    } else {
                        console.log(`攻擊失敗，ERROR Code: ${attackResult}`);
                    }
                } else {
                    console.log('未找到敵人');
                }
            }
        }
        
        if(creep.memory.role=='claimer'){
            creep.say('🚩')
            if (creep.room.name == 'W2N8'){
                // let rs=creep.claimController(creep.room.controller) ;
                let rs=creep.reserveController(creep.room.controller) ;
                // console.log(rs)
                if(rs== ERR_NOT_IN_RANGE) {
                    // 卡路徑BUG
                    if(creep.pos.x>35){
                        creep.moveTo(new RoomPosition(19, 6, 'W2N8'),{visualizePathStyle: {stroke: '#ff00ff'}});
                    }else{
                        creep.moveTo(creep.room.controller);
                    }
                }
            }else{
                creep.moveTo(new RoomPosition(19, 5, 'W2N8'),{visualizePathStyle: {stroke: '#ff00ff'}});
            }
        }
    }
}