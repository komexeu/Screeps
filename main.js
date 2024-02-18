var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

var roleOuterHarvester = require('role.outer_harvester');
var roleOuterBuilder = require('role.outer_builder');



module.exports.loop = function () {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

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

    var claimer = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
    var attacker = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
    var healther = _.filter(Game.creeps, (creep) => creep.memory.role == 'healther');
    var new_harvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'new_harvester');

    Game.spawns['Mapu'].room.visual.text('👷L: ' + harvesters.length, 1, 3, { align: 'left', opacity: 0.8 });
    Game.spawns['Mapu'].room.visual.text('👷R: ' + harvesters1.length, 1, 4, { align: 'left', opacity: 0.8 });
    Game.spawns['Mapu'].room.visual.text('🚧L: ' + builder.length, 1, 5, { align: 'left', opacity: 0.8 });
    Game.spawns['Mapu'].room.visual.text('🚧R: ' + builder1.length, 1, 6, { align: 'left', opacity: 0.8 });
    Game.spawns['Mapu'].room.visual.text('🔨: ' + repairer.length, 1, 7, { align: 'left', opacity: 0.8 });
    Game.spawns['Mapu'].room.visual.text('🚀: ' + attacker.filter(x => x.memory.targetRoom == 'W1N8').length, 1, 8, { align: 'left', opacity: 0.8 });
    Game.spawns['Mapu'].room.visual.text('🚑️: ' + healther.filter(x => x.memory.targetRoom == 'W1N8').length, 1, 9, { align: 'left', opacity: 0.8 });
    Game.spawns['Mapu'].room.visual.text('⬆️L: ' + upgrader.length, 1, 10, { align: 'left', opacity: 0.8 });
    Game.spawns['Mapu'].room.visual.text('⬆️R: ' + upgrader1.length, 1, 11, { align: 'left', opacity: 0.8 });

    Game.spawns['Mapu'].room.visual.text('🐛👷L: ' + outer_harvestersL.length, 5, 3, { align: 'left', opacity: 0.8 });
    Game.spawns['Mapu'].room.visual.text('🐛👷R: ' + outer_harvestersR.length, 5, 4, { align: 'left', opacity: 0.8 });
    Game.spawns['Mapu'].room.visual.text('🐛🚧L: ' + outer_buildersL.length, 5, 5, { align: 'left', opacity: 0.8 });
    Game.spawns['Mapu'].room.visual.text('🐛🚧R: ' + outer_buildersR.length, 5, 6, { align: 'left', opacity: 0.8 });
    Game.spawns['Mapu'].room.visual.text('🔨: ' + repairerw2n8.length, 5, 7, { align: 'left', opacity: 0.8 });
    Game.spawns['Mapu'].room.visual.text('🚀: ' + _.filter(attacker, x => x.memory.targetRoom == 'W2N8').length, 5, 8, { align: 'left', opacity: 0.8 });
    Game.spawns['Mapu'].room.visual.text('🚑️: ' + healther.filter(x => x.memory.targetRoom == 'W2N8').length, 5, 9, { align: 'left', opacity: 0.8 });
    Game.spawns['Mapu'].room.visual.text('🚩: ' + claimer.filter(x => x.memory.targetRoom == 'W2N8').length, 5, 10, { align: 'left', opacity: 0.8 });

    Game.spawns['Mapu'].room.visual.text('👷: ' + _.filter(new_harvester, x => x.memory.sourceRoom == 'W3N8' && x.memory.sourceId == '9d330774017e6b9').length, 15, 3, { align: 'left', opacity: 0.8 });
    Game.spawns['Mapu'].room.visual.text('👷: ' + _.filter(new_harvester, x => x.memory.sourceRoom == 'W3N8' && x.memory.sourceId == 'ebdd0774017409d').length, 15, 4, { align: 'left', opacity: 0.8 });
    Game.spawns['Mapu'].room.visual.text('🚩: ' + claimer.filter(x => x.memory.targetRoom == 'W2N9').length, 10, 10, { align: 'left', opacity: 0.8 });

    Game.spawns['Mapu'].room.visual.text('🚩: ' + claimer.filter(x => x.memory.targetRoom == 'W3N8').length, 15, 10, { align: 'left', opacity: 0.8 });

    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            // console.log('Clearing non-existing creep memory:', name);
        }
    }

    if (claimer.length != 0) {
        claimer = _.sortBy(claimer, (creep) => creep.ticksToLive)
        //   console.log(claimer[0].ticksToLive)
    }

    if (Game.rooms['W1N8'].find(FIND_HOSTILE_CREEPS).length > 0
        || attacker.filter(x => x.memory.targetRoom == 'W1N8').length < 1) {
        if (attacker.filter(x => x.memory.targetRoom == 'W1N8').length < 3) {
            Game.spawns['Mapu'].spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK], `🚀_${Game.time}`, { memory: { role: 'attacker', targetRoom: 'W1N8' } });
        }

        var towers = Game.spawns['Mapu'].room.find(FIND_STRUCTURES, {
            filter: { structureType: STRUCTURE_TOWER }
        });
        for (var i = 0; i < towers.length; ++i) {
            let tower = towers[i];
            var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (target) {
                tower.attack(target);
            }
        }
    }

    if (Game.rooms['W2N8'].find(FIND_HOSTILE_CREEPS).length > 0
        || attacker.filter(x => x.memory.targetRoom == 'W2N8').length < 1) {
        if (attacker.filter(x => x.memory.targetRoom == 'W2N8').length < 3) {
            Game.spawns['Mapu'].spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK], `🚀_${Game.time}`, { memory: { role: 'attacker', targetRoom: 'W2N8' } });
        }
    }

    if (Game.rooms['W1N8'].find(FIND_HOSTILE_CREEPS).length > 0
        || healther.filter(x => x.memory.targetRoom == 'W1N8').length < 1) {
        if (healther.filter(x => x.memory.targetRoom == 'W1N8').length < 2) {
            Game.spawns['Mapu'].spawnCreep([TOUGH, MOVE, MOVE, HEAL, HEAL], `🚑️_${Game.time}`, { memory: { role: 'healther', targetRoom: 'W1N8' } });
        }
    }
    if (Game.rooms['W2N8'].find(FIND_HOSTILE_CREEPS).length > 0
        || healther.filter(x => x.memory.targetRoom == 'W2N8').length < 1) {
        if (healther.filter(x => x.memory.targetRoom == 'W2N8').length < 2) {
            Game.spawns['Mapu'].spawnCreep([TOUGH, MOVE, MOVE, HEAL, HEAL], `🚑️_${Game.time}`, { memory: { role: 'healther', targetRoom: 'W2N8' } });
        }
    }

    const LV0 = [WORK, CARRY, MOVE, MOVE];
    const LV1 = [WORK, WORK, CARRY, MOVE, MOVE];
    const LV2 = [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE];
    const LV3 = [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
    const LV4 = [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
    const LV1200 = [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];

    const LVReparer = [WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
    const CreepLV = LV3;


    let claimerw2n8 = claimer.filter(x => x.memory.targetRoom == 'W2N8');
    let claimerw3n8 = claimer.filter(x => x.memory.targetRoom == 'W3N8');
    let claimerw2n9 = claimer.filter(x => x.memory.targetRoom == 'W2N9');

    let centerLevel = 0;

    if (harvesters1.length < 6) {
        centerLevel = 1;
        var newName = '👷R_' + Game.time;
        Game.spawns['Mapu'].spawnCreep(CreepLV, newName, { memory: { role: 'harvester1', targetRoom: 'W1N8', sourceRoom: 'W1N8', sourceId: 'f5680774d1c1fe8' } });
    }
    else if (claimerw2n8.length < 1 || (claimerw2n8.length == 1 && claimerw2n8[0].ticksToLive < 150)) {
        centerLevel = 2;
        Game.spawns['Mapu'].spawnCreep([CLAIM, MOVE], '🚩_' + Game.time, { memory: { role: 'claimer', targetRoom: 'W2N8' } });
    }
    else if (claimerw3n8.length < 1 || (claimerw3n8.length == 1 && claimerw2n8[0].ticksToLive < 150)) {
        centerLevel = 3;
        Game.spawns['Mapu'].spawnCreep([CLAIM, MOVE], '🚩_' + Game.time, { memory: { role: 'claimer', targetRoom: 'W3N8' } });
    }
    // else if (claimerw2n9.length < 1 || (claimerw2n9.length == 1 && claimerw2n9[0].ticksToLive < 150)) {
    //     Game.spawns['Mapu'].spawnCreep([CLAIM, MOVE], '🚩_' + Game.time, { memory: { role: 'claimer', targetRoom: 'W2N9' } });
    // } 
    else if (upgrader1.length < 1) {
        centerLevel = 4;
        var newName = '⬆️_' + Game.time;
        Game.spawns['Mapu'].spawnCreep(LV0, newName, { memory: { role: 'upgrader1', targetRoom: 'W1N8', sourceRoom: 'W1N8', sourceId: 'f5680774d1c1fe8' } });
    } else if (repairerw2n8.length < 1) {
        centerLevel = 5;
        var newName = '🔨w2n8_' + Game.time;
        Game.spawns['Mapu'].spawnCreep(LV1200, newName, { memory: { role: 'repairerw2n8', targetRoom: 'W2N8', sourceRoom: 'W1N8' } });
    }
    //  new_harvester    
    else if (outer_harvestersR.length < 7) {
        centerLevel = 6;
        var newName = '🐛👷R_' + Game.time;
        Game.spawns['Mapu'].spawnCreep(CreepLV, newName, { memory: { role: 'outer_harvestersR', targetRoom: 'W1N8', sourceRoom: 'W2N8', sourceId: '2484077468064e9' } });
    } else if (outer_harvestersL.length < 8) {
        centerLevel = 7;
        var newName = '🐛👷L_' + Game.time;
        Game.spawns['Mapu'].spawnCreep(CreepLV, newName, { memory: { role: 'outer_harvestersL', targetRoom: 'W1N8', sourceRoom: 'W2N8', sourceId: 'ad7c07746802348' } });
    }
    else if (_.filter(new_harvester, x => x.memory.sourceRoom == 'W3N8' && x.memory.sourceId == '9d330774017e6b9').length < 1) {
        centerLevel = 8;
        var newName = '👷_' + Game.time;
        Game.spawns['Mapu'].spawnCreep(LV1200, newName, { memory: { role: 'new_harvester', targetRoom: 'W1N8', sourceRoom: 'W3N8', sourceId: '9d330774017e6b9' } });
    }
    else if (_.filter(new_harvester, x => x.memory.sourceRoom == 'W3N8' && x.memory.sourceId == 'ebdd0774017409d').length < 1) {
        centerLevel = 9;
        var newName = '👷_' + Game.time;
        Game.spawns['Mapu'].spawnCreep(LV1200, newName, { memory: { role: 'new_harvester', targetRoom: 'W1N8', sourceRoom: 'W3N8', sourceId: 'ebdd0774017409d' } });
    }
    else if (harvesters.length < 5) {
        centerLevel = 10;
        var newName = '👷_' + Game.time;
        Game.spawns['Mapu'].spawnCreep(CreepLV, newName, { memory: { role: 'harvester', targetRoom: 'W1N8', sourceRoom: 'W1N8', sourceId: 'ab9e0774d1c107c' } });
    }
    //  new_harvester

    else if (repairer.length < 3) {
        centerLevel = 11;
        var newName = '🔨_' + Game.time;
        Game.spawns['Mapu'].spawnCreep(LV1200, newName, { memory: { role: 'repairer', targetRoom: 'W1N8', sourceRoom: 'W1N8' } });
    } else if (upgrader.length < 2) {
        centerLevel = 12;
        var newName = '⬆️_' + Game.time;
        Game.spawns['Mapu'].spawnCreep(CreepLV, newName, { memory: { role: 'upgrader', targetRoom: 'W1N8', sourceRoom: 'W1N8' } });
    }

    // show when build
    if (Game.spawns['Mapu'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Mapu'].spawning.name];
        Game.spawns['Mapu'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Mapu'].pos.x + 1,
            Game.spawns['Mapu'].pos.y,
            { align: 'left', opacity: 0.8 });
    }
    Game.spawns['Mapu'].room.visual.text('🛠️CenterLV :  ' + centerLevel, 40, 5, { align: 'left', opacity: 0.8 });

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'upgrader') {
            // console.log(JSON.stringify(creep.name) )
            roleUpgrader.run(creep, 'ab9e0774d1c107c');
        }
        if (creep.memory.role == 'upgrader1') {
            // console.log(JSON.stringify(creep.name) )
            roleUpgrader.run(creep, 'f5680774d1c1fe8');
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep, 'ab9e0774d1c107c');
        }
        if (creep.memory.role == 'builder1') {
            roleBuilder.run(creep, 'f5680774d1c1fe8');
        }

        if (creep.memory.role == 'harvester1') {
            roleHarvester.run(creep, creep.memory.sourceId);
        }
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep, creep.memory.sourceId);
        }
        if (creep.memory.role == 'outer_harvestersR') {
            roleOuterHarvester.run(creep, creep.memory.sourceId);
        }
        if (creep.memory.role == 'outer_harvestersL') {
            roleOuterHarvester.run(creep, creep.memory.sourceId);
        }
        if (creep.memory.role == 'new_harvester') {
            roleOuterHarvester.run(creep, creep.memory.sourceId);
            if(creep.memory.sourceId=='68050773313e4cb'){
            //    var rs= creep.moveTo(new RoomPosition(19, 5, creep.memory.sourceRoom), { visualizePathStyle: { stroke: '#ff00ff' } });
            //    console.log(rs)
            }
        }


        if (creep.memory.role == 'outer_buildersL') {
            roleOuterBuilder.run(creep, '2484077468064e9', 'W2N8', 'W1N8', '🐛🚧1');
        }
        if (creep.memory.role == 'outer_buildersR') {
            roleOuterBuilder.run(creep, 'ad7c07746802348', 'W2N8', 'W1N8', '🐛🚧2');
        }

        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep, 'W1N8', 'W1N8')
        }
        if (creep.memory.role == 'repairerw2n8') {
            roleRepairer.run(creep, 'W1N8', 'W2N8')
        }


        if (creep.memory.role == 'attacker') {
            // creep.say('🚀')
            if (creep.room.name != creep.memory.targetRoom) {
                creep.moveTo(new RoomPosition(47, 24, creep.memory.targetRoom), { visualizePathStyle: { stroke: '#ffffff' } });
            } else {
                const enemies = creep.room.find(FIND_HOSTILE_CREEPS);
                if (enemies.length > 0) {
                    const targetEnemy = creep.pos.findClosestByRange(enemies);
                    const attackResult = creep.attack(targetEnemy);
                    creep.say('🚨')
                    if (attackResult === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targetEnemy.pos)
                    }
                    else if (attackResult === OK) {
                        console.log(`Creep 攻擊 ${targetEnemy.name}`);
                    } else {
                        if (attackResult !== ERR_BUSY) { console.log(`攻擊失敗，ERROR Code: ${attackResult}`); }
                    }
                } else {
                    creep.moveTo(new RoomPosition(27, 41, creep.memory.targetRoom), { visualizePathStyle: { stroke: '#ffffff' } });
                    // console.log('未找到敵人');
                }
            }
        }

        if (creep.memory.role == 'claimer') {
            if (creep.room.name == creep.memory.targetRoom) {
                // let rs=creep.claimController(creep.room.controller) ;
                let rs = creep.reserveController(creep.room.controller);
                if (rs == ERR_NOT_IN_RANGE) {
                    // // 卡路徑BUG
                    // if (creep.pos.x != 31 && creep.pos.y != 20 && creep.pos.x > 31 && creep.memory.targetRoom == 'W2N8') {
                    //     creep.moveTo(new RoomPosition(31, 20, 'W2N8'), { visualizePathStyle: { stroke: '#ff00ff' } });
                    // } else
                    {
                        creep.moveTo(creep.room.controller);
                    }
                }
            } else {
                creep.say('🚩' + creep.memory.targetRoom)
                creep.moveTo(new RoomPosition(19, 5, creep.memory.targetRoom), { visualizePathStyle: { stroke: '#ff00ff' } });
            }
        }

        if (creep.memory.role == 'healther') {
            if (creep.room.name == creep.memory.targetRoom) {
                var injuredCreep = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                    filter: creep => creep.hits < creep.hitsMax
                });
                if (injuredCreep) {
                    let rs = creep.heal(injuredCreep);
                    creep.say('💚')
                    if (rs === ERR_NOT_IN_RANGE) {
                        creep.moveTo(injuredCreep.pos)
                    }
                } else {
                    creep.moveTo(16, 40, { visualizePathStyle: { stroke: '#ff00ff' } });
                }
            } else {
                creep.moveTo(new RoomPosition(19, 5, creep.memory.targetRoom), { visualizePathStyle: { stroke: '#ff00ff' } });
            }
        }
    }
}