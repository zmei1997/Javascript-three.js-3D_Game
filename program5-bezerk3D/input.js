function Input() {
    self = this;

    self.isLeftPressed = false;
    self.isRightPressed = false;
    self.isUpPressed = false;
    self.isDownPressed = false;
    self.isSpacePressed = false;

    function handleKeyEvent(e, isKeyDown) {
        if (e.keyCode == 37) {
            self.isLeftPressed = isKeyDown;
        }

        if (e.keyCode == 39) {
            self.isRightPressed = isKeyDown;
        }

        if (e.keyCode == 38) {
            self.isUpPressed = isKeyDown;
        }

        if (e.keyCode == 40) {
            self.isDownPressed = isKeyDown;
        }

        if (e.keyCode == 32) {
            self.isSpacePressed = isKeyDown;
        }
    }

    document.addEventListener("keydown", function(e) {handleKeyEvent(e, true)});
    document.addEventListener("keyup", function(e) {handleKeyEvent(e, false)});
}
