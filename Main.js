status = "";
object = [];

function gotresults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object = results
}
function setup(){
 canvas =  createCanvas(400,400);
canvas.center();
video = createCapture(VIDEO)
video.hide();
}
function start(){
objectDetector = ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML = "Status: Detecting Objects";

}
function modelLoaded(){
    console.log("modelLoaded");
    status = true;
   
}

function draw() {
    image(video, 0,0,400,400);
   

    if (status !=""){
        objectDetector.detect(video,gotresults);
            for(var i =0; i < object.length;i++){
        document.getElementById("status").innerHTML = "status: Object detected";
        document.getElementById("number_of_objects").innerHTML = " Number of objects Detected are: "+object.length;
        fill("white");
        percent = floor(object[i].confidence*100);
        text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
        noFill();stroke("green");
        rect(object[i].x,object[i].y,object[i].width,object[i].height);
            }
        }
}