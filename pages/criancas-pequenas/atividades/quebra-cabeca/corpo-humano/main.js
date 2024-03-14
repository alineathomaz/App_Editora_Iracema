let partImages = [];
let touchImage = [];
let partNames = ['head', 'leftHand', 'rightHand', 'leftFoot','rightFoot', 'abdomen','leftArm','rightArm',  'leftLeg','rightLeg'];
let currentImageIndex = null;
let isDragging = false;
let startX;
let startY;
let offsetX;
let offsetY;
let blockLeftFoot = false;
let blockRightFoot = false;
let blockLeftLeg = false;
let blockRightLeg = false;
let scaleImg;

const refCanvasWidth = 691.2; 
const refCanvasHeight = 768; 

var canvas = new fabric.Canvas("canvas");
canvas.setWidth((window.innerWidth)*0.9);
canvas.setHeight((window.innerHeight)*0.75);
canvas.selection = false; // disable group selection

function displayElements(){
    if(screen.orientation.type === 'portrait-primary'){
        document.getElementById('canvas').style.display = 'block';
        document.getElementById('screen-message').style.display = 'none';
  } else if(screen.orientation.type === 'landscape-primary'){
        document.getElementById('canvas').style.display = 'none';
        document.getElementById('screen-message').style.display = 'block';
  }
}

window.onresize = function () {init(); displayElements(); location.reload()}
canvas.onresize = function () {init(); displayElements(); location.reload()}

screen.addEventListener("orientationchange", () => displayElements);

function init() {    
    const isMobile = navigator.maxTouchPoints > 0;
        
    if(isMobile && screen.orientation.type === 'portrait-primary'){        
        screen.orientation
        .lock('portrait-primary')
        .then(() => {
          console.log(`Locked to ${screen.orientation}\n`);
        })
        .catch((error) => {
         console.log(error);
        });
    }     
   
    if(!isMobile){
        console.log('entrei aqui');
        document.getElementById('screen-message').innerHTML = 'Disponível apenas para dispositivos móveis';
    } else {
        document.getElementById('screen-message').innerHTML = 'Gire o tablet para a posição retrato';
    }

    displayElements();
}

init();

// Responsive factor
 let scaleFactor = canvas.width/refCanvasWidth;
 let scaleFactorTop = (canvas.height/refCanvasHeight);
 scaleImg = scaleFactor < scaleFactorTop ? scaleFactor : scaleFactorTop;

partImages.push({source: "./src/images/body1.png", x:0 , y: canvas.height-236*scaleFactorTop, width: 245, height: 236})
partImages.push({source: "./src/images/body7.png", x:285*scaleFactor , y: canvas.height-206*scaleFactorTop , width: 33, height: 33})
partImages.push({source: "./src/images/body8.png", x:285*scaleFactor , y: canvas.height-143*scaleFactorTop, width: 33, height: 33})
partImages.push({source: "./src/images/body9.png", x:280*scaleFactor , y: canvas.height-80*scaleFactorTop, width: 44, height: 19})
partImages.push({source: "./src/images/body10.png", x:280*scaleFactor , y: canvas.height-30*scaleFactorTop, width: 44, height: 19})
partImages.push({source: "./src/images/body2.png", x:350*scaleFactor , y: canvas.height-180*scaleFactorTop, width: 104, height: 140})
partImages.push({source: "./src/images/body3.png", x:470*scaleFactor , y: canvas.height-200*scaleFactorTop, width: 77, height: 87})
partImages.push({source: "./src/images/body4.png", x:470*scaleFactor , y: canvas.height-90*scaleFactorTop, width: 77, height: 87})
partImages.push({source: "./src/images/body5.png", x:590*scaleFactor , y: canvas.height-180*scaleFactorTop, width: 22, height: 140})
partImages.push({source: "./src/images/body6.png", x:650*scaleFactor , y: canvas.height-180*scaleFactorTop, width: 22, height: 140})

scaleFactorTop = scaleImg

