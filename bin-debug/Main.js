var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, this.onConfigError, this);
        console.log("正在加载配置文件");
        RES.loadConfig("/resource/default.res.json", "resource/");
    };
    Main.prototype.onConfigError = function (e) { };
    Main.prototype.onConfigComplete = function () {
        console.log("配置文件加载完毕");
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onGroupLoadProgress, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
        console.log("正在加载组资源");
        RES.loadGroup("spys");
    };
    Main.prototype.onGroupLoadError = function () { };
    Main.prototype.onGroupLoadProgress = function () { };
    Main.prototype.onGroupComplete = function () {
        console.log("游戏组资源加载完成");
        this.createScene();
    };
    Main.prototype.createScene = function () {
        console.log("正在创建游戏场景");
        var stageWidth = this.stage.stageWidth;
        var stageHeight = this.stage.stageHeight;
        // 绘制游戏背景
        var bg = new egret.Bitmap(RES.getRes("spys.bgTile"));
        bg.fillMode = egret.BitmapFillMode.REPEAT; // 设置背景填充为 平铺
        bg.width = stageWidth;
        bg.height = stageHeight;
        bg.alpha = 0.5;
        this.addChild(bg);
        // 创建情报系统
        var spys = ["spys.spy1", "spys.spy2", "spys.spy3", "spys.spy4", "spys.spy5", "spys.spy6"];
        this.intelligenceSystem = new IntelSys(0, 0, stageWidth, 200, spys);
        this.addChild(this.intelligenceSystem);
        this.intelligenceSystem.addEventListener(SpyEvent.GAMEOVER, this.onGameover, this);
        // this.intelligenceSystem.startWork(40);
        // 创建间谍活动区
        this.activeArea = new ActiveArea(0, 200, stageWidth, stageHeight - 200, spys);
        this.addChild(this.activeArea);
        this.activeArea.addEventListener(SpyEvent.SPY_TAPED, this.onSpyTaped, this);
        // 创建游戏结束遮罩
        var mask = new egret.Sprite();
        mask.graphics.beginFill(0, 0.7);
        mask.graphics.drawRect(0, 0, stageWidth, stageHeight);
        mask.graphics.endFill();
        this._mask = mask;
        var time = 40;
        this.intelligenceSystem.startWork(time);
        this.activeArea.startWork(time);
    };
    Main.prototype.onGameover = function (e) {
        this.addChild(this._mask);
        console.log("游戏结束,你的得分是: " + (e._count * 10));
    };
    Main.prototype.onSpyTaped = function (e) {
        this.intelligenceSystem.spyTaped(e);
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
var SpyEvent = (function (_super) {
    __extends(SpyEvent, _super);
    function SpyEvent(type, bubbles, cancelable, data) {
        var _this = _super.call(this, type, bubbles, cancelable, data) || this;
        _this._spyName = "";
        return _this;
    }
    return SpyEvent;
}(egret.Event));
SpyEvent.SPY_TAPED = "spyTaped";
// public static SPY_CATCH_INCORRECT:string = "spyCatchIncorrect";
SpyEvent.GAMEOVER = "gameover";
__reflect(SpyEvent.prototype, "SpyEvent");
//# sourceMappingURL=Main.js.map