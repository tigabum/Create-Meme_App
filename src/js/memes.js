import './complete';

let deviceWidth = window.innerWidth;

class Meme{
    constructor(){
       console.log("Memes class");
       this.$canvas = document.querySelector('#imgCanvas');
       this.$topText = document.querySelector('#topText');
       this.$bottomText = document.querySelector('#bottomText');
       this.$imageInput = document.querySelector('#image');
       this.$downloadMeme = document.querySelector('#downloadMeme');

       this.createCanvas();
       this.addEventListeners();
       
       
       
    }

    createCanvas(){
        let canvasWidth = Math.min(640, deviceWidth-30);
        // console.log(canvasWidth);
        let canvasHeight = Math.min(480, deviceWidth-30);
        // console.log(canvasHeight);
        this.$canvas.height = canvasHeight;
        this.$canvas.width = canvasWidth;
    }

    createMeme(){
        // debugger;   
        let context  = this.$canvas.getContext('2d');
        if(this.$imageInput.files && this.$imageInput.files[0]){
                let reader = new FileReader();
                reader.onload = () =>{
                    console.log("file completely read");
                    // console.log(reader);
                    let memeImage = new Image();

                    memeImage.onload = ()=>{
                        // console.log(memeImage);
                        this.$canvas.height = memeImage.height;
                        this.$canvas.width = memeImage.width;
                        // console.log(this.$canvas.height, this.$canvas.width);
                        context.clearRect(0,0,this.$canvas.height,this.$canvas.width);
                        context.drawImage(memeImage, 0,0);
                        // console.log(context);

                        let fontSize = ((this.$canvas.height+this.$canvas.width)/2)*4/100;
                        context.font = `${fontSize}pt sans-serif`;
                        context.textAlign = 'center';
                        context.textBaseline = 'top';
                        context.lineWidth = fontSize/5;
                        context.strokeStyle = 'black';
                        context.fillStyle = 'white';
                        context.lineJoin = 'round';

                        const topText = this.$topText.value.toUpperCase();
                        const bottomText = this.$bottomText.value.toUpperCase();

                        context.strokeText(topText, this.$canvas.width/2, this.$canvas.height*(5/100));
                        context.fillText(topText,this.$canvas.width/2, this.$canvas.height*(5/100));
                        // this.$topText.value = "";

                        context.strokeText(bottomText,this.$canvas.width/2, this.$canvas.height*(90/100));
                        context.fillText(bottomText,this.$canvas.width/2, this.$canvas.height*(90/100));
                        // this.$bottomText.value = "";
                        this.resizeCanvas(this.$canvas.height, this.$canvas.width);

                    }
                    memeImage.src = reader.result;
                    console.log("before load event fired, image loaded");
                }
                reader.readAsDataURL(this.$imageInput.files[0]);
                console.log("Reading before loading image");

        }
        
    }
    addEventListeners(){
        let eventholder = [this.$topText, this.$bottomText, this.$imageInput];
        eventholder.forEach(element => element.addEventListener('change', this.createMeme.bind(this)));
        this.$downloadMeme.addEventListener('click', this.downloadMeme.bind(this));         
       
    }

    downloadMeme(){
       
        if(!this.$imageInput.files[0]){
            this.$imageInput.parentElement.classList.add("has-error");
            console.log("no image")
            return;
        }
        if(this.$bottomText.value === " "){
            this.$imageInput.parentElement.classList.remove('has-error');
            this.$bottomText.parentElement.classList.add('has-error');
            console.log("no bottom Text")
            return;
        }
            this.$imageInput.parentElement.classList.remove('has-error');
            this.$bottomText.parentElement.classList.remove('has-error');
            const imageSource = this.$canvas.toDataURL('image/png');
            let att = document.createAttribute('href');
            att.value= imageSource.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
            this.$downloadMeme.setAttributeNode(att);

    }
    resizeCanvas(imageHeight, imageWidth){
        let height = imageHeight;
        let width = imageWidth;
        this.$canvas.style.height = `${height}px`;
        this.$canvas.style.width = `${width}px`;
        while(height> Math.min(1000, deviceWidth-30) && width > Math.min(1000, deviceWidth-30)){
            height /=2;
            width /=2;
            this.$canvas.style.height = `${height}px`;
            this.$canvas.style.width = `${width}px`;
        }

    }

}
new Meme();


