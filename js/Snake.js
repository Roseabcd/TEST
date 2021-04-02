function Snake() {
    //蛇的初始化身体
    this.body = [
        { "row": 3, "col": 5 },
        { "row": 3, "col": 4 },
        { "row": 3, "col": 3 },
        { "row": 3, "col": 2 }
    ];
    // 信号量，设置的运动方向
    this.direction = "R";
    // 即将改变的方向，目的就是为了方向出现原地调头的情况
    this.willDirection = "R"
}
// 蛇的运动
Snake.prototype.update = function() {
    // 当前的direction接收一下willDirection
    this.direction = this.willDirection;
    switch (this.direction) {
        case "R":
            this.body.unshift({ "row": this.body[0].row, "col": this.body[0].col + 1 });
            break;
        case "D":
            this.body.unshift({ "row": this.body[0].row + 1, "col": this.body[0].col });
            break;
        case "L":
            this.body.unshift({ "row": this.body[0].row, "col": this.body[0].col - 1 });
            break;
        case "U":
            this.body.unshift({ "row": this.body[0].row - 1, "col": this.body[0].col });
            break;
    }
    // 死亡的判断
    if (this.body[0].col > game.col - 1 || this.body[0].row > game.row - 1 || this.body[0].col < 0 || this.body[0].row < 0) {
        alert("游戏结束！您当的得分为" + game.score + "分")
        this.body.shift() 
        clearInterval(game.timer)
    }
    // 自己撞到了自己的时候也会判定死亡
    for (var i = 1; i < this.body.length; i++) {
        if (this.body[0].col == this.body[i].col && this.body[0].row == this.body[i].row) {
            alert("游戏结束！您当的得分为" + game.score + "分")
            this.body.shift();
            clearInterval(game.timer)
        }
    }
    // 蛇吃食物
    if (this.body[0].row == game.food.row && this.body[0].col == game.food.col) {
        // 创建新的食物
        game.food = new Food(game);
        game.score++;
        game.f = 0;
    } else {

        this.body.pop()
    }

};
// 蛇的方向改变，防止的是在一次渲染之前会出现调头的情况
Snake.prototype.changeDirection = function(d) {
    this.willDirection = d;
}
Snake.prototype.render = function() {
    // 蛇头的渲染
    game.setColor(this.body[0].row, this.body[0].col, '-webkit-radial-gradient(center center , pink,red)');
    // 蛇的身体
    for (var i = 1; i < this.body.length; i++) {
        game.setColor(this.body[i].row, this.body[i].col, '-webkit-radial-gradient(center center , orange,red)')
    }
}