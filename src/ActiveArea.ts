class ActiveArea extends egret.Sprite{
    private spys:Array<string>;     // 间谍
    private currentRole:string;     // 当前角色
    private roleBitmap:egret.Bitmap;// 当前角色位图
    private timer:egret.Timer;      // 区域计时器
    public constructor(x:number, y:number, w:number, h:number, spys:Array<string>){
        super();
        this.graphics.beginFill(0,0.6);
        this.graphics.drawRect(0,0,w,h);
        this.graphics.endFill();
        this.x = x;
        this.y = y;
        this.spys = spys;
        this.init();
    }

    private init(){
        let role = new egret.Bitmap(RES.getRes(this.spys[0]));
        this.roleBitmap = role;
        this.roleBitmap.touchEnabled = true; // 开启触摸
        this.roleBitmap.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
        this.addChild(this.roleBitmap);
    }
    private onTap(){
        this.roleBitmap.touchEnabled = false;
        console.log("点击");
        // 发送事件
        let e = new SpyEvent(SpyEvent.SPY_TAPED);
        e._spyName = this.currentRole;
        this.dispatchEvent(e);
    }
    public startWork(time:number = 20){
        this.currentRole = this.spys[0]; // 初始化当前角色
        this.updateRoleBitmap();

        this.timer = new egret.Timer(1000,time);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onTimerComplete,this);
        this.timer.start();
    }
    private onTimerComplete(){
        this.roleBitmap.touchEnabled = false;
    }
    private onTimer(){
        this.roleBitmap.touchEnabled = true; // 开启触摸
        this.currentRole = this.getRndSpy();
        this.updateRoleBitmap();
    }
    private updateRoleBitmap(){
        let padding = 50;
        let t:egret.Texture = RES.getRes(this.currentRole);
        this.roleBitmap.texture = t;
        this.roleBitmap.x = Math.random()*(this.width-padding*2) + padding;
        this.roleBitmap.y = Math.random()*(this.height-padding*2) + padding;
        this.roleBitmap.anchorOffsetX = t.textureWidth/2;
        this.roleBitmap.anchorOffsetY = t.textureHeight/2;
    }


    private getRndSpy(){
        let num = Math.floor(Math.random()*this.spys.length);
        return this.spys[num];
    }
    

}