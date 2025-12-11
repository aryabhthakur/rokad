'use client'

import { cn } from "@/lib/utils";
import { FunctionComponent, useEffect, useState } from "react";
import Link from "next/link";
import { Progress } from "../ui/progress";
import { ChevronLeft, ChevronRight, MoveRight, Pause, Play } from "lucide-react";

interface HeroProps {
    className?: string
}

const Hero: FunctionComponent<HeroProps> = ({ className }) => {
    const CHANGE_SLIDE_IN_MS = 8000;
    const slides = [
        // ... slides array remains the same
        {
            title: "Technology Report: AI becomes more than utility",
            badge: "Technology Report",
            image: "/tech-bg.jpg",
            link: ""
        }, {
            title: "Roadmap for Tech Integration into Traditional Business",
            badge: "Opinion Piece",
            image: "/tech-trad.jpg",
            link: ""
        }, {
            title: "Money Report: Types of Payments in Modern Day Context",
            badge: "Money Report",
            image: "/mon-rep.jpg",
            link: ""
        }, {
            title: "Industry Report: India's Ship Building Future",
            badge: "Industry Report",
            image: "/ship.jpg",
            link: ""
        }
    ];

    const [activeSlide, setActiveSlide] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false)

    // Function for Manual Navigation (e.g., clicking a dot/button)
    const changeSlide = (index: number) => {
        const nextIndex = index % slides.length;

        // 1. Update the active slide state
        setActiveSlide(nextIndex);

        // 2. ONLY RESET PROGRESS HERE, when the slide actually changes.
        setProgress(0);
    }

    // 1. useEffect for Autoplay (Slide Change)
    // This effect runs whenever 'isPaused' or 'activeSlide' changes.
    useEffect(() => {
        // Stop the timer if paused
        if (isPaused) {
            return;
        }

        const slideChangeTimer = setInterval(() => {
            // When the timer fires, call changeSlide to handle index update and progress reset.
            changeSlide(activeSlide + 1);
        }, CHANGE_SLIDE_IN_MS);

        // Cleanup: Clear the timer when the component unmounts or 'isPaused' or 'activeSlide' changes.
        return () => clearInterval(slideChangeTimer);

    }, [isPaused, activeSlide]); // activeSlide is needed to calculate the next slide index correctly


    // 2. useEffect for Progress Bar
    // This effect runs only when 'isPaused' changes. It is now responsible for starting/stopping the timer
    // based on the pause state, allowing 'progress' to maintain its value when stopped.
    useEffect(() => {

        // If the slider is paused, simply stop here. The existing timer is cleared by cleanup.
        if (isPaused) {
            return;
        }

        // Start a new timer only when not paused.
        const progressIncrement = 100 / (CHANGE_SLIDE_IN_MS / 100);
        const progressTimer = setInterval(() => {
            // Progress continues from its current state (resuming).
            setProgress(prev => (prev >= 100 ? 100 : prev + progressIncrement));
        }, 100);

        // The cleanup function clears the timer whenever 'isPaused' changes.
        return () => clearInterval(progressTimer);

    }, [isPaused]); // **KEY FIX: Only depend on isPaused**

    // 3. A separate useEffect to RESET progress when the slide changes
    // The logic for resetting progress is now separated from the pause/resume logic.
    useEffect(() => {
        // When activeSlide changes (either manually or by autoplay), progress must reset.
        setProgress(0);
        // Since this runs after slide change, the progress bar's timer (if not paused) will immediately
        // be running and will start incrementing from this new 0 value.
    }, [activeSlide]);


    return (<>
        <div className={cn("h-screen overflow-hidden relative bg-black", className)}>
            {
                slides.map((item, i) => <img key={i} src={item.image} data-active={activeSlide === i} className="absolute invisible opacity-0 duration-300 data-[active=true]:opacity-100 data-[active=true]:visible duration-300 z-0 h-full w-full animate-[custom-scale-animation_25s_ease-in-out_infinite]" />)
            }
            <div className="h-screen relative z-10 flex flex-col bg-radial from-0% from-black/10 to-black to-95%" >
                <div className="max-w-6xl w-full mt-auto mx-auto text-white relative z-10">
                    <h4 className="font-medium mb-4">{slides[activeSlide].badge}</h4>
                    <h2 className="text-6xl max-w-3xl font-medium leading-18 mb-8">{slides[activeSlide].title}</h2>
                    <Link href={slides[activeSlide].link} className="font-medium flex group items-center hover:text-purple-300">
                        Read more <MoveRight className="group-hover:translate-x-1 duration-200 ml-3" />
                    </Link>
                </div>
                <div className="max-w-6xl w-full mb-10 mx-auto mt-auto">
                    <div className="flex gap-1">
                        <button onClick={() => changeSlide(Math.round(activeSlide - 1))} className="p-1 rounded bg-white/20">
                            <ChevronLeft size={18} className="text-white" />
                        </button>
                        <button onClick={() => setIsPaused(!isPaused)} className="p-1 rounded bg-white/20">
                            {isPaused ? <Play size={18} className="text-white" /> : <Pause size={18} className="text-white" />}
                        </button>
                        <button onClick={() => changeSlide(Math.round(activeSlide + 1))} className="p-1 rounded bg-white/20">
                            <ChevronRight size={18} className="text-white" />
                        </button>
                    </div>
                    <div className="grid grid-cols-4 text-sm font-medium text-white *:p-5">
                        {
                            slides.map((item, i) => <div key={i} onClick={() => changeSlide(i)} className="first:pl-0 last:pr-0">
                                <div className="mb-4">
                                    <Progress value={progress} className={`h-1 ${activeSlide === i ? 'visible opacity-100' : 'invisible opacity-0'} duration-300 bg-transparent`} />
                                </div>
                                <h4 className="hover:text-orange-300 cursor-pointer">{item.title}</h4>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Hero;