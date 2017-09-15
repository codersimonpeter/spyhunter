var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// 情报系统
var IntelSys = (function (_super) {
    __extends(IntelSys, _super);
    function IntelSys(x, y, w, h, spys) {
        var _this = _super.call(this) || this;
        _this.catchCount = 0; // 已捕获的间谍数量
        _this.timeLeft = 0; // 剩余时间
        _this.graphics.beginFill(0, 0.5);
        _this.graphics.drawRect(0, 0, w, h);
        _this.graphics.endFill();
        _this.x = x;
        _this.y = y;
        _this.spys = spys;
        _this.init();
        return _this;
    }
    IntelSys.prototype.init = function () {
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
        var target = new egret.Bitmap();
        this.targetSpyBitmap = target;
        this.targetSpyBitmap.x = 380;
        this.targetSpyBitmap.y = 100;
        this.addChild(this.targetSpyBitmap);
        this.targetSpy = this.spys[0];
    };
    IntelSys.prototype.startWork = function (time) {
        if (time === void 0) { time = 20; }
        this.timeLeft = time;
        this.catchCount = 0;
        this.updateCatchLabel();
        this.updateTimerLabel();
        this.updateTargetSpyBitmap();
        this.timer = new egret.Timer(1000, time);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
        this.timer.start();
    };
    IntelSys.prototype.spyTaped = function (e) {
        if (e._spyName == this.targetSpy) {
            // 抓对了
            this.catchCount++;
        }
        else {
            // 抓错了，数量-2
            this.catchCount -= 2;
        }
        this.updateCatchLabel();
    };
    IntelSys.prototype.onTimer = function () {
        // 刷新目标间谍
        var seed = Math.random() > 0.1428 ? false : true;
        if (seed) {
            this.targetSpy = this.getRndSpy();
        }
        // 刷新时间
        this.timeLeft--;
        this.updateTimerLabel();
        this.updateTargetSpyBitmap();
    };
    IntelSys.prototype.getRndSpy = function () {
        var num = Math.floor(Math.random() * this.spys.length);
        return this.spys[num];
    };
    IntelSys.prototype.onTimerComplete = function () {
        var e = new SpyEvent(SpyEvent.GAMEOVER);
        e._count = this.catchCount;
        this.dispatchEvent(e);
        this.timerLabel.text = "时间到！";
    };
    IntelSys.prototype.updateCatchLabel = function () {
        this.catchCountLabel.text = "你抓住了 " + this.catchCount + " 个间谍";
    };
    IntelSys.prototype.updateTimerLabel = function () {
        this.timerLabel.text = "倒计时： " + this.timeLeft + " 秒";
    };
    IntelSys.prototype.updateTargetSpyBitmap = function () {
        var texture = RES.getRes(this.targetSpy);
        this.targetSpyBitmap.texture = texture;
        this.targetSpyBitmap.width = texture.textureWidth;
        this.targetSpyBitmap.height = texture.textureHeight;
        this.targetSpyBitmap.anchorOffsetX = texture.textureWidth / 2;
        this.targetSpyBitmap.anchorOffsetY = texture.textureHeight / 2;
    };
    return IntelSys;
}(egret.Sprite));
__reflect(IntelSys.prototype, "IntelSys");
//# sourceMappingURL=IntelSys.js.map