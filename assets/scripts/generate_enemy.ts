import { _decorator, Component, director, instantiate, math, Node, Prefab, UIRenderer, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('generate_enemy')
export class generate_enemy extends Component {
    // 敌人数量
    @property
    enemy_num: number = 1;
    // 敌人生成间隔时间
    @property
    enemy_generate_time: number = 2;

    @property(Prefab)
    enemy_tank: Prefab = null;

    start() {
        // this.schedule(function(){
        //     this.generateOneEnemy();
        // }, this.enemy_generate_time, this.enemy_num - 1);
    }

    update(deltaTime: number) {
        if(this.node.children.length < this.enemy_num){
            this.generateOneEnemy();
        }
    }

    generateOneEnemy(){
        let _tank = instantiate(this.enemy_tank);
        _tank.setParent(director.getScene().getChildByName('Canvas').getChildByName('enemy_birth_area'));
        var random_pos = new Vec3(math.randomRangeInt(80,880), math.randomRange(200,560), 0);
        // var new_pos = director.getScene().getChildByName('Canvas').getComponent(UITransform).convertToNodeSpaceAR(random_pos);
        _tank.setWorldPosition(random_pos);
    }
}


