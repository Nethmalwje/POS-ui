import React from "react";
import { motion } from "framer-motion";

function AnimatedGraph({ role }) {
  const containerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "800px", // Adjust the height as necessary
  };

  const imageStyles = {
    width: role === "Cashier" ? "600px" : "700px", // Control the size of the image
    maxWidth: "100%", // Ensures the image is responsive
    opacity: role === "Cashier" ? 1 : 1,
  };

  return (
    <div style={containerStyles}>
      {/* Rotating Graph Image Horizontally */}
      <motion.img
        src={role !== "Cashier" ? "/graph.png" : "/cashier.gif"} // Ensure this is the correct path to your image
        alt="Rotating Graph"
        style={imageStyles}
        //initial={{ rotateY: 0 }} // Initial state of the rotation around Y-axis
        // animate={{ rotateY: 360 }} // Rotate around Y-axis to 360 degrees
        transition={{
          duration: 60, // Duration for a complete rotation
          ease: "linear", // Linear animation for smooth continuous rotation
          repeat: Infinity, // Repeat the animation forever
          repeatType: "loop", // Ensure the animation loops smoothly
        }}
      />
    </div>
  );
}

export default AnimatedGraph;
