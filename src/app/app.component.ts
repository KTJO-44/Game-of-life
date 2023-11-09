import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'game-of-life';
  grid: Cell[] = [];
  @ViewChild('board', { static: true }) canvas!: ElementRef; 
  private ctx!: CanvasRenderingContext2D; 
  ngAfterViewInit() { 
    this.ctx = this.canvas.nativeElement.getContext('2d'); 
    this.ctx.fillStyle = "rgba(219,219,219,1)";
    const canvas = this.canvas.nativeElement; 
    const cellSize = 20; 
    const rows = canvas.height / cellSize; 
    const cols = canvas.width / cellSize; 
    this.initialiseGrid(rows, cols);
    this.drawGrid(cellSize); 
  } 

  initialiseGrid(rows:number, cols:number) {
    
    for (let i = 0; i < rows; i++) { 
      for (let j = 0; j < cols; j++) { 
        this.grid.push({x: i, y: j, isAlive: Math.random() < 0.5})
      } 
    } 
  }

  drawGrid(cellSize: number) { 
    this.grid.forEach(cell => {      
      this.ctx.strokeRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);

      if (cell.isAlive == true) {
        this.ctx.fillStyle = "rgba(255,0,0,1)";
      }
      else {
        this.ctx.fillStyle = "rgba(219,219,219,1)";
      };
      this.ctx.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
      }
    );
  }
}

class Cell {

  x!: number;
  y!: number;
  isAlive!: boolean;

}