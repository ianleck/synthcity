export { PlayerController };

class PlayerController {

	constructor() {

		this.enabled = false;

		this.mouse_move_x = 0;
		this.mouse_move_y = 0;
    this.mouse_scroll = 0;

		this.key_right = false;
		this.key_down = false;
		this.key_left = false;
		this.key_up = false;

		this.key_shift = false;

		this.key_f = false;
    this.key_r = false;
		this.key_pressed_f = false;
		this.key_pressed_r = false;
    this.key_pressed_space = false;
		this.key_pressed_1 = false;
		this.key_pressed_2 = false;
		this.key_pressed_3 = false;

		this.mb_right = false;
		this.mb_middle = false;
		this.mb_left = false;

		this.mb_left_released = false;

		var self = this;

		document.addEventListener("mousemove", function(event) { self.on_mouse_move(event) }, false);
		document.addEventListener("mousedown", function(event) { self.on_mouse_down(event) }, false);
		document.addEventListener("mouseup", function(event) { self.on_mouse_up(event) }, false);
		document.addEventListener("keydown", function(event) { self.on_key_down(event) }, false);
		document.addEventListener("keyup", function(event) { self.on_key_up(event) }, false);
    document.addEventListener("mousewheel", function(event) { self.on_mouse_wheel(event) }, false);

	}

	update() {
		this.mouse_move_x = 0;
		this.mouse_move_y = 0;
		this.key_pressed_f = false;
		this.key_pressed_r = false;
    this.key_pressed_space = false;
		this.key_pressed_1 = false;
		this.key_pressed_2 = false;
		this.key_pressed_3 = false;
		this.mb_left_released = false;
	}

  on_mouse_wheel(event) {
    this.mouse_scroll = event.deltaY;
  }
  get_mouse_wheel() {
    let v = this.mouse_scroll;
    this.mouse_scroll = 0;
    return v;
  }

	on_mouse_move(event) {
		if (this.enabled) {
			this.mouse_move_x = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
			this.mouse_move_y = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
		}
	}

	on_key_down(event) {
		if (this.enabled) {
		  switch (event.keyCode) {
				case 49: //1
		      this.key_pressed_1 = true;
		      break;
				case 50: //2
		      this.key_pressed_2 = true;
		      break;
				case 51: //3
		      this.key_pressed_3 = true;
		      break;
		    case 68: //d
		      this.key_right = true;
		      break;
		    case 83: //s
		      this.key_down = true;
		      break;
		    case 65: //a
		      this.key_left = true;
		      break;
		    case 87: //w
		      this.key_up = true;
		      break;
				case 16: //shift
		      this.key_shift = true;
		      break;
        case 32: //space
		      this.key_pressed_space = true;
		      break;
		    case 70: //f
		      this.key_f = true;
		      this.key_pressed_f = true;
		      break;
				case 82: //r
          this.key_r = true;
		      this.key_pressed_r = true;
		      break;
		  }
		}
	}

	on_key_up(event) {
		if (this.enabled) {
		  switch (event.keyCode) {
		    case 68: //d
		      this.key_right = false;
		      break;
		    case 83: //s
		      this.key_down = false;
		      break;
		    case 65: //a
		      this.key_left = false;
		      break;
		    case 87: //w
		      this.key_up = false;
		      break;
				case 16: //shift
		      this.key_shift = false;
		      break;
        case 70: //f
		      this.key_f = false;
		      break;
		    case 82: //r
		      this.key_r = false;
		      break;
		  }
		}
	}

	on_mouse_down(event) {
		if (this.enabled) {
			switch (event.which) {
			  case 1:
			    this.mb_left = true;
			    break;
			  case 2:
			    this.mb_middle = true;
			    break;
			  case 3:
			    this.mb_right = true;
			    break;
			}
		}
	}

	on_mouse_up(event) {
		if (this.enabled) {
			switch (event.which) {
			  case 1:
			    this.mb_left = false;
					this.mb_left_released = true;
			    break;
			  case 2:
			    this.mb_middle = false;
			    break;
			  case 3:
			    this.mb_right = false;
			    break;
			}
		}
	}

}