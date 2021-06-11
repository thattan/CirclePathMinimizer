var xCoords = [];
var yCoords = [];

$(document).ready(function () {
    $('#line-area').click(function (e) {
        var xCoord = 0;
        var yCoord = 0;
        xCoord = e.clientX;
        yCoord = e.clientY;

        /* // Commenting Circle creation using div's going to try and use canvas drawing instead
        var circle = document.createElement("div");
        circle.classList.add("circle");
        circle.style.borderRadius = "50%"; //Make div a circle
        circle.style.height = "25px";
        circle.style.width = "25px";
        circle.style.backgroundColor = "black";
        circle.style.position = "absolute";

        var startPositionX = xCoord - 12.5; // Circles radius is 12.5, changing start position allows circle center to be at the click
        var startPositionY =  yCoord - 12.5;

        circle.style.left =  "" + startPositionX + "px";
        circle.style.top = "" + startPositionY + "px";

        $(".line-area").append(circle);
        */

        var lineArea = document.getElementById("line-area");
        var lineContext = lineArea.getContext("2d");
        var circle = new Path2D();
        circle.arc(xCoord,yCoord,50,0,2*Math.PI);
        lineContext.fill(circle);

        xCoords.push(xCoord);
        yCoords.push(yCoord);

        //alert("" + xCoord + " " + yCoord);
    });

    $('#testbutton').click(function (e) {
        var tempXCoords = xCoords;
        var tempYCoords = yCoords;
        var nextIndexToCheck = -1; // initial value doesn't matter
                                   // next index to check is the index that the
                                   // line ends at so it makes a continuous line
        var lineArea = $("#line-area");
        var lineContext = lineArea.getContext("2d");
        lineContext.beginPath();
        for (i = 0; i < xCoords.length; i++) { // 0(N)
            var xCoord = -1;
            var yCoord = -1;

            if (i == 0) {
                xCoord = xCoords[i];
                yCoord = yCoords[i];
            } else {
                xCoord = xCoords[nextIndexToCheck];
                yCoord = yCoords[nextIndexToCheck];
            }
        
            var shortestLengthATM = -1;
            var shortestLengthIndexATM = -1; // initial value doesn't matter
                                             // this is the index of the 

            for (y = 0; y < tempXCoords.length; y++) { // 0(N^2)
                if (i == y) {
                    continue;
                } else if (tempXCoords[y] == -1) {
                    continue;
                }

                var tempX = xCoords[y];
                var tempY = yCoords[y];

                var hypotenuse = Math.sqrt(Math.abs(tempX - xCoord) ^ 2 + Math.abs(tempY - yCoord) ^ 2);

                if (y == 0) {
                    shortestLengthIndexATM = 0;
                    shortestLengthATM = hypotenuse;
                    lineContext.moveTo(xCoords[y], yCoords[y]);
                } else {
                    if (hypotenuse < shortestLengthATM) {
                        shortestLengthATM = hypotenuse;
                        shortestLengthIndexATM = y;
                        lineContext.lineTo(xCoords[y], yCoords[y]);
                    } 
                }
            }
            
            // draw line
            if (i != 0) {
                tempXCoords[shortestLengthIndexATM] = -1;
                tempYCoords[shortestLengthIndexATM] = -1;
            }
            nextIndexToCheck = shortestLengthIndexATM;
        }
        lineContext.stroke();
    });

});