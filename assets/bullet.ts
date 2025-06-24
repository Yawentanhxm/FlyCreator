import { _decorator, Component, Node, math } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bullet')
export class bullet extends Component {
    private _speed = 50
    private _maxDistance = 100

    private _distance = 0
    //子弹运行方向
    public direction = new math.Vec3(-1, 0, 0)


    start() {

    }

    update(deltaTime: number) {
        this.move(deltaTime)
        if (this.isDestory()){
            this.node.destroy()
        }
    }

    move(deltaTime: number) {
        this._distance += this._speed * deltaTime
        // math.Vec3.
        let new_pos = this.node.getPosition()
        math.Vec3.scaleAndAdd(new_pos, this.node.getPosition(), this.direction, this._speed * deltaTime)
        this.node.setPosition(new_pos)
    }

    isDestory(){
        return this._distance > this._maxDistance
    }
}


