"use client";

import { cn } from "@/lib/utils";
import { FunctionComponent, useState } from "react";
import {
    Stepper,
    StepperDescription,
    StepperIndicator,
    StepperItem,
    StepperSeparator,
    StepperTitle,
    StepperTrigger,
} from "@/components/ui/stepper"
import { Button } from "../ui/button";
import Markdown from 'react-markdown'

interface RIRProps {
    className?: string
    counter: {
        step: number
        title: string
        subtitle: string
        description: string
        deliverables: string[]
    }[]
    CounterSectionTitle: string
    CounterSectionSubTitle: string
    CounterSectionDesc?: string
}

const RIR: FunctionComponent<RIRProps> = ({ className, counter, CounterSectionSubTitle, CounterSectionTitle, CounterSectionDesc }) => {
    const [currentStep, setCurrentStep] = useState(1)
    return (<>
        <section className={cn("px-8", className)}>
            <div className="bg-white rounded-3xl py-40">
                <div className="max-w-5xl mx-auto mb-10">
                    <span className="border-2 flex items-center w-fit rounded-full font-medium py-1 px-3">
                        The Model
                    </span>
                    <h2 className="text-8xl mt-4 font-semibold">{CounterSectionTitle}</h2>
                    <div className="grid mt-20 grid-cols-2 gap-5">
                        <div>
                            <h3 className="opacity-75 text-2xl">{CounterSectionSubTitle}</h3>
                        </div>
                        <div>
                            {CounterSectionDesc && <div className="opacity-75 max-w-lg">
                                <Markdown>
                                    {CounterSectionDesc}
                                </Markdown>
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="max-w-5xl grid grid-cols-2 gap-2 mt-20 mx-auto">
                    <Stepper value={currentStep}
                        onValueChange={setCurrentStep}
                        orientation="vertical">
                        {counter?.map(({ step, title, subtitle }) => (
                            <StepperItem
                                key={step}
                                step={step}
                                className="relative items-start not-last:flex-1"
                            >
                                <StepperTrigger className="items-start rounded pb-12 last:pb-0">
                                    <StepperIndicator />
                                    <div className="mt-0.5 space-y-0.5 px-2 text-left">
                                        <StepperTitle>{title}</StepperTitle>
                                        <StepperDescription>{subtitle}</StepperDescription>
                                    </div>
                                </StepperTrigger>
                                {step < counter.length && (
                                    <StepperSeparator className="absolute inset-y-0 top-[calc(1.5rem+0.125rem)] left-3 -order-1 m-0 -translate-x-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none group-data-[orientation=vertical]/stepper:h-[calc(100%-1.5rem-0.25rem)]" />
                                )}
                            </StepperItem>
                        ))}
                    </Stepper>
                    <div className="space-y-4">
                        <div className="h-96 relative">
                            {counter?.map((count) => <div key={count.step} data-active={currentStep === count.step} className="bg-neutral-100 flex flex-col invisible absolute top-0 left-0 data-[active=true]:visible data-[active=true]:opacity-100 opacity-0 rounded h-96 p-8">
                                <h2 className="text-2xl font-medium">
                                    {count.title}
                                </h2>
                                <p className="text-sm">
                                    {count.subtitle}
                                </p>
                                <p className="text-sm mt-auto opacity-50">
                                    (process)
                                </p>
                                <div className="text-sm">
                                    <Markdown>
                                        {count.description}
                                    </Markdown>
                                </div>
                                <p className="text-sm mt-5 opacity-50">
                                    (deliverables)
                                </p>
                                <p className="text-sm">
                                    {count.deliverables.join(", ")}
                                </p>
                            </div>)}
                        </div>
                        <div className="flex space-x-4">
                            <Button
                                variant="outline"
                                className="w-32"
                                onClick={() => setCurrentStep((prev) => prev - 1)}
                                disabled={currentStep === 1}
                            >
                                Prev step
                            </Button>
                            <Button
                                variant="outline"
                                className="w-32"
                                onClick={() => setCurrentStep((prev) => prev + 1)}
                                disabled={currentStep > (counter?.length - 1)}
                            >
                                Next step
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>);
}

export default RIR;