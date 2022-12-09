// Set the canvas size and get a reference to the WebGL context
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");

// Set the viewport
gl.viewport(0, 0, canvas.width, canvas.height);

// Set the color to use for clearing the canvas
gl.clearColor(0, 0, 0, 1);

// Create a vertex shader
const vertexShaderSource = `
  void main() {
    // Set the position of the vertex
    gl_Position = vec4(0, 0, 0, 1);
  }
`;

// Create a fragment shader
const fragmentShaderSource = `
  precision highp float;

  // Set the number of iterations to use when rendering the Mandelbrot set
  const int ITERATIONS = 256;

  void main() {
    // Set the initial values for the complex number c and the point z
    vec2 c = (gl_FragCoord.xy / vec2(1024, 1024)) * 4.0 - 2.0;
    vec2 z = vec2(0, 0);

    // Iterate over the complex number z using the Mandelbrot set equation
    for (int i = 0; i < ITERATIONS; i++) {
      z = vec2(
        z.x * z.x - z.y * z.y + c.x,
        2.0 * z.x * z.y + c.y
      );

      // If the magnitude of the complex number z is greater than 2,
      // then we know that it will tend towards infinity and is not
      // part of the Mandelbrot set
      if (z.x * z.x + z.y * z.y > 4.0) {
        // Calculate the color to use based on the number of iterations
        // and the magnitude of the complex number z
        float color = float(i) / float(ITERATIONS);
        gl_FragColor = vec4(color, color, color, 1);
        return;
      }
    }

    // If we reach this point, then the point is part of the Mandelbrot set
    // and we color it black
    gl_FragColor = vec4(0, 0, 0, 1);
    }
    `;