function drawImages() {   
    fabric.Image.fromURL("./src/images/bodyRef.png", function (Img) { 
        Img.set({
            cacheKey:'bodyRef',
            width:272,
            height:521,
            originX: "left",
            originY: "top",
            top: 15*scaleImg,
            left: (canvas.width - 272*scaleImg)/2,
            scaleX: scaleImg*0.99,
            scaleY: scaleImg*0.99,
            lockMovementX: true,
            lockMovementY: true,
            lockRotation:true,  
            selectable: false,            
        });
         Img.hasBorders = false;
         Img.hasControls = false;
         
        canvas.add(Img).setActiveObject(Img);
        
      }) 
         
    for (let i = 0; i < partImages.length; i++) {                
        fabric.Image.fromURL(partImages[i].source, function (img) {            
            img.set({
                top: partImages[i].y, 
                left: partImages[i].x,
                cacheKey: partNames[i], 
                scaleX: scaleImg,
                scaleY: scaleImg,
                lockRotation:true,   
                            
            });
            img.hasBorders = false;
            img.hasControls = false;
            
            canvas.add(img).setActiveObject(img);                        
          })       
    } 
    canvas.renderAll()
}

drawImages();

canvas.on('object:moving', function () {      
    // Canvas border limitation
    let limitTop = canvas.getActiveObject().top < 0;
    let limitBottom = (canvas.getActiveObject().top + canvas.getActiveObject().height) > canvas.height;
    let limitLeft = canvas.getActiveObject().left < 0;
    let limitRight = (canvas.getActiveObject().left + canvas.getActiveObject().width) > canvas.width;

    if (limitTop) {
        canvas.getActiveObject().set({top: 1});        
    } 
    if (limitBottom) {
        canvas.getActiveObject().set({top: canvas.height - canvas.getActiveObject().height- 5});         
    } 
    if (limitLeft) {
        canvas.getActiveObject().set({left: 1});        
    } 
    if (limitRight) {
        canvas.getActiveObject().set({left: canvas.width - canvas.getActiveObject().width- 5});         
    } 

    // Checking Positions
    let limitPartTop, limitPartLeft;
  
    if(canvas.getActiveObject().cacheKey === 'head'){
        limitPartTop = (canvas.getActiveObject().top >= 6*scaleFactorTop) && (canvas.getActiveObject().top <= 30*scaleFactorTop);        
        limitPartLeft = (canvas.getActiveObject().left >= 210*scaleFactor) && (canvas.getActiveObject().left <= 240*scaleFactor); 
        if (limitPartTop && limitPartLeft) {
            canvas.getActiveObject().set({
                top: 18*scaleFactorTop, 
                left: 224*scaleFactor, 
                lockMovementX: true,
                lockMovementY: true,
            });           
        }  
    }
    if(canvas.getActiveObject().cacheKey === 'leftHand'){
        limitPartTop = (canvas.getActiveObject().top >= 328*scaleFactorTop) && (canvas.getActiveObject().top <= 348*scaleFactorTop);        
        limitPartLeft = (canvas.getActiveObject().left >= 435*scaleFactor) && (canvas.getActiveObject().left <= 455*scaleFactor); 
        if (limitPartTop && limitPartLeft) {
            canvas.getActiveObject().set({
                top: 338*scaleFactorTop, 
                left: 445*scaleFactor, 
                lockMovementX: true,
                lockMovementY: true,
                selectable: false,
            });
        }  
    }
    if(canvas.getActiveObject().cacheKey === 'rightHand'){
        limitPartTop = (canvas.getActiveObject().top >= 328*scaleFactorTop) && (canvas.getActiveObject().top <= 348*scaleFactorTop);        
        limitPartLeft = (canvas.getActiveObject().left >= 201*scaleFactor) && (canvas.getActiveObject().left) <= 221*scaleFactor; 
        if (limitPartTop && limitPartLeft) {
            canvas.getActiveObject().set({
                top: 338*scaleFactorTop, 
                left: 212*scaleFactor, 
                lockMovementX: true,
                lockMovementY: true,
                selectable: false,
            });
        }  
    }
    if(canvas.getActiveObject().cacheKey === 'leftFoot' || canvas.getActiveObject().cacheKey === 'rightFoot'){
        limitPartTop = (canvas.getActiveObject().top >= 500*scaleFactorTop) && (canvas.getActiveObject().top <= 520*scaleFactorTop);        
        limitPartLeft = (canvas.getActiveObject().left >= 340*scaleFactor) && (canvas.getActiveObject().left <= 360*scaleFactor); 
        limitPartRight = (canvas.getActiveObject().left >= 288*scaleFactor) && (canvas.getActiveObject().left <= 308*scaleFactor); 
        if ((limitPartTop && limitPartLeft) && !blockLeftFoot) {
            canvas.getActiveObject().set({
                top: 510*scaleFactorTop, 
                left: 350*scaleFactor, 
                lockMovementX: true,
                lockMovementY: true,
                selectable: false,
            });
            blockLeftFoot = true; 
        }  
        if ((limitPartTop && limitPartRight) && !blockRightFoot) {
            canvas.getActiveObject().set({
                top: 510*scaleFactorTop, 
                left: 298*scaleFactor, 
                lockMovementX: true,
                lockMovementY: true,
                selectable: false,
            });
            blockRightFoot = true;
        }  
    }
    if(canvas.getActiveObject().cacheKey === 'abdomen'){
        limitPartTop = (canvas.getActiveObject().top >= 234*scaleFactorTop) && (canvas.getActiveObject().top <= 258*scaleFactorTop);        
        limitPartLeft = (canvas.getActiveObject().left >= 282*scaleFactor) && (canvas.getActiveObject().left <= 306*scaleFactor); 
        if (limitPartTop && limitPartLeft) {
            canvas.getActiveObject().set({
                top: 246*scaleFactorTop, 
                left: 294*scaleFactor, 
                lockMovementX: true,
                lockMovementY: true,
                selectable: false,
            });           
        }  
    }
    if(canvas.getActiveObject().cacheKey === 'leftArm'){
        limitPartTop = (canvas.getActiveObject().top >= 252*scaleFactorTop) && (canvas.getActiveObject().top <= 276*scaleFactorTop);        
        limitPartLeft = (canvas.getActiveObject().left >= 376*scaleFactor) && (canvas.getActiveObject().left <= 400*scaleFactor); 
        if (limitPartTop && limitPartLeft) {
            canvas.getActiveObject().set({
                top: 264*scaleFactorTop, 
                left: 388*scaleFactor, 
                lockMovementX: true,
                lockMovementY: true,
                selectable: false,
            });           
        }  
    }
    if(canvas.getActiveObject().cacheKey === 'rightArm'){
        limitPartTop = (canvas.getActiveObject().top >= 252*scaleFactorTop) && (canvas.getActiveObject().top <= 276*scaleFactorTop);        
        limitPartLeft = (canvas.getActiveObject().left >= 212*scaleFactor) && (canvas.getActiveObject().left <= 236*scaleFactor); 
        if (limitPartTop && limitPartLeft) {
            canvas.getActiveObject().set({
                top: 264*scaleFactorTop, 
                left: 226*scaleFactor, 
                lockMovementX: true,
                lockMovementY: true,
                selectable: false,
            });           
        }  
    }
    if(canvas.getActiveObject().cacheKey === 'leftLeg' || canvas.getActiveObject().cacheKey === 'rightLeg'){
        limitPartTop = (canvas.getActiveObject().top >= 366*scaleFactorTop) && (canvas.getActiveObject().top <= 386*scaleFactorTop);        
        limitPartLeft = (canvas.getActiveObject().left >= 350*scaleFactor) && (canvas.getActiveObject().left <= 370*scaleFactor); 
        limitPartRight = (canvas.getActiveObject().left >= 298*scaleFactor) && (canvas.getActiveObject().left <= 318*scaleFactor); 
        if ((limitPartTop && limitPartLeft) && !blockLeftLeg) {
            canvas.getActiveObject().set({
                top: 376*scaleFactorTop, 
                left: 361*scaleFactor, 
                lockMovementX: true,
                lockMovementY: true,
                selectable: false,
            });
            blockLeftLeg = true; 
        }  
        if ((limitPartTop && limitPartRight) && !blockRightFoot) {
            canvas.getActiveObject().set({
                top: 376*scaleFactorTop, 
                left: 308*scaleFactor, 
                lockMovementX: true,
                lockMovementY: true,
                selectable: false,
            });
            blockRightLeg = true;
        }  
    }
  });


