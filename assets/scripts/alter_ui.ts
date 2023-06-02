import { _decorator, Component, director, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('alter_ui')
export class alter_ui extends Component {

    start() {
        var alter = director.getScene().getChildByName('Canvas').getChildByName('UI_root').getChildByName('alter');

        var score = alter.getParent().getChildByName('Score').getComponent(Label).string;
        alter.getChildByName('ui_bg').getChildByName('clear').getComponent(Label).string = "你的得分： " + score;
    }

    update(deltaTime: number) {
        
    }
}


