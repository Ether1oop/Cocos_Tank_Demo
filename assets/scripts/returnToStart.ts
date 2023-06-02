import { _decorator, Button, Component, director, Node } from 'cc';
import { BUILD } from 'cc/env';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class NewComponent extends Component {
    @property(Button)
    button: Button = null;

    protected onLoad(): void {
        this.button.node.on(Button.EventType.CLICK, this.callback, this);

    }

    start() {

    }

    update(deltaTime: number) {
        
    }
    callback(): void {
        // director.resume();
        director.loadScene("start");
    }
}


