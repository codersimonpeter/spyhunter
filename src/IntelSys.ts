// 情报系统
class IntelSys extends egret.Sprite{
    public targetSpy:string; // 返回当前的间谍名称

    private targetSpyBitmap:egret.Bitmap;    // 目标间谍的位图
    private spys:Array<string>;              // 间谍名字数组
    private catchCountLabel:egret.TextField; // 已捕获的间谍数量消息框
    private catchCount:number = 0;           // 已捕获的间谍数量
    private timerLabel:egret.TextField;      // 倒计时消息框
    private timeLeft:number = 0;             // 剩余时间
    private timer:egret.Timer;               // 计时器
    

    public constructor(x:number, y:number, w:number, h:number, spys:Array<string>){
        super();
        this.graphics.beginFill(0,0.5);
        this.graphics.drawRect(0,0,w,h);
        this.graphics.endFill();
        this.x = x;
        this.y = y;

        this.spys = spys;

        this.init();
    }
    private init(){
        // 绘制消息框
        this.catchCountLabel = new egret.TextField();
        this.catchCountLabel.width = 400;
        this.catchCountLabel.height = 100;
        this.catchCountLabel.x = 20;
        this.catchCountLabel.text = "你抓住了0个间谍";
        this.catchCountLabel.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(this.catchCountLabel);

        // 绘制倒计时框
        this.timerLabel = new egret.TextField();
        this.timerLabel.width = 240;
        this.timerLabel.height = 100;
        this.timerLabel.x = 20;
        this.timerLabel.y = 100;
        this.timerLabel.text = "倒计时:0秒";
        this.timerLabel.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(this.timerLabel);

        // 绘制目标间谍位图
        let target = new egret.Bitmap();
        this.targetSpyBitmap = target;
        this.targetSpyBitmap.x = 380;
        this.targetSpyBitmap.y = 100;
        this.addChild(this.targetSpyBitmap);
        this.targetSpy = this.spys[0];
    }
    public startWork(time:number = 20){
        this.timeLeft = time;
        this.catchCount = 0;
        this.updateCatchLabel();
        this.updateTimerLabel();
        this.updateTargetSpyBitmap();
        this.timer = new egret.Timer(1000,time);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onTimerComplete,this);
        this.timer.start();
        
    }
    public spyTaped(e:SpyEvent){
        if(e._spyName==this.targetSpy){
            // 抓对了
            this.catchCount++;
        }else{
            // 抓错了，数量-2
            this.catchCount-=2;
        }
        this.updateCatchLabel();
    }
    private onTimer(){
        // 刷新目标间谍
        let seed = Math.random()>0.1428?false:true;
        if(seed){
            this.targetSpy = this.getRndSpy();
        }
        // 刷新时间
        this.timeLeft--;
        this.updateTimerLabel();
        this.updateTargetSpyBitmap();
    }
    private getRndSpy(){
        let num = Math.floor(Math.random()*this.spys.length);
        return this.spys[num];
    }
    private onTimerComplete(){
        let e = new SpyEvent(SpyEvent.GAMEOVER);
        e._count = this.catchCount;
        this.dispatchEvent(e);
        this.timerLabel.text = "时间到！";
    }
    private updateCatchLabel(){
        this.catchCountLabel.text = "你抓住了 "+this.catchCount+" 个间谍";
    }
    private updateTimerLabel(){
        this.timerLabel.text = "倒计时： "+this.timeLeft+" 秒";
    }
    private updateTargetSpyBitmap(){
        let texture:egret.Texture = RES.getRes(this.targetSpy);
        this.targetSpyBitmap.texture = texture;
        this.targetSpyBitmap.width = texture.textureWidth;
        this.targetSpyBitmap.height = texture.textureHeight;
        this.targetSpyBitmap.anchorOffsetX = texture.textureWidth/2;
        this.targetSpyBitmap.anchorOffsetY = texture.textureHeight/2;
    }

}