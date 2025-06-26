import { _decorator, Collider, ITriggerEvent,  Component,director,instantiate, math, Node, Prefab, RigidBody } from 'cc';
import { Constant } from './const';
const { ccclass, property } = _decorator;

@ccclass('EnemyPlant')
export class EnemyPlant extends Component {

    @property(Prefab)
    public bullet:Prefab = null;

    private _bulletType = 1<<1
    private _plantType = 1<<3;

    protected onEnable(): void {
        const collider = this.getComponent(Collider);
        console.log('collider:' + collider)
        collider.on('onTriggerEnter', this.onTriggerEnter, this);
    }

    private onTriggerEnter(event: ITriggerEvent) {
        console.log('onTriggerEnter')
        //1. 获取碰撞的节点
        const other = event.otherCollider.node;
        //3. 销毁
        this.node.destroy()
    }

    private _coldDown = 0.3;
    start() {
        this.node.getComponent(RigidBody).group = this._plantType
        // console.log('getMask'+this.node.getComponent(RigidBody).getMask())
        // this.node.getComponent(RigidBody).setMask(1 << 0 | 1 << 1 | 1 << 2 | 1 << 3| 1 <<4 ); // 可以与ENEMY和PROJECTILE碰撞
        // console.log('getMask'+this.node.getComponent(RigidBody).getMask())
    }

    update(deltaTime: number) {
        //3. 发射子弹
        this.shoot(deltaTime)
    }

    shoot(deltaTime: number){
        this._coldDown -= deltaTime
        if(this._coldDown <= 0){
            let node = instantiate(this.bullet)
            let bulletScript = node.getComponent('bullet')
            bulletScript['direction'] = new math.Vec3(1,0,0)
            node.parent = director.getScene()
            let rb = node.getComponent(RigidBody) 
            // setGroup需要在onLoad后调用，即需要在放置到场景之后调用
            // 坑点，设置好group后，不会手动继承collision matrix，需要手动设置掩码
            rb.group = this._bulletType
            // Use bitwise shift to correctly represent collision groups
            // Allow collision with PlayerPlane (group 0)
            rb.setMask(Constant.CollisionType.EnemyBullet);
            node.setPosition(this.node.getPosition())
            console.log("发射子弹")
            this._coldDown = 0.3
        }
    }
    
}


