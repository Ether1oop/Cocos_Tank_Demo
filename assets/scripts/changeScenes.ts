import { _decorator, Button, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('changeScenes')
export class changeScenes extends Component {
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
        director.loadScene("graph");
        // console.log(director.getScene());
    }
}


