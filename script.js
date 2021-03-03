const html = document.documentElement;
var canvas = document.getElementById("radio");
var context = canvas.getContext('2d');

const frameCount = 49;
const currentFrame = index => (
  `https://raw.githubusercontent.com/santos-lucasc/radio2s/main/${index.toString().padStart(4, '0')}.png`
)

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image()
img.src = currentFrame(1);
canvas.width=720;
canvas.height=480;
img.onload=function(){
context.drawImage(img, 0, 0);
}

const updateImage = index => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
  
}

window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  
  requestAnimationFrame(() => updateImage(frameIndex + 1))
});

preloadImages()

