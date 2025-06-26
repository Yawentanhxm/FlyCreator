import { _decorator, Component, Node } from 'cc';

export class Constant extends Component {
    public static CollisionType = {
        EnemyBullet: 1<<1,
        PlayerBullet: 1<<2,
        EnemyPlane: 1<<3,
        PlayerPlane: 1<<4,
    }
}