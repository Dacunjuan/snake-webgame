

class snake{
    // game setting
    id='';
    width=30;
    height=30;
    blockSize=20;
    board='';
    board_context='';
    score=0;
    gameOver=false;
    // food
    foodX=0;
    foodY=0;
    // snake
    snakeBody=[];
    snakeX=0;
    snakeY=0;
    velocityX=0;
    velocityY=0;
    constructor(id,width, height,blockSize) {
        this.id = id;
        this.width = width;
        this.height = height;
        this.blockSize = blockSize ?? 20;
        this.snakeX=this.blockSize*5;
        this.snakeY=this.blockSize*5;   
    }
    initBoard(){
        this.board = document.getElementById(this.id);
        this.board_context = this.board.getContext("2d");

        this.board.height = this.height * this.blockSize;
        this.board.width = this.width * this.blockSize;

        this.placeFood();
        
        
    }

    update(){
        if(this.gameOver){
            return;
        }
       
        this.board_context.fillStyle = "black";
        this.board_context.fillRect(0,0,this.board.height,this.board.width)

        this.board_context.fillStyle = "red";
        this.board_context.fillRect(this.foodX,this.foodY,this.blockSize,this.blockSize)

        if(this.foodX == this.snakeX && this.foodY == this.snakeY){
            this.snakeBody.push([this.foodX,this.foodY]);
            this.placeFood();
        }
        
        for(let i = this.snakeBody.length - 1; i> 0 ;i--){
            this.snakeBody[i] = this.snakeBody[i-1];
        }
        
        if(this.snakeBody.length){
            this.snakeBody[0] = [this.snakeX,this.snakeY];
        }
       
        // 設置蛇的身體
        this.board_context.fillStyle="lime";
        this.snakeX += this.velocityX * this.blockSize;
        this.snakeY += this.velocityY * this.blockSize;
        this.board_context.fillRect(this.snakeX, this.snakeY, this.blockSize, this.blockSize);
        for (let i = 0; i < this.snakeBody.length; i++) {
            console.log("add")
            this.board_context.fillRect(this.snakeBody[i][0], this.snakeBody[i][1], this.blockSize, this.blockSize);
        }

        //game over conditions
        if (this.snakeX < 0 || this.snakeX > this.width*this.blockSize || this.snakeY < 0 || this.snakeY > this.height*this.blockSize) {
            this.gameOver = true;
            alert("Game Over1");
        }

        for (let i = 0; i < this.snakeBody.length; i++) {
            if (this.snakeX == this.snakeBody[i][0] && this.snakeY == this.snakeBody[i][1]) {
                this.gameOver = true;
                alert("Game Over2");
            }
        }
        
    }

    placeFood(){
        this.foodX = Math.floor(Math.random() * this.width) * this.blockSize;
        this.foodY = Math.floor(Math.random() * this.height) * this.blockSize; 
        //this.foodX = 6 * this.blockSize;
        //this.foodY = 5 * this.blockSize; 
    }

    changeDirection(e) {
        if (e.code == "ArrowUp" && this.velocityY != 1) {
            
            this.velocityX = 0;
            this.velocityY = -1;
            
        }
        else if (e.code == "ArrowDown" && this.velocityY != -1) {
            
            this.velocityX = 0;
            this.velocityY = 1;
        }
        else if (e.code == "ArrowLeft" && this.velocityX != 1) {
            
            this.velocityX = -1;
            this.velocityY = 0;
        }
        else if (e.code == "ArrowRight" && this.velocityX != -1) {
            
            this.velocityX = 1;
            this.velocityY = 0;
        }
    }

    StartGame(){
        this.initBoard();
        this.update()
    }

}