module MiniIntruders {

    export class MainMenu extends Phaser.State {

        // the objects involved
        private intro: Phaser.Sprite;
        private logo: Phaser.Sprite;
        private groupBtns: Phaser.Group; // sprite group for animating menu buttons together
        private buttons: Button[];
        private selector: Selector; // selector showing selected menu item

        // some positions we need to use; calculated on the fly
        private get logoHt() { return this.logo && this.logo.height; }
        private get logoDownY() { return this.world.height - this.logoHt; }
        private get logoUpY() { return this.logoHt*2; }
        private get logoBtnSpace() { return this.logoHt*3; } // space between logo and buttons

        // The tweens
        private tw0IntroFadeOut: Phaser.Tween;
        private tw1LogoFadeIn: Phaser.Tween;
        private tw2LogoMoveDown: Phaser.Tween;
        private tw3LogoMoveUp: Phaser.Tween;

        /** Starts the tweens by calling the first one; call chainTweens() first */
        private startTweening = () => this.tw0IntroFadeOut.start();

        /** Method called when tweening is completed. */
        private onTweenComplete: () => void;

        // updates buttons positioning relative to logo
        private updateButtonsY = () => this.groupBtns.y = this.logo.y + this.logoBtnSpace;

        public create() {
            // background
            this.add.sprite(0, 0, 'background01');

            // create our menu elements
            this.createIntro();
            this.createLogo();
            this.createButtons();

            // begin the tweening
            this.chainTweens();
            this.startTweening();

            this.onTweenComplete = () => this.registerInput();
        }

        /** Chains the tweens together */
        private chainTweens() {
            this.tw0IntroFadeOut.chain(
                this.tw1LogoFadeIn,
                this.tw2LogoMoveDown,
                this.tw3LogoMoveUp);
            // move buttons with logo
            this.tw3LogoMoveUp.onUpdateCallback(this.updateButtonsY);
            // tween oncomplete callback
            this.tw3LogoMoveUp.onComplete.add(() => this.onTweenComplete());
        }

        /** Create buttons group; they move up with logo, then move back down a bit */
        private createButtons() {
            var y = 0; // y position to keep track of where next button goes
            var spacing = 2.0; // space between buttons (modifier to height)
            var btns = ["play", "help", "credits", "exit"];
            this.groupBtns = this.add.group();
            this.buttons = [];

            // set initial position
            this.groupBtns.y = this.logoDownY + this.logoBtnSpace;

            // add each button; anchor at top center, and increment y to account for spacing.
            btns.forEach((name) => {
                var btn: Button = new Button(name, this.buttons.length);

                // sprite and pos
                var btnSprite = btn.createSprite(y, this.game);
                this.groupBtns.add(btnSprite);
                y += btnSprite.height*spacing;

                // save the button and register its events.
                this.buttons.push(btn);
                btn.registerEvents(() => this[name+"Clicked"]());
            });

            // we'll just stick this here instead of making a new method for it :D
            this.selector = new Selector(this.buttons, this.game);
        }

        /** Intro starts at center, fades out */
        private createIntro() {
            this.intro = this.add.sprite(this.world.centerX, this.world.centerY, 'menu_intro');
            this.intro.anchor.setTo(0.5, 0.5);
            this.tw0IntroFadeOut = this.add.tween(this.intro).to({alpha: 0});
        }

        /** Logo starts at center, fades in, moves down then moves up */
        private createLogo() {
            this.logo = this.add.sprite(this.world.centerX, this.world.centerY, 'menu_logo');
            this.logo.anchor.setTo(0.5, 0.5);
            this.logo.alpha = 0; // pre-fade in alpha value

            this.tw1LogoFadeIn = this.add.tween(this.logo).to({alpha: 1});
            this.tw2LogoMoveDown = this.add.tween(this.logo).to({y: this.logoDownY});
            this.tw3LogoMoveUp = this.add.tween(this.logo).to({y: this.logoUpY}, 2000);
        }

        /** Registers all menu input; this shouldn't happen until the tweens are done. */
        private registerInput() {
            // button events (button handles mouse move and clicks)
            this.buttons.forEach(btn => {
                btn.enableInput();
                // when button is selected w/ mouse, move selector to it
                btn.selectedCallback = idx => {
                    this.selector.moveTo(idx);
                    this.updateSelected(idx);
                };
            });

            // keyboard control
            var upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
            upKey.onUp.add(() => this.upPressed());
            var downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            downKey.onUp.add(() => this.downPressed());
            var enterKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            enterKey.onUp.add(() => this.enterPressed());
        }


        private creditsClicked()  {
            console.log("Me, myself and root");
        }
        private exitClicked() {
            close();
        }
        private helpClicked() {
            console.log("Help yourself!");
        }
        private playClicked() {
            console.log("Play clicked!");
        }


