import { _decorator, BoxCollider2D, Component, Contact2DType, misc, Node, RigidBody2D, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bullet_control')
export class bullet_control extends Component {
    @property
    bullet_speed: number = 5;

    private body: RigidBody2D = null;

    onLoad(){
        this.body = this.node.getComponent(RigidBody2D);
    }

    start() {
        
        let collider = this.node.getComponent(BoxCollider2D);
        if(collider){
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContract, this);
        }
        let r = misc.degreesToRadians(this.node.angle);
        let _v2 = new Vec2(0, 1).rotate(r);
        this.body.linearVelocity = new Vec2(_v2.x * this.bullet_speed, _v2.y * this.bullet_speed);

    }

    update(deltaTime: number) {

    }

    onBeginContract(){
        this.node.destroy();
        // console.log("destroy");
    }
}


