/* eslint-disable @next/next/no-img-element */
import { Star } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { MaxWidthWrapper } from "../max-width-wrapper";
import Image from "next/image";
import { SectionHeadingSubtitle } from "./components/section-heading-subtitle";
import { MotionWrapper } from "../motion-wrapper";

const testimonials = [
  {
    id: 1,
    name: "Tomasz Zieliński",
    value:
      "„Mój pies zawsze wychodzi z salonu zadowolony i pięknie wypielęgnowany. Profesjonalna obsługa i miła atmosfera sprawiają, że wracamy tu regularnie.”",
    rate: 5,
    image:
      "https://onemarketmedia.com/wp-content/uploads/2020/06/testimonial-video.jpg",
  },
  {
    id: 2,
    name: "Michał Nowak",
    value:
      "„Nie znam lepszego miejsca dla mojego pupila! Indywidualne podejście do każdego psa i najwyższa jakość usług – polecam wszystkim właścicielom czworonogów.”",
    rate: 5,
    image:
      "https://www.shutterstock.com/image-photo/studio-close-portrait-handsome-young-260nw-2134031979.jpg",
  },
  {
    id: 3,
    name: "Anna Wiśniewska",
    value:
      "„Świetna atmosfera i profesjonalizm. Mój pies nigdy nie był tak zadbany. Dziękuję za wspaniałą obsługę!”",
    rate: 5,
    image:
      "https://www.shutterstock.com/image-photo/testimonial-photo-advertising-portrait-young-260nw-2524890479.jpg",
  },
];
type TestemonialType = (typeof testimonials)[number];

export function TestemonialsSection() {
  return (
    <section className="my-8 lg:my-20">
      <MaxWidthWrapper className="space-y-4 md:space-y-14">
        <SectionHeadingSubtitle
          title="Opinie naszych klientów"
          titleClassName="sm:text-nowrap"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <MotionWrapper
              key={testimonial.id}
              transition={{ duration: 0.3, delay: i * 0.2 }}
            >
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            </MotionWrapper>
          ))}
        </div>
      </MaxWidthWrapper>
      <MotionWrapper
        viewport={{ once: true, margin: "0px 0px -200px 0px" }}
        transition={{ duration: 0.5 }}
        className="relative mt-12 h-60 w-full md:h-140"
      >
        <Image
          src="/images/service.jpg"
          fill
          alt="banner image"
          className="object-cover"
        />
        <div className="bg-primary/20 absolute inset-0"></div>
      </MotionWrapper>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: TestemonialType }) {
  return (
    <Card className="h-full overflow-hidden p-4 transition-all duration-300 hover:shadow-lg md:p-6">
      <CardContent className="p-0">
        <div className="flex items-center justify-center gap-4">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="aspect-square w-14 overflow-hidden rounded-full object-cover"
          />
          <div className="flex-grow">
            <p className="text-lg font-semibold">{testimonial.name}</p>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < testimonial.rate ? "fill-yellow-500 text-yellow-500" : "text-card-foreground"}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="p-2">
          <p className="text-card-foreground italic">{testimonial.value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
