export default class Animation {
    constructor(name, length, row, width, height) {
        this.name = name;
        this.length = length;
        this.row = row;
        this.width = width;
        this.height = height;
        this.reset();
    }

    tick() {
        var i = this.currentFrame.index;
    
        i = (i < this.length - 1) ? i + 1 : 0;
    
        if(this.count > 0) {
            if(i === 0) {
                this.count -= 1;
                if(this.count === 0) {
                    this.currentFrame.index = 0;
                    this.endcount_callback();
                    return;
                }
            }
        }

        this.currentFrame.x = this.width * i;
        this.currentFrame.y = this.height * this.row;
        this.currentFrame.index = i;
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    setCount(count, onEndCount) {
        this.count = count;
        this.endcount_callback = onEndCount;
    }

    isTimeToAnimate(time) {
        return (time - this.lastTime) > this.speed;
    }

    update(time) {
        if(this.lastTime === 0 && this.name.substr(0, 3) === "atk") {
            this.lastTime = time;
        }
    
        if(this.isTimeToAnimate(time)) {
            this.lastTime = time;
            this.tick();
            return true;
        } else {
            return false;
        }
    }

    reset() {
        this.lastTime = 0;
        this.currentFrame = { index: 0, x: 0, y: this.row * this.height };
    }
}