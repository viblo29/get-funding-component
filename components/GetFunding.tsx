"use client"
import React, { useEffect } from "react"
import grid from "../public/Grid.svg"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"

const boxWidth = 99
const boxHeight = 89

function GetFunding() {
  const controls = useAnimation()
  const lineControlsRight = useAnimation()
  const lineControlsLeft = useAnimation()
  const lineControlsTop = useAnimation()
  const lineControlsBottom = useAnimation()

  const wait = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms))

  useEffect(() => {
    const sequence = async () => {
      while (true) {
        await wait(800)

        // Move left + horizontal lines
        controls.start({
          x: -boxWidth,
          y: -boxHeight,
          transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] },
        })
        await Promise.all([
          lineControlsRight.start({ width: "290px", transition: { duration: 0.8, ease: "linear" } }),
          lineControlsLeft.start({ width: "89px", transition: { duration: 0.8, ease: "linear" } }),
          lineControlsTop.start({ height: "80px", transition: { duration: 0.8, ease: "linear" } }),
          lineControlsBottom.start({ height: "253px", transition: { duration: 0.8, ease: "linear" } }),
        ])

        await wait(800)

        // Move down + vertical lines
        controls.start({
          x: -boxWidth,
          y: 0,
          transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] },
        })
        await Promise.all([
          lineControlsTop.start({ height: "167px", transition: { duration: 0.8, ease: "linear" } }),
          lineControlsBottom.start({ height: "167px", transition: { duration: 0.8, ease: "linear" } }),
        ])

        await wait(800)

        // Move right + horizontal lines opposite
        controls.start({
          x: boxWidth,
          y: 0,
          transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] },
        })
        await Promise.all([
          lineControlsRight.start({ width: "89px", transition: { duration: 0.8, ease: "linear" } }),
          lineControlsLeft.start({ width: "290px", transition: { duration: 0.8, ease: "linear" } }),
        ])

        await wait(800)

        // Move up + vertical lines reset
        controls.start({
          x: boxWidth,
          y: -boxHeight,
          transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] },
        })
        await Promise.all([
          lineControlsTop.start({ height: "80px", transition: { duration: 0.8, ease: "linear" } }),
          lineControlsBottom.start({ height: "253px", transition: { duration: 0.8, ease: "linear" } }),
        ])
      }
    }

    sequence()
  }, [controls, lineControlsRight, lineControlsLeft, lineControlsTop, lineControlsBottom])

  const lineColor = "#F94302"

  return (
    <div className="w-screen h-screen flex justify-center items-center relative overflow-hidden bg-black">
      <Image src={grid} alt="grid" className="absolute" />

      <motion.div 
        initial={{ x: boxWidth, y: -boxHeight }} 
        animate={controls} 
        className="absolute flex items-center justify-center"
      >
        {/* RECTANGLE */}
        <div className="w-5 h-5 bg-[#FF4E02] z-10 shadow-[0_0_100px_#F94302,0_0_50px_#F96D02,0_0_25px_rgba(249,150,2,0.5)]" />

        {/* RIGHT LINE */}
        <motion.div
          initial={{ width: "90px" }}
          animate={lineControlsRight}
          style={{ 
            originX: 0,
            backgroundColor: lineColor,
            WebkitMaskImage: 'linear-gradient(to right, black 20%, transparent 100%)',
            maskImage: 'linear-gradient(to right, black 20%, transparent 100%)',
          }} 
          className="absolute left-1/2 ml-2.5 h-[1.5px]"
        />

        {/* LEFT LINE */}
        <motion.div
          initial={{ width: "290px" }}
          animate={lineControlsLeft}
          style={{ 
            originX: 1,
            backgroundColor: lineColor,
            WebkitMaskImage: 'linear-gradient(to left, black 20%, transparent 100%)',
            maskImage: 'linear-gradient(to left, black 20%, transparent 100%)',
          }} 
          className="absolute right-1/2 mr-2.5 h-[1.5px]"
        />

        {/* TOP LINE */}
        <motion.div
          initial={{ height: "80px" }}
          animate={lineControlsTop}
          style={{ 
            originY: 1,
            backgroundColor: lineColor,
            WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 100%)',
            maskImage: 'linear-gradient(to top, black 20%, transparent 100%)',
          }} 
          className="absolute bottom-1/2 mb-2.5 w-[1.5px]"
        />

        {/* BOTTOM LINE */}
        <motion.div
          initial={{ height: "253px" }}
          animate={lineControlsBottom}
          style={{ 
            originY: 0,
            backgroundColor: lineColor,
            WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
          }} 
          className="absolute top-1/2 mt-2.5 w-[1.5px]"
        />
      </motion.div>
    </div>
  )
}

export default GetFunding