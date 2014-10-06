/* Notes:
 * - History management is currently done using window.location.hash.  This could easily be changed to use Push State instead.
 * - jQuery dependency for now. This could also be easily removed.
 */

function PageSlider(container) {

    var container = container,
        currentPage,
        stateHistory = [];

    // Use this function if you want PageSlider to automatically determine the sliding direction based on the state history
    this.slidePage = function(page,fromPage) {
        var l = stateHistory.length,
            state = window.location.hash;

        if (l === 0) {
            stateHistory.push(state);
            this.slidePageFrom(page,'',fromPage);
            return;
        }
        if (state === stateHistory[l-2]) {
            stateHistory.pop();
            this.slidePageFrom(page, 'left',fromPage);
        } else {
            stateHistory.push(state);
            this.slidePageFrom(page, 'right',fromPage);
        }

    };

    // Use this function directly if you want to control the sliding direction outside PageSlider
    this.slidePageFrom = function(page, from) {

        container.html(page);

        if (!currentPage || !from) {
            page.attr("class", "center " +fromPage);
            currentPage = page;
            return;
        }

        // Position the page at the starting position of the animation
        page.attr("class",  + from + " " +fromPage);

        currentPage.one('webkitTransitionEnd', function(e) {
            $(e.target).remove();
        });

        // Force reflow. More information here: http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/
        container[0].offsetWidth;

        // Position the new page and the current page at the ending position of their animation with a transition class indicating the duration of the animation
        page.attr("class", "transition center " +fromPage);
        currentPage.attr("class", "transition " + fromPage + " " + (from === "left" ? "right" : "left"));
        currentPage = page;
    };

}