import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

const descriptions = [
  {
    title: "Efficient Sales Management",
    text: "Transform your business operations with our POS system. Our solution streamlines sales processes, tracks inventory in real-time, and generates insightful reports, all designed to enhance your retail efficiency and customer satisfaction.",
  },
  {
    title: "Seamless Customer Experience",
    text: "Deliver an exceptional shopping experience with our intuitive POS system. From quick checkouts to personalized customer interactions, our platform ensures your customers leave happy, boosting loyalty and repeat business.",
  },
  {
    title: "Integrated Payment Solutions",
    text: "Our POS system supports a variety of payment methods, from cash to contactless payments. With secure transactions and easy reconciliation, you can manage your finances effortlessly and focus on growing your business.",
  },
  {
    title: "Advanced Inventory Control",
    text: "Stay ahead with our POS system’s advanced inventory management. Automatically track stock levels, receive low-stock alerts, and make data-driven decisions to keep your inventory optimized and your shelves stocked.",
  },
  {
    title: "Comprehensive Reporting and Analytics",
    text: "Gain valuable insights into your business performance with our comprehensive reporting and analytics tools. Monitor sales trends, employee performance, and customer preferences to make informed decisions and drive growth.",
  },
  {
    title: "Customizable and Scalable",
    text: "Our POS system grows with your business. Whether you're a small boutique or a large chain, customize the features to meet your specific needs and scale effortlessly as your operations expand.",
  },
  {
    title: "24/7 Support and Training",
    text: "Experience peace of mind with our dedicated support and training. Our team is available 24/7 to assist you with any issues, and our comprehensive training resources ensure your staff is always up to speed.",
  },
  {
    title: "Mobile and Remote Capabilities",
    text: "Run your business from anywhere with our mobile POS solution. Process sales, manage inventory, and access real-time data whether you're on the shop floor, at a pop-up event, or working remotely.",
  },
];

function AnimatedDescriptions() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const duration = 3; // Duration for each animation phase
    const delay = 1; // Delay between animations

    const tl = gsap.timeline({ repeat: -1 }); // Create an infinite timeline

    descriptions.forEach((_, i) => {
      tl.to(descriptionRef.current, {
        duration: duration,
        opacity: 1,
        y: 0,
        ease: "power2.inOut",
        onStart: () => setCurrentIndex(i),
      });
      tl.to(descriptionRef.current, {
        duration: duration,
        opacity: 0,
        y: -20,
        ease: "power2.inOut",
        delay: delay,
      });
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={descriptionRef}
      className="px-4 font-poppins font-semibold py-6 text-blue-950 text-lg md:mx-6 md:p-12"
      style={{
        textShadow:
          "1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
        opacity: 0,
        transform: "translateY(20px)",
      }}
    >
      <h4
        className="mb-6 text-2xl font-semibold text-center"
        style={{
          textShadow:
            "2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff",
        }}
      >
        {descriptions[currentIndex].title}
      </h4>
      <p
        className="text-sm"
        style={{
          textShadow:
            "1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
        }}
      >
        {descriptions[currentIndex].text}
      </p>
    </div>
  );
}

export default AnimatedDescriptions;
