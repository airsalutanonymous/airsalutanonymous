var URLlink = []

var data_ = []; 
var idArray = {};
var globalArray = {};
var typearray = [];
var arrayTypes = [];

function alphabetPosition(text) {
   var result = 0;
   for (var i = 0; i < text.length; i++) {
     var code = text.toUpperCase().charCodeAt(i)
     result += code;
   }
 
   return result;
 }


d3.csv("visualization/data.csv", function(dataCSV){
   //d3.csv("data.csv", function(dataCSV){
   //  console.log(dataCSV)
   var arrayCoding = [];
   for (var property in dataCSV){



      if (property[0] == "Q" && dataCSV[property] != ""){
         /* For the quotes */
         var data = dataCSV[property];
         var q3 = "No code"
         var quote = data;
         //console.log("+++")
         if (data.split("]").length > 1){
            q3 = data.split("]").shift().substring(1);
            var dataShifted = data.split("]").slice(1, data.split("]").length);
            quote = dataShifted.join();
         }
         var c1 = dataCSV["Strengths and Weaknesses of Air Gestures"];
         var c2 = dataCSV["Bucket2"];
         var concat = c1[0] + c1[1]+c1[2] + c1[3]+c1[4] + c1[5]+ c1[6]+ c1[7]+ c1[8]+"_" + c2;
         var dataObject = {
            "coding3": q3,
            "coding1": c1,
            "coding2": c2,
            "quote": quote,
            "type": concat,
            "participant": property.slice(5,property.length),
            "position": alphabetPosition(q3) //horizontally
         };

         

         
         //arrayCoding.push(dataObject);
         if (idArray[concat] != undefined) {
            idArray[concat]++;
         }
         else {
            idArray[concat] = 1;
            globalArray[concat] = []
         }
         globalArray[concat].push(dataObject)
      }
   }

  // console.log(globalArray)

   /*
   for (var coding in arrayCoding){
   //    console.log(arrayCoding, coding)
      var objectToCreate = JSON.parse(JSON.stringify(dataCSV));
      var concat = arrayCoding[coding]//+'_'+objectToCreate['Condition'].split('-')[0]


        
      if (idArray[concat] != undefined) {
         idArray[concat]++;
      }
      else {
         idArray[concat] = 1;
         globalArray[concat] = []
      }


      objectToCreate['type'] = arrayCoding[coding];
      // objectToCreate['concat'] = concat;
      objectToCreate['id_'] = idArray[concat];
   //    // objectToCreate['Condition'] = 0//objectToCreate['Condition'].split('-')[0];
      objectToCreate['part'] = parseInt(objectToCreate['Sketchnotes'])

      
   //    // // data_.push(objectToCreate);
      globalArray[concat].push(objectToCreate)


      objectToCreate['Sketchnotes'] = parseInt(objectToCreate['Sketchnotes'])
      // if (typearray.indexOf(arrayCoding[coding]) == -1) typearray.push(arrayCoding[coding]);

   }
   */
}).then(()=>{


   for (var i in globalArray){
      var array = globalArray[i];
      var arraySorted = array.sort(function(a, b) {
         return a.position - b.position;
      });

     for (var k = 0; k<arraySorted.length; k++){
         arraySorted[k]['id_'] = k+1;
         data_.push(arraySorted[k])
      }
   }
   
   launchViz(data_);
   // console.log('HELLO', data_)
});
// launchViz(data);


