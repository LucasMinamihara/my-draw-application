document.addEventListener("DOMContentLoaded", () => {
  // Reset page and remove draw from screen
  document.querySelector(".reset").addEventListener("click", () => {
    document.location.reload();
  });

  // taking eraser
  document.querySelector(".eraser").addEventListener("click", () => {
    context.strokeStyle = "#ffffffff";
    context.lineWidth = 100;
  });

  document.querySelector(".brush").addEventListener("click", () => {
    context.strokeStyle = "black";
    context.lineWidth = 7;
  });

  const brushTool = {
    active: false,
    movement: false,
    pos: { x: 0, y: 0 },
    relativePosition: null,
  };

  const screen = document.getElementById("screen");
  const context = screen.getContext("2d");

  screen.width = 1200;
  screen.height = 600;

  context.lineWidth = 7;
  context.strokeStyle = "black";

  const drawLine = function (line) {
    context.beginPath();
    context.moveTo(line.relativePosition.x, line.relativePosition.y);
    context.lineTo(line.pos.x, line.pos.y);
    context.stroke();
  };
  screen.onmousedown = () => {
    brushTool.active = true;
  };
  screen.onmouseup = () => {
    brushTool.active = false;
  };
  screen.onmousemove = (e) => {
    brushTool.pos.x = e.clientX;
    brushTool.pos.y = e.clientY;
    brushTool.movement = true;
  };

  const cicle = () => {
    if (brushTool.active && brushTool.movement && brushTool.relativePosition) {
      drawLine({
        pos: brushTool.pos,
        relativePosition: brushTool.relativePosition,
      });
      brushTool.movement = false;
    }
    brushTool.relativePosition = { x: brushTool.pos.x, y: brushTool.pos.y };
    setTimeout(cicle, 1);
  };
  cicle();
});
