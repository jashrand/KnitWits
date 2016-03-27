/**
 *  StitchFactory.js
 */


var StitchFactory = 
{
	material : new THREE.LineBasicMaterial( { 
	    vertexColors: THREE.VertexColors,
	    linewidth: 60
     	} ),

    bumpAmount : 0.1, 
    
	 /**
	 *  Define vertices for a single stitch
	 */
	vertices : new Float32Array([
	
	   -0.3, -0.5, 0.1/2,
	   -0.2, -0.48, 0.1/2,
	   -0.1, -0.4, 0,
	   -0.2, 0.4, 0.1,
	   -0.1, 0.48, -0.1/2,
		0, 0.5, -0.1, // Center
		0.1, 0.48, -0.1/2,
		0.2, 0.4, 0.1,
		0.1, -0.4, 0,
		0.2, -0.48, 0.1/2,
		0.3, -0.5, 0.1/2]),
		
	stitchHeight : 1,
	stitchWidth : 0.6,
		
    colors: new Float32Array([
        //0, 1, 1,
        //0, 1, 1,
        0, 1, 1,
        0, 0.5, 1,
        0, 0, 1,
        0.5, 0, 1, 
        1, 0, 1,
        1, 0, 0.5,
        1, 0, 0,
        1, 0.5, 0,
        1, 1, 0,
        0.5, 1, 0,
        0, 1, 0]),


	/**
	 * Creates and returns the vertex array for a row with the given number of stitches
	 * @param length The number of stitches in the row
	 * @param xOffset the x-offset for the row
	 * @param yOffset the y-offset for the row
	 * @param isBack Whether the row is a back (wrong-side) row
	 */
	createStitchRowVertices : function (length, yOffset, isBack)
	{
		 
		 console.log(this.bumpAmount);
		 var verts = new Float32Array(this.vertices.length * length);
		 var colors = new Float32Array(this.colors.length * length);
		 scaleFactorX = 1;
		 scaleFactorY = 1;
		 
		 var rowLength = length * this.stitchWidth;
		 
		 for(i = 0; i < length; i++)
		 {
		    
		    offset = i * this.stitchWidth;
		    for (vertIndex = 0; vertIndex < this.vertices.length; vertIndex+=3)
		    {
		        var destIndex = i * this.vertices.length + vertIndex;
		        
		        // x
		        if(!isBack)
		        {
		           verts[destIndex] = scaleFactorX * (this.vertices[vertIndex] + offset);
		        }
		        else
		        {
		           verts[destIndex] = scaleFactorX * (rowLength - (this.vertices[vertIndex] + offset + this.stitchWidth));
		        }   
	            colors[destIndex] = this.colors[vertIndex];
	            
	            // y
	            verts[destIndex + 1] = scaleFactorY * (this.vertices[vertIndex + 1] + yOffset);
	            colors[destIndex + 1] = this.colors[vertIndex + 1];
	            
	            // z
	            verts[destIndex + 2] = this.vertices[vertIndex + 2];
	            colors[destIndex + 2] = this.colors[vertIndex + 2];
		    }
		 } 
		 
		 return [verts, colors];

	},
	
	/**
	*  Creates and returns the geometry for a mesh of stitches with the given number
	*  of rows and stitches per row.
	*  @param rowLength The number of stitches per row
	*  @param rows The number of rows
	*/
	createStitchMesh : function(rowLength, rows)
	{
		 var geometry = new THREE.BufferGeometry();
		 
		 
		 var verts = new Float32Array(this.vertices.length * rowLength * rows);
		 var colors = new Float32Array(this.colors.length * rowLength * rows);
		 
		 for(var row = 0; row < rows; row++)
		 {
		    var yOffset = row * 0.8;
		    
		    var isBack = false;
		    //var xOffset = 0.25;
		    if(row %2)
		    {
		       // xOffset = -xOffset;
		        isBack = true;		        
		    } 
		    vertsAndCols = this.createStitchRowVertices(rowLength, yOffset, isBack);
		    
		    rowVerts = vertsAndCols[0];
		    rowCols = vertsAndCols[1];
		    
		    vertexOffset = row * rowLength * this.vertices.length;		    
		    
		    verts.set(rowVerts, vertexOffset);
		    colors.set(rowCols, vertexOffset);

		 }	
		 geometry.addAttribute('position', new THREE.BufferAttribute(verts, 3));
		 geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));

 
		// geometry.computeBoundingSphere();
		 var mesh = new THREE.Line( geometry, this.material );
  
		 return mesh;
	}
	
	
}