function launchViz(data){

   
  





   data.sort(function(a, b) {
      return d3.ascending(a.type, b.type)
   })
      // set the dimensions and margins of the graph
      var margin = {top: 100, right: 20, bottom: 30, left: 600},
         width = 12000 - margin.left - margin.right,
         height = 3500 - margin.top - margin.bottom;

      // set the ranges
      var x = d3.scaleLinear()
               .range([0, width])
               
      var y = d3.scaleBand()
               .domain(data.map(function(d) { return d.type; }))
               .range([height, 0])
               .padding(0.2)
               

               
      var colorParticipant = d3.scaleOrdinal(d3.schemeSet3);
      //var colorParticipant  = d3.scaleLinear();

      // append the svg object to the body of the page
      // append a 'group' element to 'svg'
      // moves the 'group' element to the top left margin
      var svg = d3.select("#resultsGraph").append("svg")
         .attr("width", width + margin.left + margin.right)
         .attr("height", 1500)
      //    .call(d3.zoom().on("zoom", function () {
      //      svg.attr("transform", d3.event.transform)
      //   }))
      .append("g")
       
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")scale(0.4)");


       svg.append("g").attr("transform", "translate(-500,-100)")
           .append("text")
           .style("font-size","50px")
           .style("font-family","Roboto")
           .style("font-weight","bold")
           .text(function(d,i){
               return "Classification"
           })

      var max = width;  
      var minX = -650

      // addBG(svg, minX, max,0, 300, 'red');   
      // addBG(svg, minX, max,300, 240, 'green');     
      // addBG(svg, minX, max,540, 120, 'blue');     
      // addBG(svg, minX, max,660, 120, 'red'); 
      // addBG(svg, minX, max,780, 270, 'green'); 
      // addBG(svg, max,300, 180, 'red');      

      // var path = makeCurlyBrace(100, 100, 100, 400, 1, 1)
      var X = -650
      var offset = 96;

      var playa = [0, 6, 4,3,6, 12, 4]
      var name = [
          'Value of air gestures', 
          'Cost of air gestures', 
          'Characteristics of suitable tasks', 
          'Design factors for gestures', 
          'Design rationale',
          'Other modalities'
       ]
       var color = d3.scaleOrdinal(d3.schemeDark2);
      
   var minA = 0;
   var maxA = 0;
   var maxABarackket = 0;

   for (var i =0; i <playa.length-1; i ++){
       minA += playa[i] * offset;
       maxA = playa[i+1] * offset;
       maxABarackket += playa[i+1] * offset;
       addBG(svg, minX, max, minA, maxA, color(i));   
       appendBracket(svg, X, minA, X, maxABarackket, name[i], 10, 0.6);
       
   }


   // var X = -600
   // var playa = [0, 11, 40, 23]
   // var name = ['ENVIRONMENT', 'DEVICE & MODALITY', 'CONFIGURATION']
   //  var color = d3.scaleOrdinal(d3.schemeDark2 );
   
   // var minA = 0;
   // var maxA = 0;
   // for (var i =0; i < playa.length-1; i ++){

   //     minA += playa[i] * offset;
   //     maxA += playa[i+1] * offset;  
   //     appendBracket(svg, X, minA, X, maxA, name[i], 10, 1);
       
   // }

      // append the rectangles for the bar chart
      var place = svg.selectAll(".bar")
            .data(data)
            .enter().append('g').attr('class', 'bar')
            .style('cursor', 'pointer')
            .attr("transform", function(d) {
               // console.log(y(d.type))
               return "translate(-50, " +  (y(d.type))+")"; 
            })
           //  .on("click", function(d) {	
           //     console.log()
           //     var urlConcat = "http://" + URLlink[d.Sketchnotes-1]
           //     var win = window.open(urlConcat, '_blank');
           //  })
            .on("mouseover", function(d) {	
               
               // console.log(window.scrollX)
               var BB = d3.select(this).node().getBoundingClientRect();
               // console.log(BB)
               div.transition()		
                  .duration(0)		
                  .style("opacity", 1);		
               // div.html(d.Sketchnotes)	
               //    .style("left", (BB.x +10) + "px")		
               //    .style("top", (window.scrollY + BB.y - 35) + "px");
               // console.log('<img src=Viz/image '+d.Sketchnotes+'.jpg>')	
               // div.html('<img src="visualization/Viz/image ('+d.part+').png">')
               div.html(d.coding3 +" : "+ d.quote)	
                   .style("position", "absolute")		
                   // .style("position", "absolute")		
                  .style("left", (BB.x + 100 + window.scrollX) + "px")		
                  .style("width", "400px")		
                  .style("top", (window.scrollY + BB.y - 35) + "px");	
               })					
               .on("mouseout", function(d) {		
                     div.transition()		
                        .duration(0)		
                        .style("opacity", 0);	
               });


         // MY BAR ==> GROUP OF BARS
           var g = place.append('g')
            .attr("transform", function(d) {
               // if (d.type == "Personal - Making it personal" && d.Condition == "VR") console.log(d)

               var y = 0//y1(d.Condition);
               var x = (Math.ceil (d.id_));
               var y2 = (d.id_ - x) * 80; 
               return "translate("+(x*90)+","+(y2)+")"; 
            
            })
     
        

         g.append("rect")
            .attr("class", "bar")
            .attr("width", 80)
            .attr("height", 80)
            .attr('stroke', 'black')
            .attr("fill", 'none')
            .attr('stroke-width', '0.1')
            .attr("fill",function(d,i){ 
               // if (d.type == "Personal - Making it personal" && d.id_ == 1) return 'red'
               // else  
               return colorParticipant(d.coding3) 
            });
            g.append("image")
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', 80)
            .attr('height', 80)
            .attr('class', 'imageThumbnail')
            .style("opacity", 0.3)
            .attr("xlink:href", function(d,i){
               // return  "visualization/images/avatar.png";
               // return  "visualization/Viz/image ("+d.part+")Cropped.jpg";
               return  "visualization/Viz/avatar.png";
            })

            
           // //  .attr('stroke', 'black')
           //  .attr("fill", 'black')
           //  .attr('stroke-width', '0.1')
            // g.append("circle")
            // .attr("class", "circleBlack")
            // .attr("cx", 18)
            // .attr("cy", 18).attr('r', 15)

            g.append("text").text(function(d,i){
               //console.log(d)
               return d.participant;
            })
            .style("font-size","20px")
            .style("font-family","Roboto")
            .style("text-anchor","left")
               .attr('fill', 'black')
               .attr("dy", 21)
               .attr("dx", 5)
           // //  .attr('stroke', 'black')
           //  .attr("fill", 'black')
           //  .attr('stroke-width', '0.1')
            

