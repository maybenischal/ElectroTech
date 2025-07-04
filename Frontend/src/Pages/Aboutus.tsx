import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const Aboutus = () => {
    return (
        <div className="flex w-[95%] mx-auto justify-center">
            <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="item-1"
            >
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-[18px] font-semibold no-underline hover:no-underline cursor-pointer">Product Information</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4">
                        <p>
                            ElectroTech is Nepal’s premier online store specializing exclusively in the latest and most advanced tech products.
                            From high-performance laptops and desktops to accessories, gadgets, and hardware, we bring together the widest selection
                            for gamers, professionals, creators, and everyday users.We pride ourselves on being Nepal’s trusted platform for quality,
                            performance, and expert support — delivering cutting-edge electronics with world-class service.
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-[18px] font-semibold no-underline hover:no-underline cursor-pointer">Who We Are</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4">
                        <p>
                            Whether you're a gamer chasing top-tier performance, a business user seeking reliable machines,
                            or a student looking for value, *ElectroTech* offers unmatched variety. Our curated stock includes
                            Gaming Laptops, Ultrabooks, Business Series, Workstations, DIY PC Components, Smart Gadgets,
                            and more — all from globally trusted brands.
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-[18px] font-semibold no-underline hover:no-underline cursor-pointer">Return Policy</AccordionTrigger>
                    <AccordionContent className="What Sets Us Apart?">
                        <p>
                            <span className="font-[700] text-[14px] mb-4">Expert Service</span>
                            <br />

                            We treat every customer like a lifelong partner.
                            From the first visit to post-purchase care, our experienced tech advisors guide you every step of the way.
                            Our 6-days-a-week support ensures you always have someone to rely on.
                            <br />

                            Best Value Promise
                            <br />

                            We never compromise on quality or affordability. Every product at ElectroTech is priced competitively
                            and carefully selected to offer you the *best bang for your buck*. Why pay more elsewhere?
                            <br />
                            Customization Options
                            <br />

                            Your tech should reflect your style. We offer PC customization, performance upgrades, and unique
                            aesthetic add-ons. Whether you want a silent workstation or a fully RGB gaming rig — we build to suit.

                        </p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default Aboutus