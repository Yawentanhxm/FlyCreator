import { _decorator, Component,director,instantiate, math, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyPlant')
export class EnemyPlant extends Component {

    @property(Prefab)
    public bullet:Prefab = null;


    private _coldDown = 0.3;
    start() {

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
            node.setPosition(this.node.getPosition())
            console.log("发射子弹")
            this._coldDown = 0.3
        }
    }
}


