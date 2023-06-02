import { _decorator, BoxCollider2D, Component, Contact2DType, director, instantiate, Label, math, Node, Prefab, RigidBody2D, sp, Vec2, Vec3 } from 'cc';
import { generate_enemy } from './generate_enemy';
const { ccclass, property } = _decorator;

@ccclass('enemy_control')
export class enemy_control extends Component {
    @property(Prefab)
    bang: Prefab = null;

    @property(Prefab)
    bullet: Prefab = null;

    // 开火频率，每 Frequency 秒 发出一枚子弹
    @property
    Frequency: number = 1;
    // 攻击范围
    @property
    attack_range: number = 200;
    // 巡逻范围从出生地到目的地
    @property
    target_position: Vec3 = new Vec3(math.randomRangeInt(80, 880), math.randomRange(400, 560), 0);/** (70,560) (885,560)*/
    // 移动速度
    @property
    speed: number = 1;

    // @property(Node)
    // player: Node = null;

    // @property(generate_enemy)
    // play_info: generate_enemy = null;

    // 敌人位置坐标
    private enemy_position: Vec3 = new Vec3(0, 0, 0);
    // 自己的出生位置
    private birth_position: Vec3 = new Vec3(0, 0, 0);

    firePoint: Node = null;
    private body: RigidBody2D = null;
    private player: Node = null;

    protected onLoad(): void {
        let collider = this.node.getComponent(BoxCollider2D);
        if(collider){
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContract, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContract, this);
        }
    }

    start() {
        this.player = director.getScene().getChildByName('Canvas').getChildByName("player");
        this.firePoint = this.node.getChildByName("_fire_point");
        this.body = this.node.getComponent(RigidBody2D);
        this.birth_position = this.node.getWorldPosition();

        // console.log(this.node.getWorldPosition());
        // console.log(this.birth_position);
        // console.log(this.target_position);

        this.schedule(function(){
            if(this.search()){
                // 如果玩家在攻击范围内，就开火
                this.fire();
            }
        }, this.Frequency);
    }

    onBeginContract(){
        var score = director.getScene().getChildByName('Canvas').getChildByName('UI_root').getChildByName('Score').getComponent(Label).string;
        director.getScene().getChildByName('Canvas').getChildByName('UI_root').getChildByName('Score').getComponent(Label).string = (Number(score) + 1).toString();
        // console.log(score);

        let _bang = instantiate(this.bang);
        _bang.setParent(director.getScene().getChildByName('Canvas').getChildByName('Bomb'));
        _bang.setWorldPosition(this.node.getWorldPosition());
        this.scheduleOnce(function() {
            _bang.destroy();
            this.node.destroy();
            
            var _child = director.getScene().getChildByName('Canvas').getChildByName('Bomb').children;
            // console.log(_child.length);
            for(var i = _child.length - 1; i >= 0; i--){
                _child[i].destroy();
            }
        }, 0.15);

    }

    onEndContract(){

    }

    // 开火
    fire(){
        let _bullet = instantiate(this.bullet);
        _bullet.angle = this.node.angle - 90;
        _bullet.setParent(director.getScene().getChildByName("Canvas"));
        _bullet.setWorldPosition(this.firePoint.getWorldPosition());
        // console.log(_bullet.angle);
        // console.log()
        // console.log("firepoint" + this.firePoint.getWorldPosition());
        // console.log("tank" + this.node.getWorldPosition());
        // console.log("bullet" + _bullet.getWorldPosition());
        // console.log("-----------");
    }

    // 判断玩家是否在攻击范围内
    search():boolean{
        // console.log(this.player);
        if(!this.player.isValid){
            return false;
        }

        this.enemy_position = this.player.getWorldPosition();
        var len = new Vec2(this.enemy_position.x - this.node.getWorldPosition().x, this.enemy_position.y - this.node.getWorldPosition().y).length();
        if(len < this.attack_range){
            return true;
        }else{
            return false;
        }
    }

    update(deltaTime: number) {
        this.node.angle = this.calculateAngle();
        // console.log("angle:" + this.node.angle);
        // console.log("----------");

        var direction = new Vec2(this.target_position.x - this.node.getWorldPosition().x, this.target_position.y - this.node.getWorldPosition().y);
        var len = direction.length();
        // console.log("target" + this.target_position);
        // console.log("dir" + direction);
        // console.log("now" + this.node.getWorldPosition());
        // console.log("birth" + this.birth_position);
        // console.log("enemy:" + this.enemy_position);
        // console.log("--------------");
        
        if(math.bits.abs(direction.x) > 1 || math.bits.abs(direction.y) > 1){
            this.body.linearVelocity = new Vec2(this.speed * direction.x / len, this.speed * direction.y / len);
        }else{
            this.target_position = this.birth_position;
            this.birth_position = this.node.getWorldPosition();
        }
    }


    // 根据玩家位置，计算出开火角度
    calculateAngle():number{
        var distance = new Vec2(this.enemy_position.x - this.node.getWorldPosition().x, this.enemy_position.y - this. node.getWorldPosition().y);
        // console.log("distance:" + distance);
        var r: number = Math.atan2(distance.y, distance.x);

        return r * 180 / Math.PI;
    }
}


