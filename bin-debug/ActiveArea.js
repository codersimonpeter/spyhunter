var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ActiveArea = (function (_super) {
    __extends(ActiveArea, _super);
    function ActiveArea(x, y, w, h, spys) {
        var _this = _super.call(this) || this;
        _this.graphics.beginFill(0, 0.6);
        _this.graphics.drawRect(0, 0, w, h);
        _this.graphics.endFill();
        _this.x = x;
        _this.y = y;
        _this.spys = spys;
        _this.init();
        return _this;
    }
    ActiveArea.prototype.init = function () {
        var role = new egret.Bitmap(RES.getRes(this.spys[0]));
        this.roleBitmap = role;
        this.roleBitmap.touchEnabled = true; // 开启触摸
        this.roleBitmap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.addChild(this.roleBitmap);
    };
    ActiveArea.prototype.onTap = function () {
        this.roleBitmap.touchEnabled = false;
        console.log("点击");
        // 发送事件
        var e = new SpyEvent(SpyEvent.SPY_TAPED);
        e._spyName = this.currentRole;
        this.dispatchEvent(e);
    };
    ActiveArea.prototype.startWork = function (time) {
        if (time === void 0) { time = 20; }
        this.currentRole = this.spys[0]; // 初始化当前角色
        this.updateRoleBitmap();
        this.timer = new egret.Timer(1000, time);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
        this.timer.start();
    };
    ActiveArea.prototype.onTimerComplete = function () {
        this.roleBitmap.touchEnabled = false;
    };
    ActiveArea.prototype.onTimer = function () {
        this.roleBitmap.touchEnabled = true; // 开启触摸
        this.currentRole = this.getRndSpy();
        this.updateRoleBitmap();
    };
    ActiveArea.prototype.updateRoleBitmap = function () {
        var padding = 50;
        var t = RES.getRes(this.currentRole);
        this.roleBitmap.texture = t;
        this.roleBitmap.x = Math.random() * (this.width - padding * 2) + padding;
        this.roleBitmap.y = Math.random() * (this.height - padding * 2) + padding;
        this.roleBitmap.anchorOffsetX = t.textureWidth / 2;
        this.roleBitmap.anchorOffsetY = t.textureHeight / 2;
    };
    ActiveArea.prototype.getRndSpy = function () {
        var num = Math.floor(Math.random() * this.spys.length);
        return this.spys[num];
    };
    return ActiveArea;
}(egret.Sprite));
__reflect(ActiveArea.prototype, "ActiveArea");
//# sourceMappingURL=ActiveArea.js.map