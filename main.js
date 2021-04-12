status="";
objects=[];

function setup(){
    canvas=createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380, 380)
}

function draw(){
    image(video, 0, 0, 380, 380);

    if(status!=""){
        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML="status: objects detected";
            document.getElementById("number_of_objects").innerHTML="number of objects detected are:"+objects.length;

            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
            if(objects[i].label==object_name){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML = object_name + " Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + "Found");
                synth.speak(utterThis);
            }

            document.getElementById("object_status").innerHTML = object_name + "not Found";
        }
    }
}
 
function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
    object_name=document.getElementById("object_name").value;
}

function moedlLoaded(){
    console.log("modelLoaded");
    status=true;
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }

    console.log(results);        
    objects=results;
    
}