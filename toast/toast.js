(function (window) {
    
        /**
         * Toast - Toast Controller Class
         * @param {Node} containerEle - DOM Container element
         */
        function ToastContainer() {
            // TODO : Gravity (add to comments the options and impliment)
            // TODO : Remove styles from css if possible
            // Append Toast container to page
            var containerTopEle = document.createElement("div");
            containerTopEle.id = "toast-container-top";
            document.body.appendChild(containerTopEle);
    
            var containerBottomEle = document.createElement("div");
            containerBottomEle.id = "toast-container-bottom";
            document.body.appendChild(containerBottomEle);
    
            // Set defaults
            this.topToastContainerEle = containerTopEle;
            this.bottomToastContainerEle = containerBottomEle;
            this.message = "Something went wrong, Try Again";
            this.timeout = 5000;
            this.logging = false;
            this.gravity = 'top';
            this.dismiss = true;
        }
        /**
         * Show Toast
         * @param {String} msg Toast Message
         * @param {Object} [options] Individual Toast options to override the defaults
         * @param {String} [options.message] - Toast default message
         * @param {Number} [options.timeout] - Toast default timeout
         * @param {Boolean} [options.logging] - Toast default logging option
         * @param {String} [options.gravity] - Toast default gravity
         * @param {Function} [callback]
         */
        ToastContainer.prototype.toast = function (msg, options, callback) {
            var self = this;
    
            // Options
            var opt = options || {}
            var m = msg || this.message;
            var t = opt.timeout || this.timeout;
            var g = opt.gravity || this.gravity;
            var d = opt.dismiss || this.dismiss;
            var log = opt.logging || this.logging;
            var keystroke;
    
            // Create HTML
            var containerEle = self.containerEle = (g === "top") ? this.topToastContainerEle : this.bottomToastContainerEle;
            var toastEle = self.toastEle = document.createElement("div");
            toastEle.classList.add("simple-toast");
            toastEle.innerHTML = m;
            toastEle.classList.add(g);
            containerEle.appendChild(toastEle);
    
            // Slide in toast
            setTimeout(function () {
                toastEle.classList.add("show");
            }, 500);
    
            // Slide out toast
            setTimeout(function () {
                toastEle.classList.remove("show");
            }, t + 500);
    
            // Remove from DOM
            self.removeTimeout = setTimeout(function () {
                containerEle.removeChild(toastEle);
                document.removeEventListener("keydown", keystroke);
            }, t + 700);
    
            // Log Error
            if (log) {
                console.log(m);
            }
    
            // Dismiss toast
            if (d) {
                keystroke = function (e) {
                    var hasValidKey = ["Escape"].filter(function (key) {
                        return key == e.code;
                    }).length
    
                    if (hasValidKey) {
                        self.removeToast(keystroke);
                    }
                }
    
                document.addEventListener("keydown", keystroke);
    
                toastEle.addEventListener("click", function () {
                    self.removeToast(keystroke);
                })
            }
    
            if (callback) {
                return callback(null, m);
            }
        }
    
        /**
         * remove toast when dismissed
         * @param {Function} keystroke event handler function to remove for keydown
         */
        ToastContainer.prototype.removeToast = function (keystroke) {
            var self = this;
            clearTimeout(self.removeTimeout);
            self.toastEle.classList.remove("show");
            setTimeout(function () {
                self.containerEle.removeChild(self.toastEle);
                document.removeEventListener("keydown", keystroke)
            }, 200);
        }
    
        /**
         * Initialize the Library
         * define globally if it doesn't already exist
         */
        if (typeof (toast) === 'undefined') {
            document.addEventListener("DOMContentLoaded", function() { 
                var toastCtlr = new ToastContainer();
                window.toast = toastCtlr.toast.bind(toastCtlr);
            });
        }
        else {
            console.log("Toast Library already defined.");
        }
    })(window)  