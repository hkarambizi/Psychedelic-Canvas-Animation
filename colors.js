window.onload = function(){

    // get the canvas and the context and store in variables
    var canvas = document.getElementById("trippy");
    var ctx = canvas.getContext("2d");

    //set canvas dims to window height and width
    var W = window.innerWidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // generate the drops and apply attributes
    var md = 200; //max color drops
    var drops = [];  //array of all colorful drop objects

    // loop through the empty drops and apply attributes
    for(var i = 0; i < md; i++){

      drops.push({
        x: Math.random()*W,
        y: Math.random()*H,
        r: Math.random()*5+2, //min of 2px and max of 7px
        d: Math.random() + 1 //density of snowflake
      }); //new object end
    } //for loop end

    //draw drops on canvas
    function drawDrops(){
      // assign a  hue variable to random RGB colors
      var hue = 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
      ctx.clearRect(0,0,W,H); // creates transparent drawn element
      ctx.fillStyle = hue;
      ctx.beginPath(); // function of canvas api
      for(var i = 0; i < md; i++){
        var f = drops[i];
        ctx.moveTo(f.x, f.y); // random placement
        ctx.arc(f.x, f.y, f.r, 0, Math.PI*2, true); //math.pi*2 makes a full circle
      } //for loop end
      ctx.fill();
      moveDrops(); // we need to create this function
    } //drawDrops end

    var angle = 0;
    // animate the drops
    function moveDrops(){
      angle += 0.01;
      for(var i = 0; i < md; i++) {

        //store the current flake
        var f = drops[i];

        // update X and Y coordinates of each snowflake
        f.y += Math.pow(f.d, 6) + 1; // y coordinate is set to the density^6 to alternate falling speed according to density
        f.x += Math.sin(angle) * 1; // // x coordinates are updated to make a curve effect

        // if the snowflake hits the bottom, send a new one to the top
        if(f.y > H){ // if the y-coordinate falls below the screen
          drops[i] = {
            x: Math.random()*W, // random x placement
            y: 0, // reset the y to the top of the screen
            r: f.r,
            d: f.d
          }; // drop object

        } //if block

      } //for loop
    } //moveDrops

  setInterval(drawDrops, 100);

} //window.onload end
