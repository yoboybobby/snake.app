const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
let appleIndex = 0;
let score = 0;
let timerId = 0;
let intervalTime = 200;
const bgmusic = new Audio('assets/b.mp3');
const eatmusic = new Audio('assets/e.mp3');
const emusic = new Audio('assets/die.mp3');






// יצירת הלוח (400 משבצות)
function createBoard() {
    for (let i = 0; i < 400; i++) {
        const square = document.createElement('div');
        grid.appendChild(square);
        squares.push(square);
    }
}





function startGame() {
    // איפוס
    emusic.pause();
    emusic.currentTime=0;
    bgmusic.play();
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    clearInterval(timerId);
    currentSnake=[ 2,1,0]
    score=0; direction= 1; intervalTime=200;
    scoreDisplay.textContent= score;
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    generateApple();
    timerId = setInterval(move, intervalTime);

}
function endgame() {
    bgmusic.pause();
    emusic.play();

    return clearInterval(timerId);

   
}
function move() {
    // בדיקת פסילה (קירות ופגיעה עצמית)

    bgmusic.play();
    const hitBottom = (currentSnake[0] + 20 >= 400 && direction === 20);
    const hitTop = (currentSnake[0] - 20 < 0 && direction === -20);
    const hitRight = (currentSnake[0] % 20 === 19 && direction === 1);
    const hitLeft = (currentSnake[0] % 20 === 0 && direction === -1);
    const hitSelf = squares[currentSnake[0] + direction]?.classList.contains('snake');


 if (hitRight || hitBottom || hitTop || hitLeft || hitSelf) {
    return endgame();
    
}

const tail = currentSnake.pop();
squares[tail].classList.remove('snake');
const newHead = currentSnake[0] + direction;

squares[newHead].classList.add('snake');
currentSnake.unshift(newHead);

if (squares[newHead].classList.contains('apple')) {
    squares[newHead].classList.remove('apple');
    squares[tail].classList.add('snake');
    eatmusic.play()
    currentSnake.push(tail);
    score++;
    scoreDisplay.textContent = score;
    generateApple();
}
     
 
 // לשים בסוף הפונקציה טוב
 
 
     document.addEventListener('touchstart', e => {
     touchStartX = e.changedTouches[0].screenX;
     touchStartY = e.changedTouches[0].screenY;
 }, false);
 
 // מאזין לסיום מגע
    document.addEventListener('touchend', e => {
     touchEndX = e.changedTouches[0].screenX;
     touchEndY = e.changedTouches[0].screenY;
     handleSwipe();
}, false);

}
 
 
 // פונקציה נפרדת
 
 function handleSwipe() {
     const dx = touchEndX - touchStartX;
     const dy = touchEndY - touchStartY; 
     // סף מינימלי לתנועה כדי למנוע זיהוי של לחיצות רגילות כסווייפ
       const absDx = Math.abs(dx);
       const absDy = Math.abs(dy);
   
       if (Math.max(absDx, absDy) > 30) { // 30 פיקסלים מינימום
           if (absDx > absDy) {
               // תנועה אופקית (ימינה/שמאלה)
               // שים לב: הערכים בפונקציית changeDir יש להתאים ללוגיקה שלך
               if (dx > 0) changeDir(-1); // ימינה
               else changeDir(1); // שמאלה
           } else {
               // תנועה אנכית (למעלה/למטה)
               if (dy > 0) changeDir(20); // למטה (בהנחה שרוחב הלוח 20)
               else changeDir(-20); // למעלה
           }
       }
    }


function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');
}

// פונקציית שינוי כיוון לכפתורים ומקלדת
function changeDir(newDir) {
    // מניעת פניית פרסה
    if (direction + newDir !== 0) {
        direction = newDir;
    }
}

// תמיכה במקלדת למחשב
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') changeDir(-20);
    if (e.key === 'ArrowDown') changeDir(20);
    if (e.key === 'ArrowLeft') changeDir(1);
    if (e.key === 'ArrowRight') changeDir(-1);
});


createBoard();
