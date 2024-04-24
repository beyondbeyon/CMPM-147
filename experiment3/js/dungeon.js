/* exported generateGrid, drawGrid */
/* global placeTile */

var s = function(p){

    p.generateGrid = function(numCols, numRows){
        let grid = [];
        for (let i = 0; i < numRows; i++) {
          let row = [];
          for (let j = 0; j < numCols; j++) {
            let r = noise(i/40,j/40);
            if(abs(r - 0.5)< 0.03){
              row.push("w")
            }
            else{
              let a = noise(i/20,j/20);
              if(a >0.5){
                row.push(":")
              }
              else{
                row.push("_")
              }
            }
          }
          grid.push(row);
        }
        
        return grid;
    }

    p.drawGrid = function(grid){
        background(128);

        for(let i = 0; i < grid.length; i++) {
            for(let j = 0; j < grid[i].length; j++) {
            placeTile(i, j, 4 * pow(random(),10) | 10, 23);
            
            if (gridCheck(grid,i,j,"_")) {
                placeTile(i, j, 4 * pow(random(),10) | 10, 23);
            }
            else{
                drawContext(grid, i, j, ':',15,21)
            }
            
            if (gridCheck(grid,i,j,":")) {
                placeTile(i, j, 4 * pow(random(),10) | 12, 21);
            }
            else{
                drawContext(grid, i, j, '_',15,21)
                //drawContext(grid, i, j, 'w',15,21)
            }
            }
        }
    }

    p.gridCheck = function(grid, i, j, target){
        if(i >= 0 && i < grid.length && j>= 0 && j<grid[i].length){
            return grid[i][j]==target;
        }
        else{
            return false;
        }
    }

    p.gridCode = function(grid, i, j, target){
        return((gridCheck(grid,i--,j,target)<<0) +(gridCheck(grid,i++,j,target)<<3) +
         (gridCheck(grid,i,j--,target)<<1) + (gridCheck(grid,i,j++,target)<<2))
    }

    p.drawContext = function(){
        let v = gridCode(grid, i, j, target)
  
        if(inverted){
            v = ~v & 0xf
        }
        
        let [ti,tj] = lookup[v];
        placeTile(i, j, dti + ti, dtj + tj);
    }

    const lookup = [
        [1, 1],
        [1, 0],
        [0, 1], 
        [0, 0],
        [2, 1], 
        [2, 0], 
        [1, 1],
        [1, 0],  
        [1, 2],
        [1, 1],
        [0, 2], 
        [0, 1], 
        [2, 2], 
        [2, 1], 
        [1, 2], 
        [1, 1]
      ];

}
var myp5 = new p5(s, 'c1')

var t = function(p){

    p.generateGrid = function(numCols, numRows){
        let grid = [];
        for (let i = 0; i < numRows; i++) {
            let row = [];
            for (let j = 0; j < numCols; j++) {
            let r = noise(i/40,j/40);
            if(abs(r - 0.5)< 0.03){
                row.push("w")
            }
            else{
                let a = noise(i/20,j/20);
                if(a >0.5){
                row.push(":")
                }
                else{
                row.push("_")
                }
            }
            }
            grid.push(row);
        }
        
        return grid;
    }

    p.drawGrid = function(grid){
        background(128);
        const wind = millis()/8000
        
        noStroke();
        for(let i = 0; i < grid.length; i++) {
            for(let j = 0; j < grid[i].length; j++) {
            placeTile(i, j, (4 * pow(noise(mouseY / 100, i, j / 4 + wind), 2)) | 0, 14);
            
            if (gridCheck(grid,i,j,"_")) {
                placeTile(i, j, (4 * pow(random(),10)) | 0, 4);
            }
            else{
                drawContext(grid,i,j,"_",9,3);
            }
            
            if (gridCheck(grid,i,j,":")) {
                placeTile(i, j, 4 * pow(noise(wind / 10, i, j / 4 + wind),2) | 0, 6);
            }
            else{
                drawContext(grid,i,j,":",4,6,);
            }
            }
        }
    }

    p.gridCheck = function(grid, i, j, target){
        if(i >= 0 && i < grid.length && j>= 0 && j<grid[i].length){
            return grid[i][j]==target;
        }
        else{
            return false;
        }
    }

    p.gridCode = function(grid, i, j, target){
        return((gridCheck(grid,i--,j,target)<<0) +(gridCheck(grid,i++,j,target)<<3) +
         (gridCheck(grid,i,j--,target)<<1) + (gridCheck(grid,i,j++,target)<<2))
    }

    p.drawContext = function(){
        let v = gridCode(grid, i, j, target)
  
        if(inverted){
            v = ~v & 0xf
        }
        
        let [ti,tj] = lookup[v];
        placeTile(i, j, dti + ti, dtj + tj);
    }

    const lookup = [
        [1, 1],
        [1, 0],
        [0, 1], 
        [0, 0],
        [2, 1], 
        [2, 0], 
        [1, 1],
        [1, 0],  
        [1, 2],
        [1, 1],
        [0, 2], 
        [0, 1], 
        [2, 2], 
        [2, 1], 
        [1, 2], 
        [1, 1]
      ];

}
var myp5 = new p5(t, 'c2')