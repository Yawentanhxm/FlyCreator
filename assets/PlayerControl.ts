import { _decorator, input, Input, Component, Node, math, EventKeyboard, KeyCode, Prefab, instantiate, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerControl')
export class PlayerControl extends Component {
    @property(Prefab)
    public bullet:Prefab = null;

    public speed = 100.0;
    private _direction = new math.Vec3();
    private _LEFT_BOUND = 24.565;
    private _RIGHT_BOUND = -23.327;
    private _UP_BOUND = -40.195;
    private _DOWN_BOUND = 47.6;
    private _coldDown = 0.3;
    onLoad(): void {
        input.on(Input.EventType.KEY_DOWN, this.onKeyEvent, this);
        input.on(Input.EventType.KEY_UP, this.onKeyRelease, this);
    }
    protected onDestroy(): void {
        input.off(Input.EventType.KEY_DOWN, this.onKeyEvent, this);
        input.off(Input.EventType.KEY_UP, this.onKeyRelease, this);
    }
    start() {
        
    }


    update(deltaTime: number) {
        //1. 获取用户输入。 
        console.log(this._direction)
        //2. 移动玩家
        this.move(this._direction, deltaTime)
        //3. 发射子弹
        this.shoot(deltaTime)
    }

    shoot(deltaTime: number){
        this._coldDown -= deltaTime
        if(this._coldDown <= 0){
            let node = instantiate(this.bullet)
            node.parent = director.getScene()
            node.setPosition(this.node.getPosition())
            console.log("发射子弹")
            this._coldDown = 0.3
        }
    }

    checkBoundary(offset: math.Vec3):math.Vec3 {
        // 获取边界
        offset.z = offset.z > this._LEFT_BOUND ? this._LEFT_BOUND : offset.z < this._RIGHT_BOUND ? this._RIGHT_BOUND : offset.z;
        offset.x = offset.x > this._DOWN_BOUND ? this._DOWN_BOUND : offset.x < this._UP_BOUND ? this._UP_BOUND : offset.x;
        return offset;
    }

    move(diriction:math.Vec3, deltaTime: number) {
        // 移动玩家
        // 获取当前位置
        let position = this.node.getPosition()
        // 计算偏移量
        let offset = new math.Vec3()
        math.Vec3.multiplyScalar(offset, diriction, this.speed * deltaTime)
        console.log(offset)
        // 计算出新的位置
        math.Vec3.add(offset, position, offset)
        //3. 检测边界
        offset = this.checkBoundary(offset)
        this.node.setPosition(offset)
    }
    onKeyEvent(event: EventKeyboard) { 
        if (event.keyCode === KeyCode.KEY_D || event.keyCode === KeyCode.ARROW_RIGHT){
            this._direction.z = -1
        }else if(event.keyCode == KeyCode.KEY_A || event.keyCode == KeyCode.ARROW_LEFT){
            this._direction.z = 1
        }
        if (event.keyCode == KeyCode.KEY_W || event.keyCode == KeyCode.ARROW_UP) {
            this._direction.x = -1
        }else if(event.keyCode == KeyCode.KEY_S || event.keyCode == KeyCode.ARROW_DOWN) {
            this._direction.x = 1
        }
    }

    onKeyRelease(event: EventKeyboard) { 
        if (event.keyCode === KeyCode.KEY_D || event.keyCode === KeyCode.ARROW_RIGHT || event.keyCode === KeyCode.KEY_A || event.keyCode === KeyCode.ARROW_LEFT) {
            this._direction.z = 0
        }
        if (event.keyCode == KeyCode.KEY_W || event.keyCode == KeyCode.ARROW_UP || event.keyCode == KeyCode.KEY_S  || event.keyCode == KeyCode.ARROW_DOWN){
            this._direction.x = 0
        }
    }
}


