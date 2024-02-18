
var roleClaimer = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.sayTag){
            creep.say(creep.memory.sayBasic)
        }
        if (creep.room.name == creep.memory.targetRoom){
            let rs = creep.reserveController(creep.room.controller) ;
            if(rs== ERR_NOT_IN_RANGE) {
                // // 卡路徑BUG
                // if(creep.pos.x!=31 && creep.pos.y!=20 && creep.pos.x>31){
                //     creep.moveTo(new RoomPosition(31, 20, 'W2N8'),{visualizePathStyle: {stroke: '#ff00ff'}});
                // }else
                {
                    creep.moveTo(creep.room.controller);
                }
            }
        }else{
            creep.moveTo(new RoomPosition(19, 5, creep.memory.targetRoom),{visualizePathStyle: {stroke: '#ff00ff'}});
        }
	}
};

module.exports = roleClaimer;