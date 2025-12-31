const colors = ['#ffd1d1', '#ffdd84', '#f9defd', '#dcf5cf', '#f5e1fa', '#d0f4f4', '#fff5ba'];

function changeColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];
    document.getElementById('drop-shadow').style.filter = `drop-shadow(-20px -10px ${randomColor})`;        
}
changeColor();

document.getElementById('hero-logo').onclick = changeColor;

while (true) {
    setTimeout(changeColor, 1000);
}