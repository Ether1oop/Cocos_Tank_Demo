import { _decorator, Component, Node, Vec3, v3, EventTouch, Vec2, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('joystick_right')
export class joystick_right extends Component {
    @property
    max_R: number = 30;

    @property(Node)
    sticks: Node = null;

    public dir: Vec3 = new Vec3(0, 0, 0);

    onLoad(){
        this.sticks.setPosition(v3(0, 0, 0));
        // 触碰到摇杆，让其弹起
        this.sticks.on(Node.EventType.TOUCH_MOVE, this.on_stick_left_move, this);
        // 离开摇杆，让其恢复
        this.sticks.on(Node.EventType.TOUCH_END,function(){
            this.on_stick_left_end();
        }, this);
        // 如果没有触碰摇杆，也让其恢复
        this.sticks.on(Node.EventType.TOUCH_CANCEL, function(){
            this.on_stick_left_end();
        }, this);
    }

    // 触摸左摇杆事件
    on_stick_left_move(e: EventTouch): void{
        var screen_pos: Vec2 = e.getLocation();
        var pos: Vec3 = new Vec3();
        this.node.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(screen_pos.x, screen_pos.y, 0), pos);
        
        var len: number = Vec3.len(pos);
        // if(len <= 20){
        //     this.sticks.setPosition(pos.x, pos.y);
        //     return;
        // }

        this.dir.x = pos.x / len;
        this.dir.y = pos.y / len;
        if(len > this.max_R){
            pos.x = pos.x * this.max_R / len;
            pos.y = pos.y * this.max_R / len;
        }
        
        this.sticks.setPosition(pos.x, pos.y);
    }

    // 离开左摇杆事件
    on_stick_left_end(): void{
        // this.dir = v3(0, 0, 0);
        this.sticks.setPosition(v3(0, 0, 0));
    }



    start() {

    }

    update(deltaTime: number) {
        
    }
}