// var svg2 = d3.select("#resultsGraph").append("svg").attr("width",360)
//         .attr("height", height + margin.top + margin.bottom).style("position" , 'fixed')
//         .style("background" , 'white')
//         .style('top', '200px')
//         .append("g")
//         .attr("transform", 
//             "translate(" + margin.left + "," + margin.top + ")")
     


svg.append("g")
   .attr("class", "axis")
   .style("font-size","25px") 
   .style("font-family","Roboto")
   .call(d3.axisLeft(y).tickFormat(function(d){  
      // console.log(d)
       return d.split("_")[1];
   }));

   // .replace(/ *\([^)]*\) */g, "");
      var div = d3.select("body").append("div")	
            .attr("class", "tooltip")				
            .style("opacity", 0);



        

};
function appendBracket(svg, x1, y1, x2, y2, txt, p1, p2){
   bracket = svg.append("path").attr("class","curlyBrace");
   bracket.attr("d", function(d) { return makeCurlyBrace(x1, y1+5, x2, y2-5, p1, p2); });
   bracket.attr('fill', 'none')
   bracket.attr('stroke-width', '2px')
   bracket.attr('stroke', 'black')

   svg.append("text")
   .style("font-family","Roboto")
   .style("font-size","30px")
   .attr('dx', (x1+x2)/2 - 20)
   .attr('dy', (y1+y2)/2 + 5)
   .attr('text-anchor', 'end')
   .text(txt)
}
function addBG(svg, minX, max, where, height, color){
   var redBox = svg.append("rect")
   .attr("x", minX)
   .attr("y", where)
   .attr("width", max)
   .attr("height", height)
   .attr("fill", color)
   .attr("opacity", 0.2);
}

function makeCurlyBrace(x1,y1,x2,y2,w,q){
            //Calculate unit vector
            var dx = x1-x2;
            var dy = y1-y2;
            var len = Math.sqrt(dx*dx + dy*dy);
            dx = dx / len;
            dy = dy / len;

            //Calculate Control Points of path,
            var qx1 = x1 + q*w*dy;
            var qy1 = y1 - q*w*dx;
            var qx2 = (x1 - .25*len*dx) + (1-q)*w*dy;
            var qy2 = (y1 - .25*len*dy) - (1-q)*w*dx;
            var tx1 = (x1 -  .5*len*dx) + w*dy;
            var ty1 = (y1 -  .5*len*dy) - w*dx;
            var qx3 = x2 + q*w*dy;
            var qy3 = y2 - q*w*dx;
            var qx4 = (x1 - .75*len*dx) + (1-q)*w*dy;
            var qy4 = (y1 - .75*len*dy) - (1-q)*w*dx;

        return ( "M " +  x1 + " " +  y1 +
                 " Q " + qx1 + " " + qy1 + " " + qx2 + " " + qy2 + 
                  " T " + tx1 + " " + ty1 +
                  " M " +  x2 + " " +  y2 +
                  " Q " + qx3 + " " + qy3 + " " + qx4 + " " + qy4 + 
                  " T " + tx1 + " " + ty1 );
        }