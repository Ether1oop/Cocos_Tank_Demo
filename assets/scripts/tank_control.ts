import { _decorator, Component, Node, RigidBody, v3, Vec3, RigidBody2D, Vec2, Prefab, BoxCollider2D, Contact2DType, instantiate, director, CircleCollider2D, game, Label } from 'cc';
import { joystick_left } from './joystick_left';

const { ccclass, property } = _decorator;

@ccclass('tank_control')
export class tank_control extends Component {
    // 移动速度
    @property
    speed: number = 3.5;
    // 控制移动方向
    @property(joystick_left)
    move_stick: joystick_left = null;
    // 视角跟随
    @property(Node)
    camera: Node = null;
    // 爆炸效果
    @property(Prefab)
    bang: Prefab = null;
    // 初始生命条数,最大生命条数
    @property
    ori_blood_num: number = 3;
    // 当前生命条数
    @property
    cur_blood_num: number = 3;
    
    private offset: Vec3 = new Vec3(0, 0, 0);
    private body: RigidBody2D = null;

    onLoad(){
        this.body = this.node.getComponent(RigidBody2D);
        this.cur_blood_num = this.ori_blood_num;
    }

    start() {
        let collider = this.node.getComponent(CircleCollider2D);
        // console.log(collider);
        if(collider){
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContract, this);
        }
    }

    update(deltaTime: number) {
        // 检测生命条数
        // console.log("blood " + this.cur_blood_num);
        // console.log(this.node.children);
        if(this.cur_blood_num <= 0){
            let _bang = instantiate(this.bang);
            _bang.setParent(director.getScene().getChildByName('Canvas').getChildByName('Bomb'));
            _bang.setWorldPosition(this.node.getWorldPosition());
            this.scheduleOnce(function() {
                _bang.destroy();
                // this.node.destroy();
            }, 0.15);
            this.scheduleOnce(function(){
                var alter = director.getScene().getChildByName('Canvas').getChildByName('UI_root').getChildByName('alter');
                alter.active = true;
                // director.getScene().getChildByName('Canvas').getChildByName('UI_root').getChildByName('alter').active = true;

                // director.loadScene("start");
                // director.pause();
                // game.start();
            },0.1);
        }
        // 加了摄像机视角后，有点丢帧的感觉
        if(this.camera != null){
            this.camera.setPosition(this.node.getPosition());
            // console.log(this.camera.getPosition());
        }

        // 设置移动速度
        if(this.move_stick.dir.x == 0 && this.move_stick.dir.y == 0){
            this.body.linearVelocity = new Vec2(0, 0);
            return;
        }
        var vx: number = this.speed * this.move_stick.dir.x;
        var vy: number = this.speed * this.move_stick.dir.y;
        this.body.linearVelocity = new Vec2(vx, vy);
        // console.log(this.node.getWorldPosition());


    }

    // 被子弹碰撞后，生命-1。
    // 若生命为0，则显示爆炸效果并销毁
    onBeginContract(){
        this.cur_blood_num--;
    }
}


