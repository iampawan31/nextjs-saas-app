import CompanionCard from '@/components/CompanionCard'
import CompanionsList from '@/components/CompanionsList'
import CTA from '@/components/CTA'
import { Button } from '@/components/ui/button'
import { recentSessions } from '@/constants'

const Page = () => {
  return (
    <main>
      <h1>Popular Companions</h1>

      <section className="home-section">
        <CompanionCard
          id="aaa"
          name="Neura the Brainy explorer"
          topic="Neural network of the brain"
          duration={45}
          subject="science"
          color="#ff0000"
        />
        <CompanionCard
          id="bbb"
          name="Countsy the number wizard"
          topic="Derivates and Integrals"
          duration={30}
          subject="maths"
          color="#00ff00"
        />
        <CompanionCard
          id="ccc"
          name="Verba the vocabulary builder"
          topic="English literature"
          duration={30}
          subject="english literature"
          color="#0000ff"
        />
      </section>

      <section className="home-section">
        <CompanionsList
          title="Recently Completed sessions"
          companions={recentSessions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  )
}

export default Page
