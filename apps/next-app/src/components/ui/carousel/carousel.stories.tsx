import { Meta, StoryObj } from "@storybook/react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel"

const meta: Meta<typeof Carousel> = {
  title: "UI/Carousel",
  component: Carousel,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    orientation: "horizontal",
  },
  argTypes: {
    orientation: {
      control: { type: "select", options: ["horizontal", "vertical"] },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

//💡 @todo Fix the display of Vertical Carousel
export const BasicCarousel: Story = {
  render: (args) => (
    <div className="pt-10 pb-10">
      <Carousel {...args} className="relative max-w-lg mx-auto border p-4">
        <CarouselPrevious />
        <CarouselContent>
          {Array.from({ length: 100 }).map((_, index) => (
            <CarouselItem
              key={index}
              className={`flex items-center justify-center h-48 text-3xl font-semibold text-blue-700`}
            >
              {Math.floor(Math.random() * 100)}
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselNext />
      </Carousel>
    </div>
  ),
}

//💡 @todo Fix the display of Vertical Carousel
export const CustomizedCarousel: Story = {
  args: {
    orientation: "horizontal",
  },
  render: (args) => (
    <div className="pt-10 pb-10">
      <Carousel {...args} className="relative max-w-lg mx-auto border p-4">
        <CarouselPrevious className="bg-primary text-primary-foreground" />
        <CarouselContent>
          {["First", "Second", "Third", "Fourth", "Fifth"].map(
            (label, index) => (
              <CarouselItem
                key={index}
                className="flex items-center justify-center h-48 bg-gradient-to-r from-blue-500 to-purple-500 text-xl font-semibold text-white"
              >
                {label} Slide
              </CarouselItem>
            )
          )}
        </CarouselContent>
        <CarouselNext className="bg-primary text-primary-foreground" />
      </Carousel>
    </div>
  ),
}
