import { _decorator, Component, director, instantiate, Node, Prefab, UITransform, Vec2, Vec3 } from 'cc';
import { joystick_right } from './joystick_right';
const { ccclass, property } = _decorator;

@ccclass('shoot')
export class shoot extends Component {
    // @property(Node)
    // fire_point: Node = null;

    @property(Prefab)
    bullet: Prefab = null;

    @property(joystick_right)
    stick: joystick_right = null;

    @property(Node)
    tank: Node = null;

    firePoint: Node = null;

    protected onLoad(): void {
        this.node.on(Node.EventType.TOUCH_START, this.on_shoot, this);
        this.node.on(Node.EventType.TOUCH_END, this.off_shoot, this);
    }

    on_shoot(){
        // console.log(this.tank.isValid);
        if(this.tank.isValid){
            // 生成一个子弹
            let _bullet = instantiate(this.bullet);
            // 设置子弹的角度
            if(this.stick.dir.x == 0 && this.stick.dir.y == 0){
                _bullet.angle = 0;
            }else{
                var r: number = Math.atan2(this.stick.dir.y, this.stick.dir.x);
                _bullet.angle = r * 180 / Math.PI - 90;
            }
            // 创建子弹
            _bullet.setParent(director.getScene().getChildByName('Canvas'));
            // 设置子弹的位置
            _bullet.setWorldPosition(this.firePoint.getWorldPosition());
        }


    }

    off_shoot(){    
        // this.isFire = false;
    }

    start() {
        this.firePoint = this.tank.getChildByName("fire_point");
    }

    update(deltaTime: number) {
        // console.log(this.firePoint);
    }
}


