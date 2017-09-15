class Main extends egret.DisplayObjectContainer {

    private intelligenceSystem:IntelSys; // 情报系统
    private activeArea:ActiveArea;       // 间谍活动区域
    private _mask:egret.Sprite;          // 游戏结束后的遮罩

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private onAddToStage(){
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR,this.onConfigError,this);
        console.log("正在加载配置文件");
        RES.loadConfig("/resource/default.res.json","resource/");
    }
    private onConfigError(e:RES.ResourceEvent){}
    private onConfigComplete(){
        console.log("配置文件加载完毕");
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onGroupLoadError,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onGroupLoadProgress,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onGroupComplete,this);
        console.log("正在加载组资源");
        RES.loadGroup("spys");
    }
    private onGroupLoadError(){}
    private onGroupLoadProgress(){}
    private onGroupComplete(){
        console.log("游戏组资源加载完成");
        this.createScene();
    }

    private createScene(){
        console.log("正在创建游戏场景");
        let stageWidth = this.stage.stageWidth;
        let stageHeight = this.stage.stageHeight;

        // 绘制游戏背景
        let bg = new egret.Bitmap(RES.getRes("spys.bgTile"));
        bg.fillMode = egret.BitmapFillMode.REPEAT;  // 设置背景填充为 平铺
        bg.width = stageWidth;
        bg.height = stageHeight;
        bg.alpha = 0.5;
        this.addChild(bg);

        // 创建情报系统
        let spys = ["spys.spy1","spys.spy2","spys.spy3","spys.spy4","spys.spy5","spys.spy6"];
        this.intelligenceSystem = new IntelSys(0,0,stageWidth,200,spys)
        this.addChild(this.intelligenceSystem);
        this.intelligenceSystem.addEventListener(SpyEvent.GAMEOVER,this.onGameover,this);

        // this.intelligenceSystem.startWork(40);

        // 创建间谍活动区
        this.activeArea = new ActiveArea(0,200,stageWidth,stageHeight-200,spys);
        this.addChild(this.activeArea);
        this.activeArea.addEventListener(SpyEvent.SPY_TAPED,this.onSpyTaped,this);

        // 创建游戏结束遮罩
        let mask = new egret.Sprite();
        mask.graphics.beginFill(0,0.7);
        mask.graphics.drawRect(0,0,stageWidth,stageHeight);
        mask.graphics.endFill();
        this._mask = mask;


        let time = 40;
        this.intelligenceSystem.startWork(time);
        this.activeArea.startWork(time);

    }
    private onGameover(e:SpyEvent){
        this.addChild(this._mask);
        console.log("游戏结束,你的得分是: "+ (e._count*10))
    }
    private onSpyTaped(e:SpyEvent){
        this.intelligenceSystem.spyTaped(e);
    }
    
}

class SpyEvent extends egret.Event{
    public _spyName:string = "";
    public _count:number;

    public static SPY_TAPED:string = "spyTaped";
    // public static SPY_CATCH_INCORRECT:string = "spyCatchIncorrect";
    public static GAMEOVER:string = "gameover";
    
    public constructor(type:string, bubbles?:boolean,cancelable?:boolean,data?:any){
        super(type,bubbles,cancelable,data);
    }
}