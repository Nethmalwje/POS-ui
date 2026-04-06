import React from "react";
import { motion } from "framer-motion";

function PosAnimation() {
  return (
    <div
      className="pos-container w-full h-auto flex justify-center items-center relative"
      style={{ height: "700px" }} // Increase height for larger animations
    >
      {/* Grouping POS Machine, Phone, and Card */}
      <motion.div
        className="pos-group"
        style={{
          position: "relative",
          width: "600px", // Increase width of the group for larger elements
          height: "auto",
        }}
      >
        {/* POS Machine */}
        <motion.img
          src="/pos-photo.png"
          alt="POS Machine"
          style={{
            width: "600px", // Set a larger width for the POS machine
            zIndex: 1,
          }}
          animate={{
            y: [0, -5, 0], // Floating effect
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />

        {/* Mobile Phone */}
        <motion.img
          src="/mobile-photo.png"
          alt="Mobile Phone"
          style={{
            position: "absolute",
            top: "100px", // Adjust position within the group
            left: "100px",

            width: "80%", // Larger mobile phone size

            zIndex: 2,
          }}
          animate={{
            y: [0, -10, 0], // Floating effect
          }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />

        {/* ATM Card */}
        <motion.img
          src="/card-photo.png"
          alt="ATM Card"
          style={{
            position: "absolute",
            top: "10px", // Adjust position within the group
            left: "40px",
            width: "90%", // Larger ATM card size
            zIndex: 3,
          }}
          animate={{
            y: [0, -15, 0], // Floating effect
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      </motion.div>
    </div>
  );
}

export default PosAnimation;
