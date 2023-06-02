import { _decorator, Component, Node, v2, Vec2, director, PhysicsSystem2D, game, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('enable_phy')
export class enable_phy extends Component {

    @property
    gravity: Vec2 = v2(0,0);

    onLoad(){
        PhysicsSystem2D.instance.enable = true;
        PhysicsSystem2D.instance.gravity = this.gravity;
        this.node.getChildByName('UI_root').getChildByName('Score').getComponent(Label).string = (0).toString();
        this.node.getChildByName('UI_root').getChildByName('alter').active = false;
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}


