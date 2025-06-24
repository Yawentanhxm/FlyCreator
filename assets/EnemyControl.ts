import { _decorator, Component, Node, Prefab, instantiate, director, math} from 'cc';
const { ccclass, property } = _decorator;


@ccclass('EnemyControl')
export class EnemyControl extends Component {
    @property(Prefab)
    public enemy1: Prefab = null;
    
    @property(Prefab)
    public enemy2: Prefab = null;

    public enemy: Prefab = null;

    private _coldDown: number = 1;

    //  2. 创建的敌人数组
    private _enemy: Node[] = [];
    // 敌人类型生成概率
    private _enemyType: number[] = [0, 1 ]

    start() {

    }

    update(deltaTime: number) {
        //1. 创建敌人
        this.createEnemy(deltaTime);
    }

    createEnemy(deltaTime: number) {
        this._coldDown -= deltaTime
        // 检测时间到，且上一波敌人机器销毁
        console.log("this._enemy.length: ", this._enemy.length);
        if(this._coldDown <= 0 && this._enemy.length <= 0){
            let rand = Math.random()
            let sum = 0;
            if (rand <= 0.5){
                this.enemy = this.enemy1
            }else{
                this.enemy = this.enemy2
            }
            for (let i=0; i<this._enemyType.length; i++){
                sum += this._enemyType[i]
                if ( rand <= sum) {
                    this.createTypeEnemy(i+1)
                    break;
                }
            }
        }
    }

    createTypeEnemy(type: number) {
        let enemy:Node = null;
        switch (type) {
            case 1:
                this.createType1Enemy();
                break;
            case 2:
                this.createType2Enemy();
                break;
        }
    }

    createType1Enemy() {
        //2. 飞机呈现一字形出现在游戏最上方，每隔1s发射一次子弹。
        console.log("createType1Enemy");
        for(let i=0; i<5; i++){
            let enemy:Node = instantiate(this.enemy);
            enemy.setPosition(-30, 0, 20 - i*10);
            enemy.setRotationFromEuler(new math.Vec3(0,90,0));
            enemy.scale = new math.Vec3(8,8,8);
            //2. 添加到游戏
            enemy.parent = director.getScene()
            this._enemy.push(enemy)
        }
    }
    
    createType2Enemy() {
        //3. 飞机呈现v字形出现在游戏最上方，每个1s发射一次子弹。
        console.log("createType1Enemy");
        for(let i=0; i<5; i++){
            let enemy:Node = instantiate(this.enemy);
            enemy.setPosition(-10 - Math.abs(i-2)*10, 0, 20 - i*10);
            enemy.setRotationFromEuler(new math.Vec3(0,90,0));
            enemy.scale = new math.Vec3(8,8,8);
            //2. 添加到游戏
            enemy.parent = director.getScene()
            this._enemy.push(enemy)
        }
    }
}


