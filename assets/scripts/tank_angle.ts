import { _decorator, Component, Node, RigidBody2D } from 'cc';
import { joystick_right } from './joystick_right';

const { ccclass, property } = _decorator;

@ccclass('tank_angle')
export class tank_angle extends Component {
    
    @property(joystick_right)
    turn_stick: joystick_right = null;
    
    start() {

    }

    update(deltaTime: number) {
        if(this.turn_stick.dir.x == 0 && this.turn_stick.dir.y == 0){
            this.node.angle = 0;
            return;
        }

        var r: number = Math.atan2(this.turn_stick.dir.y, this.turn_stick.dir.x);
        var degree: number = r * 180 / Math.PI - 90;

        // console.log(degree);
        this.node.angle = degree;
    }
}


