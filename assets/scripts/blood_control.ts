import { _decorator, Component, Node, Sprite } from 'cc';
import { tank_control } from './tank_control';
const { ccclass, property } = _decorator;

@ccclass('blood_control')
export class blood_control extends Component {
    @property(tank_control)
    tank: tank_control = null;

    start() {
        this.node.getComponent(Sprite).fillRange = 1;
    }

    update(deltaTime: number) {
        this.node.getComponent(Sprite).fillRange = this.tank.cur_blood_num / this.tank.ori_blood_num;
        // console.log(this.node.getComponent(Sprite).fillRange);
    }
}


