import { _decorator, math, Component, Node } from 'cc';

const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Node)
    public Bg1: Node = null;

    @property(Node)
    public Bg2: Node = null;

    private _speed: number = 1;

    private _moveDirection:math.Vec3 = math.Vec3.UNIT_Z

    private _moveMaxDistance: number = 10;
    private _initPosition:math.Vec3 = new math.Vec3(0, 0, -10);
    private _bgMoveDistance: number = 0;

    start() {
        console.log('enter start GameManager');
    }
    update(deltaTime: number) {
        this.bgMove(deltaTime, this.Bg1)
        this.bgMove(deltaTime, this.Bg2)
    }

    public bgMove(deltaTime: number, node: Node){
        // 背景移动
        // 计算位置偏移
        var offset:math.Vec3 = new math.Vec3();
        math.Vec3.multiplyScalar(offset, this._moveDirection, (this._speed * deltaTime));
        this._bgMoveDistance += offset.z
        // 实现移动
        math.Vec3.add(offset, node.getPosition(), offset);
        if (offset) {
            node.setPosition(offset)
        }
        // 超出阈值换到最上面
        this._checkThreshold(node)
    }

    public setSpeed(speed: number){
        this._speed = speed
    }


    // 阈值检测
    private _checkThreshold(node: Node){ 
        if (node.getPosition().z>=this._moveMaxDistance) {
            node.setPosition(this._initPosition)
        }
    }
}
