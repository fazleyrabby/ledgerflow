import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import Features from "@/components/features";
import DashboardDemo from "@/components/dashboard-demo";
import Stats from "@/components/stats";
import Testimonials from "@/components/testimonials";
import CTA from "@/components/cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Features />
        <DashboardDemo />
        <Stats />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

