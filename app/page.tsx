import CompanionCard from '@/components/CompanionCard'
import CompanionsList from '@/components/CompanionsList'
import CTA from '@/components/CTA'
import {
  getAllCompanions,
  getRecentSessions
} from '@/lib/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'

// 🚨 Force dynamic rendering since server-only functions (headers, cookies) are used
export const dynamic = 'force-dynamic'

const Page = async () => {
  const [companions, recentSessionsCompanions] = await Promise.all([
    getAllCompanions({ limit: 3 }),
    getRecentSessions({ limit: 10 })
  ])

  return (
    <main>
      <h1>Popular Companions</h1>

      <section
        className="home-section"
        aria-labelledby="popular-companions"
      >
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            color={getSubjectColor(companion.subject)}
            {...companion}
          />
        ))}
      </section>

      <section className="home-section">
        <CompanionsList
          title="Recently Completed sessions"
          companions={recentSessionsCompanions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  )
}

export default Page
