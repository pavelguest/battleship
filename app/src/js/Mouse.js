class Mouse {
  element = null;
  under = false; // позиция курсора мыши
  prevUnder = false;
  x = null; // текущие координаты
  y = null;
  prevX = null; // преддущие координаты
  prevY = null;
  curLeftBtn = false; // нажата ли кнопка мыши?
  prevLeftBtn = false;
  delta = 0; // прокрутка колёсика мыши
  prevDelta = 0;
  touchStart = null;
  prevTouchStart = null;
  touchMove = null;
  prevTouchMove = null;

  constructor(element) {
    this.element = element;

    const stateUpdate = (e) => {
      this.x = e.clientX;
      this.y = e.clientY;
      this.delta = 0;
      this.under = true;
    };

    element.addEventListener("pointermove", (e) => {
      this.tick();
      this.touchMove = true;
      stateUpdate(e);
    });
    element.addEventListener("pointerenter", (e) => {
      this.tick();

      stateUpdate(e);
    });
    element.addEventListener("pointerleave", (e) => {
      this.tick();

      stateUpdate(e);
      this.under = false;
    });
    element.addEventListener("pointerdown", (e) => {
      this.tick();
      this.touchStart = true;

      stateUpdate(e);

      if (e.button === 0) {
        this.curLeftBtn = true;
      }
    });
    element.addEventListener("pointerup", (e) => {
      this.tick();
      this.touchMove = false;
      this.touchStart = false;

      stateUpdate(e);

      if (e.button === 0) {
        this.curLeftBtn = false;
      }
    });
    element.addEventListener("wheel", (e) => {
      this.tick();

      this.x = e.clientX;
      this.y = e.clientY;
      this.delta = e.deltaY > 0 ? 1 : -1;
      this.under = true;
    });
  }

  tick() {
    this.prevX = this.x;
    this.prevY = this.y;
    this.prevUnder = this.under;
    this.prevLeftBtn = this.curLeftBtn;
    this.prevDelta = this.delta;
    this.prevTouchStart = this.touchStart;
    this.prevTouchMove = this.touchMove;
    this.delta = 0;
  }
}

export default Mouse;