        private upPressed() {
            var idx = this.selector.moveUp();
            this.updateSelected(idx);
        }
        private downPressed() {
            var idx = this.selector.moveDown();
            this.updateSelected(idx);
        }
        private enterPressed() {
            var idx = this.selector.getIndex();
            // call appropriate Clicked method:
            this[this.buttons[idx].name+"Clicked"]();
        }

        private updateSelected(idx: number) {
            this.clearSelection();
            this.buttons[idx].selected();
        }

        private clearSelection() {
            this.buttons.forEach(btn => {
                btn.unselected();
            });
        }

    }

    class Button {

        public name: string;
        public sprite: Phaser.Sprite;

        /** A method to be called when button is selected by mouse; index is passed */
        public selectedCallback: (number) => void;

        private img: string;
        private imgActive: string;
        private index: number;

        /**
         * Creates a Button, including initializing it's sprite.  Events are not
         * registered until `Button.registerEvents()` is called.  Assumes sprite
         * is represented by two frames in a texture atlas with the key 'menu'.
         * `img` and `imgActive` are the keys for those two frames.
         *
         * @param name {string} Name of this Button
         * @param y {number} Y position to set to Sprite
         * @param game {Phaser.Game} Game object
         * @param img {string} frame key of sprite when not active.  `name + "1.png"` if not specified
         * @param imgActive {string} frame key of sprite when active.  `name + "2.png"` if not specified
         */
        constructor(name: string, index: number, img?: string, imgActive?: string) {
            this.name = name;
            this.index = index;
            this.img = img ? img : name + "1.png";
            this.imgActive = imgActive ? imgActive : name + "2.png";
        }

        /**
         * Creates this button's sprite given a y position and game object
         *
         * @param y The y position of this button, relative to its parent
         * @param game The Phaser.Game object
         * @return The sprite
         */
        public createSprite(y: number, game: Phaser.Game): Phaser.Sprite {
            var sp = game.add.sprite(game.world.centerX, y, 'menu');
            sp.anchor.setTo(0.5, 0);
            sp.frameName = this.img;
            this.sprite = sp;
            return sp;
        }

        /**
         * Registers the hover events to change the Button's style, and a click handler.
         *
         * @param onClick Click handler for this button
         */
        public registerEvents(onClick: () => void): void {
            this.sprite.events.onInputUp.add(onClick);
            this.sprite.events.onInputOver.add(() => this.mouseSelected());
        }

        /** Enables input on this button */
        public enableInput(): void {
            this.sprite.inputEnabled = true;
        }

        /** Selects this button */
        public selected() {
            this.sprite.frameName = this.imgActive;
        }

        /** Unselects this button */
        public unselected() {
            this.sprite.frameName = this.img;
        }

        /** Selects this button and calls callback (to be used with hover) */
        private mouseSelected() {
            this.selected();
            this.selectedCallback(this.index);
        }

    }

    class Selector {
        private index: number;
        private buttons: Button[];
        private sprite: Phaser.Sprite;

        constructor(buttons: Button[], game: Phaser.Game) {
            this.index = -1;
            this.buttons = buttons;
            this.sprite = game.add.sprite(-1000, -1000, 'sprites', 'fighter1.png');
        }

        /**
         * Returns the index of the button currently selected.  If < 0, this
         * selector is invalid; It can be made valid w/ moveUp() and moveDown()
         * calls
         */
        public getIndex() {
            return this.index;
        }

        /** Moves the selector up; returns new index */
        public moveUp(): number {
            // may have been in an uninitialized state
            if (this.index < 0) {
                this.init();
            }
            else if (this.index > 0) {
                this.index--;
                this.recalcCoords();
            }
            return this.index;
        }

        /** Moves the selector down; returns new index */
        public moveDown(): number {
            // may have been uninitialized
            if (this.index < 0) {
                this.init();
            }
            else if (this.index < this.buttons.length-1) {
                this.index++;
                this.recalcCoords();
            }
            return this.index
        }

        public moveTo(idx: number) {
            this.init(idx);
        }

        /** Returns the sprite associated with the specified button */
        private getBtnSprite(idx: number) {
            return this.buttons[idx].sprite;
        }

        /** Returns the x coordinate required to display selector next to specified button */
        private getXFromButton(idx: number) {
            var spr = this.getBtnSprite(idx);
            var sprWid = this.sprite.width;
            var spaceAdjust = sprWid;
            return spr.left + spr.parent.x - sprWid - spaceAdjust;
        }

        /** Returns the y coordinate required to display selector next to specified button */
        private getYFromButton(idx: number) {
            var spr = this.getBtnSprite(idx);
            return spr.top + spr.parent.y;
        }

        /** Initializes this selector to button 0 */
        private init(idx?: number) {
            if (idx == null) idx = 0;
            this.index = idx;
            this.recalcCoords();
            this.sprite.alpha = 1;
        }

        /**
         * Recalculates the x and y coordinates and repositions the selector sprite.
         * Use after moving or initializing the selector
         */
        private recalcCoords() {
            this.sprite.x = this.getXFromButton(this.index);
            this.sprite.y = this.getYFromButton(this.index);
        }
    }

}
