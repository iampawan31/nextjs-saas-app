import CompanionComponent from '@/components/CompanionComponent'
import { getCompanion } from '@/lib/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'

interface CompanionSessionPageProps {
  params: Promise<{ id: string }>
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params

  const companion = await getCompanion({
    companionId: id
  })

  const { id: companionId, duration, name, subject, topic } = companion
  const user = await currentUser()

  // If no user found, redirect to sign in page
  if (!user) {
    redirect('/sign-in')
  }

  // If invalid companion, redirect to companions page
  if (!companionId) {
    redirect('/companions')
  }

  return (
    <main>
      <article className="flex rounded-border justify-between p-6 max-md:flex-col">
        <div className="flex items-center gap-2">
          <div
            className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <Image
              src={`/icons/${subject}.svg`}
              alt={subject}
              width={35}
              height={35}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="font-bold text-2xl">{name}</p>
              <div className="subject-badge max-sm:hidden">{subject}</div>
            </div>
            <p className="text-lg">{topic}</p>
          </div>
        </div>
        <div className="items-start text-2xl max-md:hidden">
          {duration} mins
        </div>
      </article>

      <CompanionComponent
        {...companion}
        companionId={companionId}
        userName={user.firstName!}
        userImage={user.imageUrl!}
      />
    </main>
  )
}

export default CompanionSession
