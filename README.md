🕰️ JS Clock

This project implements an analog clock using HTML, CSS, and JavaScript. It features a minimalist user interface that allows toggling between two animation modes for each hand:

    Smooth mode (continuous and fluid)

    Jump mode (discrete steps per second/minute/hour)

🧠 How the Clock Works

The clock uses three .hand elements to represent the second, minute, and hour hands. These are HTML elements dynamically rotated using CSS (transform: rotate(deg)) to reflect the current time.
Angle Calculation:
Seconds:

secondsDegrees = (((seconds + milliseconds / 1000) / 60) * 360) + 90;

    The value ranges from 0 to 360 degrees, plus a 90-degree offset to align "12" at the top.

    Milliseconds are used to achieve a smoother animation (smooth mode).

Minutes and Hours:

    Similar calculation, with added fractions of seconds and minutes:

        Minutes are smoothed by adding the fraction of seconds.

        Hours are smoothed by adding the fraction of minutes and seconds.

🎛️ Toggle Controls

The clock includes a UI that lets you enable or disable the "smooth" mode for each hand individually:

<label><input type="checkbox" id="toggle-seconds" checked> Seconds</label>
<label><input type="checkbox" id="toggle-minutes" checked> Minutes</label>
<label><input type="checkbox" id="toggle-hours" checked> Hours</label>

Toggle Logic:

Each toggle is associated with a specific hand:

    #toggle-seconds controls the second hand.

    #toggle-minutes controls the minute hand.

    #toggle-hours controls the hour hand.

When activated (checked):

    Enables smooth mode:

        Removes the CSS transition (transition: none).

        The hand updates continuously using interpolation via requestAnimationFrame.

When deactivated:

    The hand moves in discrete steps (every second, minute, or hour).

    A CSS transition is applied with a realistic effect:

transition: transform 0.05s cubic-bezier(0.1, 2.7, 0.58, 1);

    If the current value is 0 (e.g., second 0), the transition is temporarily disabled to avoid visual jumps caused by the angle reset (from 450° to 90°).

🔄 Animation with requestAnimationFrame

Instead of using setInterval(setDate, 1000) to update the clock once per second, the project uses requestAnimationFrame(setDate).
What is it?

requestAnimationFrame is a JavaScript API that runs a function right before the browser repaints the screen—ideally 60 times per second.
Advantages:

    Enables smooth animations synced with the browser's refresh rate.

    Ideal for interpolating values like seconds + milliseconds.

    Reduces flickering, jumps, and visual tearing.

Implementation in the Clock:

function setDate() {
  // Calculate seconds, minutes, and hours with precision
  // Update the transform: rotate(...) of each hand
  requestAnimationFrame(setDate); // Call again recursively
}

This creates a continuous, efficient, and non-blocking animation loop.


📚 References

 MDN Web Docs
  https://developer.mozilla.org/es/docs/Web/API/Window/requestAnimationFrame

 W3Schools
  https://www.w3schools.com/jsref/met_win_requestanimationframe.asp

 Chrome Developers Blog
  https://developer.chrome.com/blog/requestanimationframe-api-now-with-sub-millisecond-precision?hl=es-419

 CSS-Tricks     
 https://css-tricks.com/using-requestanimationframe/